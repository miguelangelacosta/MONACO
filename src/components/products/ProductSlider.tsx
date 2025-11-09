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
    <div className="my-16 w-full">
      <h2 className="text-3xl font-bold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Móvil: scroll horizontal tipo slider con snap y transición suave */}
      <div className="flex gap-3 overflow-x-auto pb-4 lg:hidden px-2 scroll-smooth snap-x snap-mandatory">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[48%] snap-start transition-transform duration-300 hover:scale-105"
          >
            <CardProduct {...product} img={product.images[0]} />
          </div>
        ))}
      </div>

      {/* Desktop: slider normal */}
      <div className="hidden lg:block px-4">
        <Slider
          {...desktopSettings}
          className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center"
        >
          {visibleProducts.map((product) => (
            <div key={product.id} className="px-1 transition-transform duration-300 hover:scale-105">
              <CardProduct {...product} img={product.images[0]} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
