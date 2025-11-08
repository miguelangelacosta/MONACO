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

return ( <div className="space-y-16">
{/* Sección de características */} 

  {/* Productos recientes */}
  {isLoading ? (
    <ProductGridSkeleton numberOfProducts={4} />
  ) : (
    <ProductSlider
      title="Nuevos Productos"
      products={preparedRecentProducts}
    />
  )}

  {/* Productos destacados */}
  {isLoading ? (
    <ProductGridSkeleton numberOfProducts={4} />
  ) : (
    <ProductSlider
      title="Productos Destacados"
      products={preparedPopularProducts}
    />
  )}
    <ProductGrid
  title="Productos Recientes"
  products={preparedRecentProducts}
/>


  {/* Marcas */}
  <Brands />
<FeatureGrid />

</div>


);
};
