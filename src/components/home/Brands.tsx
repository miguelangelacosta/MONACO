import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { image: '/image/brands/apple-logo.webp', alt: 'adidas' },
  { image: '/image/brands/samsung-logo.webp', alt: 'nike' },
  { image: '/image/brands/xiaomi-logo.webp', alt: 'rebook' },
  { image: '/image/brands/realme-logo.webp', alt: 'puma' },
];

export const Brands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // móvil: 3 logos
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
    <div className='flex flex-col items-center gap-3 pt-16 pb-12'>
      <h2 className='font-bold text-2xl'>Marcas que disponemos</h2>

      <p className='w-2/3 text-center text-sm md:text-base'>
        Tenemos lo más moderno en tecnología y los últimos modelos de celulares disponibles
      </p>

      <div className='w-full mt-8'>
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index} className="flex justify-center items-center">
              <img src={brand.image} alt={brand.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
