import { useState } from "react";
import { FiPlus, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { VariantProduct } from "../../interfaces";
import { formatPrice } from "../../helpers";
import { Tag } from "../shared/Tag";
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
  colors: { name: string; color: string }[];
  variants: VariantProduct[];
}

export const CardProduct = ({
  img,
  name,
  price,
  slug,
  colors,
  variants,
}: Props) => {
  const [activeColor, setActiveColor] = useState(colors[0]);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = variants.find(
    (variant) => variant.color === activeColor.color
  );
  const stock = selectedVariant?.stock || 0;

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
    <div className="flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200">
      {/* Imagen */}
      <Link
        to={`/celulares/${slug}`}
        className="relative flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative h-[350px] w-full bg-gradient-to-b from-yellow-50 to-orange-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <img src={img} alt={name} className="object-contain h-full w-full" />
          {stock === 0 && (
            <div className="absolute top-3 left-3">
              <Tag contentTag="agotado" />
            </div>
          )}
        </div>

        {/* Botón flotante */}
        <button
          onClick={handleAddClick}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full shadow-xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
        >
          <FiShoppingCart />
          Añadir
        </button>
      </Link>

      {/* Información */}
      <div className="flex flex-col items-center text-center px-4 py-3 gap-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
          {name}
        </h3>
        <p className="text-xl font-bold text-gray-800">{formatPrice(price)}</p>

        {/* Colores */}
        <div className="flex gap-2 mt-2">
          {colors.map((color) => (
            <span
              key={color.color}
              className={`w-6 h-6 rounded-full cursor-pointer border-2 transition-transform ${
                activeColor.color === color.color
                  ? "border-orange-500 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
