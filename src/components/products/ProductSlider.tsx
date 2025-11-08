import { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  // ⚙️ Configuración del slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 380, settings: { slidesToShow: 1 } },
    ],
  };

  // 🔁 Forzar recálculo del slider al montar y al cambiar tamaño
  useEffect(() => {
    const handleResize = () => {
      const slider = sliderRef.current as unknown as {
        innerSlider?: { onWindowResized?: () => void };
      };
      slider?.innerSlider?.onWindowResized?.();
    };

    // Ejecutar una vez y al cambiar el tamaño
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative my-16 px-2 sm:px-4 md:px-6 lg:px-12 w-full overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h2>

      <Slider
        ref={sliderRef}
        {...settings}
        className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center [&_.slick-slide]:px-2 sm:[&_.slick-slide]:px-3"
      >
        {products.slice(0, 18).map((product) => (
          <div
            key={product.id}
            className="flex justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
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
      </Slider>
    </section>
  );
};
