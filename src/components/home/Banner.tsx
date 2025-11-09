import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "/image/img-banner.png",
      title: "Los mejores Monaco del 2025",
      subtitle: "Descubre ofertas exclusivas y las últimas novedades",
      link: "/tienda",
      button: "Explorar colección",
    },
    {
      id: 2,
      image: "/image/Gemini_Generated_Image_eeojspeeojspeeoj.png",
      title: "Tecnología al mejor precio",
      subtitle: "Tablets, audífonos y accesorios para ti",
      link: "/tienda",
      button: "Explorar ofertas",
    },
    {
      id: 3,
      image: "/image/Gemini_Generated_Image_vleciovleciovlec.png",
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
    <div className="relative text-white -mt-20 md:-mt-24">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            {/* Fondo con imagen y gradiente */}
            <div
              className="relative h-[250px] md:h-[350px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-2xl leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg mb-4 opacity-90 max-w-xl">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Ajuste visual para unirlo al navbar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-black/50 to-transparent"></div>
    </div>
  );
};
