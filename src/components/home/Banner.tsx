import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "/image/img-banner.png",
      title: "Los Mónaco más deseados del 2025",
      subtitle: "Encuentra diseños exclusivos, calidad premium y precios que no volverás a ver.",
      link: "/tienda",
      button: "Ver colección top",
    },
    {
      id: 2,
      image: "/image/Gemini_Generated_Image_eeojspeeojspeeoj.png",
      title: "Tecnología que te acompaña",
      subtitle: "Audífonos, tablets y accesorios seleccionados para elevar tu día a día.",
      link: "/tienda",
      button: "Descubrir ofertas",
    },
    {
      id: 3,
      image: "/image/Gemini_Generated_Image_vleciovleciovlec.png",
      title: "Arma tu espacio ideal",
      subtitle: "Convierte tu oficina o estudio en un lugar productivo, moderno y con estilo.",
      link: "/tienda",
      button: "Equipar ahora",
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
          <div key={slide.id} className="relative w-full">
            <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[520px] w-full overflow-hidden rounded-b-2xl">
              
              {/* Imagen */}  
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-xl leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm md:text-lg mb-5 opacity-95 max-w-xl">
                  {slide.subtitle}
                </p>

                <Link
                  to={slide.link}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-7 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
};
