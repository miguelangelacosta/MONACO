import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import { useRef } from "react";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4, // base: PCs grandes
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280, // hasta 1280px → laptops
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, // hasta 1024px → tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // hasta 768px → móviles
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const handleHover = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider
        ref={sliderRef}
        {...settings}
        className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center [&_.slick-slide]:px-3"
      >
        {products.slice(0, 12).map((product, index) => (
          <div
            key={product.id}
            className="flex justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            onMouseEnter={() => handleHover(index)}
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
    </div>
  );
};
