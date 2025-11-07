import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
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

return ( <div
   className="relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-orange-400/60 hover:scale-[1.02]  w-full
"
 >
{/* Imagen */}
<Link
to={`/celulares/${slug}`}
className="relative flex items-center justify-center bg-gray-50 h-[240px] overflow-hidden"
> <img
       src={img}
       alt={name}
       className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
     />

    {stock === 0 && (
      <div className="absolute top-3 left-3">
        <Tag contentTag="agotado" />
      </div>
    )}
  </Link>

  {/* Info */}
  <div className="flex flex-col flex-1 justify-between p-4 text-center">
    <div>
      <h3 className="text-base font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
        {name}
      </h3>
      <p className="text-xl font-bold text-gray-900 mt-2">
        {formatPrice(price)}
      </p>
    </div>

    {/* Colores */}
    <div className="flex justify-center gap-2 mt-3 mb-4">
      {colors.map((color) => (
        <span
          key={color.color}
          className={`w-6 h-6 rounded-full cursor-pointer border-[2.5px] transition-all ${
            activeColor.color === color.color
              ? "border-orange-500 scale-110"
              : "border-gray-300 hover:scale-105"
          }`}
          style={{ backgroundColor: color.color }}
          onClick={() => setActiveColor(color)}
        />
      ))}
    </div>

    {/* Botón */}
    <button
      onClick={handleAddClick}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 active:scale-95"
    >
      <FiShoppingCart className="text-lg" />
      Añadir al carrito
    </button>
  </div>
</div>


);
};
