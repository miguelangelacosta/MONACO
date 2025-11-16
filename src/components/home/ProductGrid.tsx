import type { PreparedProducts } from '../../interfaces';
import { CardProduct } from '../products/CardProduct';

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductGrid = ({ title, products }: Props) => {
  const visibleProducts = products.slice(0, 30);

  return (
    <section
      className="
        my-28 px-4 md:px-8 lg:px-12 
        bg-gradient-to-b from-blue-50 via-blue-100/60 to-blue-50 
        py-16 rounded-3xl shadow-inner
      "
    >
      {/* Título */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h2>
        <div className="mx-auto mt-3 w-24 h-1 bg-blue-600 rounded-full"></div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-5 
          md:gap-8
        "
      >
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="
              bg-white rounded-xl shadow-md 
              hover:shadow-xl hover:-translate-y-1 
              transition-all duration-300
            "
          >
            <CardProduct
              name={product.name}
              price={product.price}
              colors={product.colors}
              img={product.images[0]}
              slug={product.slug}
              variants={product.variants}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
