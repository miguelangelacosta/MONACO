import { useEffect, useRef, useState } from "react";
import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import Slider from "react-slick";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const visibleProducts = products.slice(0, 12);
  const sliderRef = useRef<Slider | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Forzar render solo en cliente (SSR/Next.js)
  useEffect(() => {
    setIsMounted(true);
    sliderRef.current?.slickGoTo(0);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Desktop por defecto
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } }, // desktop grande
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // tablet
      { breakpoint: 768, settings: { slidesToShow: 2 } },  // móvil grande
      { breakpoint: 0, settings: { slidesToShow: 2 } },    // móviles pequeños
    ],
  };

  if (!isMounted) return null;

  return (
    <div className="my-32 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider
        ref={sliderRef}
        {...sliderSettings}
        className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center"
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="w-full px-2">
            <CardProduct {...product} img={product.images[0]} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

