import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import { supabase } from "../../supabase/client";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  images: string[];
  slug?: string;
  description?: string | { type: string; content: string | string[] };
}

export const NewsletterCopy = () => {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, images, slug, description")
          .order("created_at", { ascending: false })
          .limit(8);

        if (error) throw error;
        setOffers(data || []);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const openModalWithProduct = (product?: Product) => {
    setSelectedProduct(product || offers[0] || null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const modalSliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  const renderDescription = (desc?: Product["description"]) => {
    if (!desc) return "Sin descripción disponible.";
    if (typeof desc === "string") return desc;
    if (typeof desc === "object") {
      if (Array.isArray(desc.content)) return desc.content.join(" ");
      return desc.content || "Sin descripción disponible.";
    }
    return "Sin descripción disponible.";
  };

  return (
    <div className="flex flex-col gap-3 my-4 px-2 sm:px-4">
      {/* Barra promocional */}
      <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-2 px-4 sm:px-6 md:px-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            🔥 ¡Oferta Especial del Día!
          </h3>
          <p className="text-xs sm:text-sm md:text-base mt-0.5">
            Descubre nuestros productos más populares con descuentos exclusivos.
          </p>
        </div>
        <button
          onClick={() => openModalWithProduct()}
          className="bg-gray-900 text-yellow-400 font-semibold px-4 py-1.5 rounded-full shadow-md hover:bg-gray-800 hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base"
        >
          Ver Productos
        </button>
      </div>

      {/* Carrusel de ofertas */}
      {loading ? (
        <p className="text-center text-sm text-gray-500 py-6">Cargando ofertas...</p>
      ) : offers.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-6">No hay productos disponibles.</p>
      ) : (
        <Slider {...mainSliderSettings}>
          {offers.map((product) => (
            <button
              key={product.id}
              onClick={() => openModalWithProduct(product)}
              className="block px-2 focus:outline-none"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.04]">
                <img
                  src={product.images?.[0] || "/placeholder.webp"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-xl text-sm sm:text-base font-semibold">
                  {product.name}
                </div>
              </div>
            </button>
          ))}
        </Slider>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Producto en Oferta"
        className="max-w-md mx-auto mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        {selectedProduct && (
          <div className="flex flex-col">
            {/* Carrusel de imágenes del producto */}
            {selectedProduct.images && selectedProduct.images.length > 0 && (
              <Slider {...modalSliderSettings}>
                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img || "/placeholder.webp"}
                    alt={`${selectedProduct.name} ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
                ))}
              </Slider>
            )}
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-bold">{selectedProduct.name}</h2>
              <p className="text-sm sm:text-base mt-2">
                {renderDescription(selectedProduct.description)}
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/celulares/${selectedProduct.slug || selectedProduct.id}`}
                  className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-yellow-500 transition-colors duration-200"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
