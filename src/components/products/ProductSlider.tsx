import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import Slider from "react-slick";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const visibleProducts = products.slice(0, 12);

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2600,
    cssEase: "ease-in-out",
    pauseOnHover: true,
  };

  return (
    <div
      className="my-10 w-full py-2"  // ← ALTURA MÍNIMA
      style={{
        background: "linear-gradient(135deg, #66d1c640 0%, #38b8a640 100%)",
      }}
    >
      <h2
        className="text-2xl font-bold text-center mb-3 md:text-3xl lg:text-4xl" // ← MÁS BAJO
        style={{ color: "#1BA6A6" }}
      >
        {title}
      </h2>

      {/* ----------- MÓVIL ----------- */}
      <div className="lg:hidden flex gap-3 overflow-x-auto px-3 pb-2 scroll-smooth snap-x snap-mandatory">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="
              flex-shrink-0 
              w-[42%] 
              snap-start 
              transition-transform 
              duration-300 
              hover:scale-100
              scale-[0.92]     // ← REDUCE SOLO LA ALTURA VISUAL, ANCHO INTACTO
            "
          >
            <CardProduct {...product} img={product.images[0]} />
          </div>
        ))}
      </div>

      {/* ----------- ESCRITORIO ----------- */}
      <div className="hidden lg:block px-6">
        <Slider
          {...desktopSettings}
          className="
            [&_.slick-slide]:flex 
            [&_.slick-slide]:justify-center
            [&_.slick-cloned]:!hidden
          "
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="px-3 transition-transform duration-300 hover:scale-100 scale-[0.92]" 
              // ↑ MENOS ALTO PERO MISMO ANCHO
            >
              <CardProduct {...product} img={product.images[0]} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
