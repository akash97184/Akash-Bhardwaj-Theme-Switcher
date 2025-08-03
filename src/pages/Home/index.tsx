import ProductList from "@/components/Products/ProductList";
import WelcomeSection from "@/components/WelcomeSection/WelcomeSection";
import { useGetProductsQuery } from "@/services/productApi";

const Home = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  return (
    <div>
      <WelcomeSection />
      <div className=" w-full flex flex-col items-center">
        <ProductList products={products} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
};

export default Home;
