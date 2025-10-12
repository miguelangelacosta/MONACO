import type { PreparedProducts } from '../../interfaces';
import { CardProduct } from '../products/CardProduct';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductGrid = ({ title, products }: Props) => {
  const settings = {
    dots: false,
    infinite: true,          // para que el slider sea infinito
    speed: 500,
    slidesToShow: 4,         // en desktop se ven 4 tarjetas
    slidesToScroll: 1,
    autoplay: true,          // autoplay activado
    autoplaySpeed: 3000,     // cada 3 segundos
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }  // tablet grande
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }  // tablet / móvil grande
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }  // móvil pequeño
      }
    ],
  };

  return (
    <div className="my-32">
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider {...settings} className="px-2 sm:px-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="px-2">
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
      </Slider>
    </div>
  );
};
