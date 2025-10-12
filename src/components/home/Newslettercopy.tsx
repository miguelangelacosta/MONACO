import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Offer {
  image: string;
  title: string;
  link?: string;
}

// Ejemplo de ofertas
const offers: Offer[] = [
  { image: "/image/offer1.webp", title: "Auriculares Pro", link: "/tienda" },
  { image: "/image/offer2.webp", title: "Smartwatch Active", link: "/tienda" },
  { image: "/image/offer3.webp", title: "Cámara HD Compacta", link: "/tienda" },
  { image: "/image/offer4.webp", title: "Altavoz Bluetooth", link: "/tienda" },
];

export const NewsletterCopy = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,          // ✅ Activar desplazamiento automático
    autoplaySpeed: 3000,     // ✅ Cambia de slide cada 3 segundos
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="flex flex-col gap-2 my-2 px-2 sm:px-4">
      {/* Tira de promoción */}
      <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-1.5 px-4 sm:px-6 md:px-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xs sm:text-sm md:text-sm font-semibold">
            ¡Oferta Especial del Día!
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm mt-0.5">
            Descubre nuestros productos más populares y aprovecha descuentos exclusivos.
          </p>
        </div>
        <div>
          <a
            href="/tienda"
            className="bg-gray-900 text-yellow-400 font-semibold px-3 py-1 rounded-full shadow-sm hover:bg-gray-800 hover:text-white transition-colors duration-200 text-[10px] sm:text-xs md:text-sm"
          >
            Ver Productos
          </a>
        </div>
      </div>

      {/* Carrusel de ofertas */}
      <Slider {...settings} className="gap-2">
        {offers.map((offer, idx) => (
          <a
            key={idx}
            href={offer.link}
            className="block rounded-lg overflow-hidden shadow-sm transform transition-all duration-200 hover:scale-105"
          >
            <div className="relative w-full h-20 sm:h-24 md:h-28 bg-gray-200">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 rounded text-[9px] sm:text-xs md:text-sm">
                {offer.title}
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};
