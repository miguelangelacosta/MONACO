import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import Slider from "react-slick";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const visibleProducts = products.slice(0, 12);

  // Slider para escritorio
  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
  };

  return (
    <div className="my-16 w-full px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Móvil: scroll horizontal tipo slider */}
      <div className="flex gap-4 overflow-x-auto pb-4 lg:hidden scroll-smooth snap-x snap-mandatory">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[45%] snap-start transition-transform duration-300 hover:scale-105"
          >
            <CardProduct {...product} img={product.images[0]} />
          </div>
        ))}
      </div>

      {/* Desktop: slider normal */}
      <div className="hidden lg:block">
        <Slider
          {...desktopSettings}
          className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center px-2"
        >
          {visibleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <CardProduct {...product} img={product.images[0]} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
