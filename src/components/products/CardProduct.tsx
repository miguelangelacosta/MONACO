import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { VariantProduct } from "../../interfaces";
import { formatPrice } from "../../helpers";
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
  colors: { name: string; color: string }[];
  variants: VariantProduct[];
  discount?: number;
  tag?: string;
  status?: string;
}

export const CardProduct = ({
  img,
  name,
  price,
  slug,
  colors,
  variants,
  discount = 0,
  tag = "",
  status = "",
}: Props) => {
  const [activeColor] = useState(colors[0]);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = variants.find(
    (variant) => variant.color === activeColor.color
  );

  const finalPrice = discount ? price - price * (discount / 100) : price;

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (selectedVariant && selectedVariant.stock > 0) {
      addItem({
        variantId: selectedVariant.id,
        productId: slug,
        name,
        image: img,
        color: activeColor.name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: 1,
      });
      toast.success("Producto añadido al carrito", {
        position: "bottom-right",
      });
    } else {
      toast.error("Producto agotado", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Imagen del producto */}
      <Link
        to={`/celulares/${slug}`}
        className="relative block w-full aspect-[3/4] bg-gray-50 overflow-hidden"
      >
        <img
          src={img}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        {/* Etiqueta superior izquierda */}
        {tag && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 py-[2px] rounded-md shadow">
            {tag}
          </div>
        )}

        {/* Descuento */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-[2px] rounded-md shadow">
            -{discount}%
          </div>
        )}

        {/* Botón al hacer hover */}
        <button
          onClick={handleAddClick}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm py-2 px-4 rounded-full shadow-md flex items-center gap-1 transition-all duration-300"
        >
          <FiShoppingCart className="text-sm" />
          Añadir
        </button>
      </Link>

      {/* Contenido inferior */}
      <div className="p-2 sm:p-3">
        {/* Nombre */}
        <h3 className="text-xs sm:text-sm text-gray-800 font-medium line-clamp-2 hover:text-orange-500 transition-colors">
          {name}
        </h3>

        {/* Estado */}
        {status && (
          <p className="text-[11px] text-orange-500 font-semibold mt-1">
            {status}
          </p>
        )}

        {/* Precio */}
        <div className="flex items-center gap-2 mt-1">
          {discount > 0 ? (
            <>
              <p className="text-[13px] sm:text-sm text-gray-400 line-through">
                {formatPrice(price)}
              </p>
              <p className="text-[14px] sm:text-base font-bold text-gray-900">
                {formatPrice(finalPrice)}
              </p>
            </>
          ) : (
            <p className="text-[14px] sm:text-base font-bold text-gray-900">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
