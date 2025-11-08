import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { image: '/image/brands/apple-logo.webp', alt: 'Apple' },
  { image: '/image/brands/samsung-logo.webp', alt: 'Samsung' },
  { image: '/image/brands/xiaomi-logo.webp', alt: 'Xiaomi' },
  { image: '/image/brands/realme-logo.webp', alt: 'Realme' },
];

export const Brands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 640, // móviles
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280, // pantallas grandes
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col items-center gap-4 pt-20 pb-16 bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight text-gray-900">
        Marcas que Representan Calidad
      </h2>

      <p className="w-4/5 md:w-2/3 text-center text-gray-600 text-sm md:text-base">
        En <span className="font-semibold text-gray-800">MONACO</span> trabajamos con las marcas más reconocidas del mundo,
        garantizando innovación, durabilidad y diseño de vanguardia.
      </p>

      <div className="w-full mt-10 px-6">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex justify-center items-center opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={brand.image}
                alt={brand.alt}
                className="max-h-16 md:max-h-20 object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
