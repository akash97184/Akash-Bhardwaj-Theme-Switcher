import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

const ProductList = ({ products, isLoading, isError }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.initialTheme);

  const containerClass =
    theme === "colorful"
      ? "grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-6"
      : "flex flex-wrap gap-6";

  return (
    <div>
      <h2 className="text-center text-xl md:text-2xl font-bold mb-6">
        ✨ Check Out These Amazing Products! 🛍️
      </h2>
      <div className={`p-6 justify-center ${containerClass}`}>
        {isLoading && <p className=" mx-auto">Loading...</p>}
        {isError && <p className=" mx-auto">Failed to load products.</p>}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
