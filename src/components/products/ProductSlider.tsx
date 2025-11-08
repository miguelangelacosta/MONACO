import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "../products/CardProduct";
import type { PreparedProducts } from "../../interfaces";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface Props {
  title: string;
  products: PreparedProducts[];
  variant?: "A" | "B"; // ⚡ para distinguir el tipo de animación
}

export const ProductSlider = ({ title, products, variant = "A" }: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const PrevArrow = ({ className, style, onClick }: ArrowProps) => (
    <button
      type="button"
      className={`${className} absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300`}
      style={style}
      onClick={onClick}
    >
      <FaArrowLeft />
    </button>
  );

  const NextArrow = ({ className, style, onClick }: ArrowProps) => (
    <button
      type="button"
      className={`${className} absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300`}
      style={style}
      onClick={onClick}
    >
      <FaArrowRight />
    </button>
  );

  // 🎢 Diferentes configuraciones según el tipo de slider
  const settings: Settings =
    variant === "A"
      ? {
          dots: true,
          infinite: true,
          speed: 700,
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
          autoplay: true,
          autoplaySpeed: 2500,
          cssEase: "ease-in-out",
          pauseOnHover: true,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
          responsive: [
            { breakpoint: 1536, settings: { slidesToShow: 5 } },
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ],
        }
      : {
          dots: false,
          infinite: true,
          speed: 1200, // ⚡ más lento y suave
          slidesToShow: 6,
          slidesToScroll: 2, // 🚀 se mueve de a 2 productos
          arrows: true,
          autoplay: true,
          autoplaySpeed: 1800,
          cssEase: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", // 🎬 animación elástica
          pauseOnHover: false,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
          responsive: [
            { breakpoint: 1536, settings: { slidesToShow: 5 } },
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ],
        };

  return (
    <div className="relative my-16 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider
        ref={sliderRef}
        {...settings}
        className="[&_.slick-slide]:flex [&_.slick-slide]:justify-center [&_.slick-slide]:px-3"
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
    </div>
  );
};
