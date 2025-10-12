
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
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2, // móvil
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // pantallas grandes
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider {...settings} className="gap-4">
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
