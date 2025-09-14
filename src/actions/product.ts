/* ********************************** */
/*            ADMINISTRADOR           */
/* ********************************** */
import type { ProductInput } from '../interfaces';
import { supabase } from '../supabase/client';
import { extractFilePath } from '../helpers';

/**
 * Crear producto con imágenes y variantes
 */
export const createProduct = async (productInput: ProductInput) => {
	try {
		// 1. Crear el producto para obtener el ID
		const { data: product, error: productError } = await supabase
			.from('products')
			.insert({
				name: productInput.name,
				brand: productInput.brand,
				slug: productInput.slug,
				features: productInput.features,
				description: productInput.description,
				images: [],
			})
			.select()
			.single();

		if (productError) throw new Error(productError.message);

		// 2. Subir las imágenes al bucket dentro de una carpeta que se creará a partir del producto
		const folderName = product.id;

		const uploadedImages = await Promise.all(
			productInput.images.map(async (image: File) => {
				const { data, error } = await supabase.storage
					.from('product-images')
					.upload(`${folderName}/${product.id}-${image.name}`, image);

				if (error) throw new Error(error.message);

				const imageUrl = supabase.storage
					.from('product-images')
					.getPublicUrl(data.path).data.publicUrl;

				return imageUrl;
			})
		);

		// 3. Actualizar el producto con las imágenes subidas
		const { error: updatedError } = await supabase
			.from('products')
			.update({
				images: uploadedImages,
			})
			.eq('id', product.id);

		if (updatedError) throw new Error(updatedError.message);

		// 4. Crear las variantes del producto
		const variants = productInput.variants.map(variant => ({
			product_id: product.id,
			stock: variant.stock,
			price: variant.price,
			storage: variant.storage,
			color: variant.color,
			color_name: variant.colorName,
		}));

		const { error: variantsError } = await supabase
			.from('variants')
			.insert(variants);

		if (variantsError) throw new Error(variantsError.message);

		return product;
	} catch (error) {
		console.log(error);
		throw new Error('Error inesperado, Vuelva a intentarlo');
	}
};

/**
 * Actualizar producto con imágenes y variantes
 */
export const updateProduct = async (
	productId: string,
	productInput: ProductInput
) => {
	// 1. Obtener las imágenes actuales del producto
	const { data: currentProduct, error: currentProductError } =
		await supabase
			.from('products')
			.select('images')
			.eq('id', productId)
			.single();

	if (currentProductError)
		throw new Error(currentProductError.message);

	const existingImages: string[] = currentProduct.images || [];

	// 2. Actualizar la información individual del producto
	const { data: updatedProduct, error: productError } = await supabase
		.from('products')
		.update({
			name: productInput.name,
			brand: productInput.brand,
			slug: productInput.slug,
			features: productInput.features,
			description: productInput.description,
		})
		.eq('id', productId)
		.select()
		.single();

	if (productError) throw new Error(productError.message);

	// 3. Manejo de imágenes (SUBIR NUEVAS y ELIMINAR ANTIGUAS SI ES NECESARIO)
	const folderName = productId;

	const validImages = productInput.images.filter(
		(image): image is File | string => Boolean(image)
	);

	// 3.1 Identificar las imágenes que han sido eliminadas
	const imagesToDelete = existingImages.filter(
	image => !validImages.includes(image)
	);

	// 3.2 Obtener los paths de los archivos a eliminar
	const filesToDelete = imagesToDelete.map(extractFilePath);

	// 3.3 Eliminar las imágenes del bucket
	if (filesToDelete.length > 0) {
		const { error: deleteImagesError } = await supabase.storage
			.from('product-images')
			.remove(filesToDelete);

		if (deleteImagesError) {
			console.log(deleteImagesError);
			throw new Error(deleteImagesError.message);
		}
	}

	// 3.4 Subir las nuevas imágenes y construir el array de imágenes actualizado
	const uploadedImages = await Promise.all(
		validImages.map(async (image: File | string) => {
			if (image instanceof File) {
				const { data, error } = await supabase.storage
					.from('product-images')
					.upload(`${folderName}/${productId}-${image.name}`, image);

				if (error) throw new Error(error.message);

				return supabase.storage
					.from('product-images')
					.getPublicUrl(data.path).data.publicUrl;
			} else {
				return image; // string (URL existente)
			}
		})
	);

	// 4. Actualizar el producto con las imágenes actualizadas
	const { error: updateImagesError } = await supabase
		.from('products')
		.update({ images: uploadedImages })
		.eq('id', productId);

	if (updateImagesError) throw new Error(updateImagesError.message);

	// 5. Manejo de variantes
	const existingVariants = productInput.variants.filter(v => v.id);
	const newVariants = productInput.variants.filter(v => !v.id);

	// 5.1 Modificar las variantes existentes
	if (existingVariants.length > 0) {
		const { error: updateVariantsError } = await supabase
			.from('variants')
			.upsert(
				existingVariants.map(variant => ({
					id: variant.id,
					product_id: productId,
					stock: variant.stock,
					price: variant.price,
					storage: variant.storage,
					color: variant.color,
					color_name: variant.colorName,
				})),
				{ onConflict: 'id' }
			);

		if (updateVariantsError)
			throw new Error(updateVariantsError.message);
	}

	// 5.2 Crear y guardar las nuevas variantes
	let newVariantIds: string[] = [];

	if (newVariants.length > 0) {
		const { data, error: insertVariantsError } = await supabase
			.from('variants')
			.insert(
				newVariants.map(variant => ({
					product_id: productId,
					stock: variant.stock,
					price: variant.price,
					storage: variant.storage,
					color: variant.color,
					color_name: variant.colorName,
				}))
			)
			.select();

		if (insertVariantsError)
			throw new Error(insertVariantsError.message);

		newVariantIds = data.map((variant: { id: string }) => variant.id);
	}

	// 5.3 Combinar los IDs de las variantes existentes y las nuevas
	const currentVariantIds = [
		...existingVariants.map(v => v.id as string),
		...newVariantIds,
	];

	// 5.4 Eliminar las variantes que no están en la lista de IDs
	const { error: deleteVariantsError } = await supabase
		.from('variants')
		.delete()
		.eq('product_id', productId)
		.not('id', 'in', `(${currentVariantIds.join(',') || 0})`);

	if (deleteVariantsError)
		throw new Error(deleteVariantsError.message);

	return updatedProduct;
};
