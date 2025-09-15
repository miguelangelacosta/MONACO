// src/pages/CellPhonePage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDescription } from '../components/one-product/ProductDescription';
<<<<<<< HEAD
import type { JSONContent } from '@tiptap/react';
=======
import { GridImages } from '../components/one-product/GridImages';
import { useProduct } from '../hooks/products/useProduct';
import { useEffect, useMemo, useState } from 'react';
import type { VariantProduct, } from '../interfaces';
import { Tag } from '../components/shared/Tag';
import { Loader } from '../components/shared/Loader';
import { useCounterStore } from '../store/counter.store';
import { useCartStore } from '../store/cart.store';
import toast from 'react-hot-toast';
>>>>>>> parent of 21afd58 (ecomerce01)

interface Product {
  id: number;
  name: string;
  price: number;
  description: JSONContent | null; // ✅ Permitimos null aquí también
}

export const CellPhonePage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

<<<<<<< HEAD
  useEffect(() => {
    // Simulación de fetch (ajústalo a tu API real)
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${slug}`);
      const data = await response.json();

      // Aseguramos que description pueda ser null si no existe
      setProduct({
        ...data,
        description: data.description ?? null,
      });
    };

    fetchProduct();
=======
  const { product, isLoading, isError } = useProduct(currentSlug || '');

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantProduct | null>(null);

  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const addItem = useCartStore(state => state.addItem);

  const navigate = useNavigate();

  // Agrupamos las variantes por color
  const colors = useMemo(() => {
    return (
      product?.variants.reduce((acc: Acc, variant: VariantProduct) => {
        const { color, color_name, storage } = variant;
        if (!acc[color]) {
          acc[color] = {
            name: color_name,
            storages: [],
          };
        }
        if (!acc[color].storages.includes(storage)) {
          acc[color].storages.push(storage);
        }
        return acc;
      }, {} as Acc) || {}
    );
  }, [product?.variants]);

  // Obtener el primer color predeterminado
  const availableColors = Object.keys(colors);
  useEffect(() => {
    if (!selectedColor && availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor, product]);

  // Actualizar almacenamiento al cambiar de color
  useEffect(() => {
    if (selectedColor && colors[selectedColor] && !selectedStorage) {
      setSelectedStorage(colors[selectedColor].storages[0]);
    }
  }, [selectedColor, colors, selectedStorage]);

  // Obtener la variante seleccionada
  useEffect(() => {
    if (selectedColor && selectedStorage) {
      const variant = product?.variants.find(
        (variant: VariantProduct) =>
          variant.color === selectedColor && variant.storage === selectedStorage
      );
      setSelectedVariant(variant ?? null);
    }
  }, [selectedColor, selectedStorage, product?.variants]);

  const isOutOfStock = selectedVariant?.stock === 0;

  // Añadir al carrito
  const addToCart = () => {
    if (selectedVariant) {
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || '',
        name: product?.name || '',
        image: product?.images[0] || '',
        color: selectedVariant.color_name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count,
      });
      toast.success('Producto añadido al carrito', {
        position: 'bottom-right',
      });
    }
  };

  // Comprar ahora
  const buyNow = () => {
    if (selectedVariant) {
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || '',
        name: product?.name || '',
        image: product?.images[0] || '',
        color: selectedVariant.color_name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count,
      });
      navigate('/checkout');
    }
  };

  // Resetear slug y selecciones al cambiar URL
  useEffect(() => {
    setCurrentSlug(slug);
    setSelectedColor(null);
    setSelectedStorage(null);
    setSelectedVariant(null);
>>>>>>> parent of 21afd58 (ecomerce01)
  }, [slug]);

  if (!product) {
    return <p className="text-center mt-10">Cargando producto...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-xl font-semibold mb-6">${product.price}</p>

<<<<<<< HEAD
      {/* ✅ Pasamos description (puede ser null) */}
      <ProductDescription content={product.description} />
    </div>
=======
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="flex gap-5 items-center">
            <span className="tracking-wide text-lg font-semibold">
              {formatPrice(selectedVariant?.price || product.variants[0].price)}
            </span>
            <div className="relative">
              {isOutOfStock && <Tag contentTag="agotado" />}
            </div>
          </div>

          <Separator />

          {/* Características */}
          <ul className="space-y-2 ml-7 my-10">
            {product.features.map((feature: string) => (
              <li
                key={feature}
                className="text-sm flex items-center gap-2 tracking-tight font-medium"
              >
                <span className="bg-black w-[5px] h-[5px] rounded-full" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Colores */}
          <div className="flex flex-col gap-3">
            <p>Color: {selectedColor && colors[selectedColor].name}</p>
            <div className="flex gap-3">
              {availableColors.map((color: string) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full flex justify-center items-center ${
                    selectedColor === color ? 'border border-slate-800' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="w-[26px] h-[26px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Almacenamiento */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Almacenamiento disponible</p>
            {selectedColor && (
              <div className="flex gap-3">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-1"
                  value={selectedStorage || ''}
                  onChange={e => setSelectedStorage(e.target.value)}
                >
                  {colors[selectedColor].storages.map((storage: string) => (
                    <option value={storage} key={storage}>
                      {storage}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Comprar */}
          {isOutOfStock ? (
            <button
              className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full"
              disabled
            >
              Agotado
            </button>
          ) : (
            <>
              {/* Contador */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Cantidad:</p>
                <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                  <button onClick={decrement} disabled={count === 1}>
                    <LuMinus size={15} />
                  </button>
                  <span className="text-slate-500 text-sm">{count}</span>
                  <button onClick={increment}>
                    <LuPlus size={15} />
                  </button>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-3">
                <button
                  className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2]"
                  onClick={addToCart}
                >
                  Agregar al carro
                </button>
                <button
                  className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full"
                  onClick={buyNow}
                >
                  Comprar ahora
                </button>
              </div>
            </>
          )}

          <div className="flex pt-2">
            <div className="flex flex-col gap-1 flex-1 items-center">
              <CiDeliveryTruck size={35} />
              <p className="text-xs font-semibold">Envío gratis</p>
            </div>

            <Link
              to="#"
              className="flex flex-col gap-1 flex-1 items-center justify-center"
            >
              <BsChatLeftText size={30} />
              <p className="flex flex-col items-center text-xs">
                <span className="font-semibold">¿Necesitas ayuda?</span>
                Contáctanos aquí
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <ProductDescription content={product.description} />
    </>
>>>>>>> parent of 21afd58 (ecomerce01)
  );
};
