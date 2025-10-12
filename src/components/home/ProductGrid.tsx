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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px"
        } 
      },
    ],
  };

  return (
    <div className="my-16">
      <h2 className="text-3xl font-semibold text-center mb-6 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <Slider {...settings}>
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
