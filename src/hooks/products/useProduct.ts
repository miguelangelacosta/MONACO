import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../../actions';
import type { Product } from '../../interfaces'; // ajusta según tu tipo de producto

export const useProduct = (slug: string) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const result = await getProductBySlug(slug);
      if (!result) {
        throw new Error('Producto no encontrado');
      }
      return result;
    },
    retry: false, // evita múltiples errores en consola
  });

  return {
    product: product ?? null, // siempre devuelve algo, evita errores de render
    isLoading,
    isError,
    error,
  };
};
