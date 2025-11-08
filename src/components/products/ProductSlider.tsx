import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import Slider from "react-slick";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  // Tomamos hasta 12 productos
  const visibleProducts = products.slice(0, 12);

  // Configuración del slider
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // default para desktop
    slidesToScroll: 1,
    arrows: true,
    className: "[&_.slick-slide]:flex [&_.slick-slide]:justify-center",
    responsive: [
      {
        breakpoint: 1280, // pantallas <1280px
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1024, // pantallas <1024px
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768, // pantallas <768px
        settings: { slidesToShow: 1 }
      }
    ],
  };

  return (
    <div className="my-32 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider {...sliderSettings}>
        {visibleProducts.map((product) => (
          <div key={product.id} className="w-full px-2">
            <CardProduct {...product} img={product.images[0]} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

