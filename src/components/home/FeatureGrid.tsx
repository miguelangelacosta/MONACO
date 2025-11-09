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
      icon: <MdLocalShipping size={40} className="text-gray-800" />,
      title: "Envíos seguros",
      description: "En todos nuestros productos",
    },
    {
      icon: <HiMiniReceiptRefund size={40} className="text-gray-800" />,
      title: "Devoluciones",
      description: "Garantía por defectos de fábrica, no por daños de uso",
    },
    {
      icon: <FaHammer size={40} className="text-gray-800" />,
      title: "Soporte activo",
      description: "Soporte técnico en cualquier momento",
    },
    {
      icon: <BiWorld size={40} className="text-gray-800" />,
      title: "Garantía",
      description: "Garantía de 1 mes por defecto de fábrica",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="my-16 px-4 sm:px-8 lg:px-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
        Beneficios de comprar con nosotros
      </h2>

      <Slider {...settings}>
        {features.map((feature, index) => (
          <div key={index} className="px-3">
            <div
              className={`
                flex flex-col items-center justify-center rounded-2xl
                bg-white shadow-md hover:shadow-lg
                transform transition-transform duration-300 hover:scale-105
              `}
              style={{
                padding: "1.5rem",
                minHeight: "200px",
                border: "1px solid rgba(0,0,0,0.05)"
              }}
            >
              <div className="mb-3">{feature.icon}</div>
              <p className="font-semibold text-gray-900 text-center text-lg md:text-xl">
                {feature.title}
              </p>
              <p className="text-gray-600 text-sm md:text-base text-center mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};
