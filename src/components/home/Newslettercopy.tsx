import { useEffect, useState } from "react";
import Modal from "react-modal";
import { supabase } from "../../supabase/client";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: string;
  name: string;
  images: string[];
  slug?: string;
  description?: string | { type: string; content: string | string[] };
  brand?: string;
}

const brands = ["ropa", "calzado", "Lociones", "accesorios", "Realme", "Honor"];

export const NewsletterCopy = () => {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from("products")
          .select("id, name, images, slug, description, brand")
          .order("created_at", { ascending: false });

        if (selectedBrand) {
          query = query.eq("brand", selectedBrand);
        }

        const { data, error } = await query;
        if (error) throw error;
        setOffers((data || []).slice(0, 10));
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedBrand]);

  const openModalWithProduct = (product?: Product) => {
    setSelectedProduct(product || offers[0] || null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
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
    <div className="flex flex-col gap-3 my-6 px-2 sm:px-6">
      {/* 🎄 Barra Promocional Navideña Compacta */}
      <div className="relative bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 text-white py-1 px-4 sm:px-6 md:px-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xs sm:text-sm md:text-base font-bold flex items-center justify-center sm:justify-start gap-2">
            🎁 ¡Sorpresa Navideña!
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm mt-0.5">
            Descubre nuestros productos más festivos con descuentos exclusivos.
          </p>
        </div>
        <button
          onClick={() => openModalWithProduct()}
          className="bg-white text-red-500 font-semibold px-3 py-1 rounded-full shadow-md hover:bg-yellow-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base flex items-center gap-1"
        >
          Ver Productos 🎅
        </button>
      </div>

      {/* 🔹 Filtro tipo Shein */}
      <div className="flex overflow-x-auto gap-3 px-2 py-3 scrollbar-hide">
        {brands.map((brand) => {
          const isActive = selectedBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => setSelectedBrand(isActive ? null : brand)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {brand}
            </button>
          );
        })}
      </div>

      {/* 🔹 Slider de productos tipo Shein */}
      {loading ? (
        <p className="text-center text-sm text-gray-500 py-6">
          Cargando productos...
        </p>
      ) : offers.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-6">
          No hay productos disponibles.
        </p>
      ) : (
        <Slider {...sliderSettings}>
          {offers.map((product) => (
            <div
              key={product.id}
              onClick={() => openModalWithProduct(product)}
              className="cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105 px-2"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg border border-gray-200">
                <img
                  src={product.images?.[0] || "/placeholder.webp"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-700 font-medium text-center max-w-[100px] truncate">
                {product.name}
              </p>
            </div>
          ))}
        </Slider>
      )}

      {/* 🔹 Modal de producto */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Producto en Oferta"
        className="max-w-md mx-auto mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        {selectedProduct && (
          <div className="flex flex-col">
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
              <h2 className="text-lg sm:text-xl font-bold">
                {selectedProduct.name}
              </h2>
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

