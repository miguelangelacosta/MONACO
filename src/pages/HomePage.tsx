import { Brands } from "../components/home/Brands";
import { FeatureGrid } from "../components/home/FeatureGrid";
import { ProductGrid } from "../components/home/ProductGrid";
import { ProductSlider } from "../components/products/ProductSlider";
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton";
import { prepareProducts } from "../helpers";
import { useHomeProducts } from "../hooks";

export const HomePage = () => {
  const { recentProducts, popularProducts, isLoading } = useHomeProducts();

  // Preparar datos para los sliders
  const preparedRecentProducts = prepareProducts(recentProducts);
  const preparedPopularProducts = prepareProducts(popularProducts);

  return (
    <div className="space-y-16">
      {/* Productos recientes */}
      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductSlider
          title="Novedades de la Semana"
          subtitle="Explora lo más reciente de nuestra colección MONACO. Productos seleccionados para quienes marcan la diferencia."
          products={preparedRecentProducts}
        />
      )}

      {/* Productos destacados */}
      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductSlider
          title="Favoritos de Nuestros Clientes"
          subtitle="Descubre los productos más populares, elegidos por quienes confían en el estilo y la calidad de MONACO."
          products={preparedPopularProducts}
        />
      )}

      {/* Productos recientes en grilla */}
      <ProductGrid
        title="Explora Nuestra Colección Completa"
        products={preparedRecentProducts}
      />

      {/* Marcas */}
      <Brands />

      {/* Características */}
      <FeatureGrid />
    </div>
  );
};
