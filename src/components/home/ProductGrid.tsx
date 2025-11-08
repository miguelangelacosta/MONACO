import type { PreparedProducts } from '../../interfaces';
import { CardProduct } from '../products/CardProduct';

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductGrid = ({ title, products }: Props) => {
  // Mostrar hasta 30 productos
  const visibleProducts = products.slice(0, 30);

  return (
    <div className="my-32">
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Contenedor de productos en cuadrícula */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visibleProducts.map((product) => (
          <CardProduct
            key={product.id}
            name={product.name}
            price={product.price}
            colors={product.colors}
            img={product.images[0]}
            slug={product.slug}
            variants={product.variants}
          />
        ))}
      </div>
    </div>
  );
};
