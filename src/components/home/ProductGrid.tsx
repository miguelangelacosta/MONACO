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
  // Configuración para slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,       // Desktop por defecto
    slidesToScroll: 1,
    autoplay: true,        // ✅ Autoplay activado
    autoplaySpeed: 3000,   // ⏱ 3 segundos por slide
    responsive: [
      {
        breakpoint: 1024,  // Tablets
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,   // Móviles
        settings: { slidesToShow: 1 }
      },
    ],
  };

  return (
    <div className="my-32">
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Slider responsive */}
      <div className="px-2">
        <Slider {...sliderSettings}>
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
    </div>
  );
};
