// src/pages/CellPhonePage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDescription } from '../components/one-product/ProductDescription';
import type { JSONContent } from '@tiptap/react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: JSONContent | null; // ✅ Permitimos null aquí también
}

export const CellPhonePage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulación de fetch (ajústalo a tu API real)
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${slug}`);
      const data = await response.json();

      // Aseguramos que description pueda ser null si no existe
      setProduct({
        ...data,
        description: data.description ?? null,
      });
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <p className="text-center mt-10">Cargando producto...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-xl font-semibold mb-6">${product.price}</p>

      {/* ✅ Pasamos description (puede ser null) */}
      <ProductDescription content={product.description} />
    </div>
  );
};

