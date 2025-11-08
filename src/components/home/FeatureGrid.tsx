import { BiWorld } from 'react-icons/bi';
import { FaHammer } from 'react-icons/fa6';
import { HiMiniReceiptRefund } from 'react-icons/hi2';
import { MdLocalShipping } from 'react-icons/md';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const FeatureGrid = () => {
  const features = [
    {
      icon: <MdLocalShipping size={40} className="text-white" />,
      title: "Envíos seguros",
      description: "En todos nuestros productos",
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      icon: <HiMiniReceiptRefund size={40} className="text-white" />,
      title: "Devoluciones",
      description: "Garantía por defectos de fábrica, no por daños de uso",
      bg: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    {
      icon: <FaHammer size={40} className="text-white" />,
      title: "Soporte activo",
      description: "Soporte técnico en cualquier momento",
      bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
    {
      icon: <BiWorld size={40} className="text-white" />,
      title: "Garantía",
      description: "Garantía de 1 mes por defecto de fábrica",
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4, // valor base en laptop
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // móvil y tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // pantallas laptop
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3000, // pantallas grandes o 2K+
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-16 px-4 sm:px-8 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-10 md:text-4xl lg:text-5xl">
        Beneficios de comprar con nosotros
      </h2>

      <Slider {...settings}>
        {features.map((feature, index) => (
          <div key={index} className="px-2">
            <div
              className={`flex flex-col items-center justify-center rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${feature.bg}`}
              style={{
                padding: "1rem",
                minHeight: "180px",
              }}
            >
              {feature.icon}
              <p className="font-semibold text-white text-center mt-2 text-lg">
                {feature.title}
              </p>
              <p className="text-sm text-white text-center mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
