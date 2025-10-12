import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "/image/img-banner.jpg",
      title: "Los mejores monaco del 2025",
      subtitle: "Descubre ofertas exclusivas y las últimas novedades",
      link: "/celulares",
      button: "Explorar colección",
    },
    {
      id: 2,
      image: "/img/img-banner2.jpg",
      title: "Tecnología al mejor precio",
      subtitle: "Tablets, audífonos y accesorios para ti",
      link: "/ofertas",
      button: "Explorar ofertas",
    },
    {
      id: 3,
      image: "/img/img-banner3.jpg",
      title: "Todo para tu oficina o estudio",
      subtitle: "Equipa tu espacio con estilo y eficiencia",
      link: "/tienda",
      button: "Ir a la tienda",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="relative text-white px-4 md:px-8 mt-6">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            {/* CONTENEDOR CON BORDES REDONDEADOS */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* IMAGEN DE FONDO */}
              <div
                className="absolute inset-0 bg-cover bg-center h-[400px] md:h-[550px]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* OVERLAY OSCURO */}
              <div className="absolute inset-0 bg-black/60" />

              {/* CONTENIDO */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">
                  {slide.subtitle}
                </p>

                <Link
                  to={slide.link}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
