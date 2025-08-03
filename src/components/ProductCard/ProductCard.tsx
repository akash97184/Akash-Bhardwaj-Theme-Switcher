import type { Product, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { incrementItemCount } from "@/store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "@/store";

type Props = {
  product: Product;
  theme: "light" | "dark" | "colorful";
};

const getThemeCardStyles = (theme: Theme) => {
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  return {
    cardWrapper: isDark
      ? "bg-[var(--product-dark-color)] text-white"
      : isColorful
      ? "bg-white/80 backdrop-blur-md text-black shadow-xl border-2 border-pink-300 rounded-2xl hover:shadow-pink-400/50 transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
      : "bg-white text-black",

    heading: isDark
      ? "text-white"
      : isColorful
      ? "text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-bold"
      : "text-gray-900",

    description: isDark
      ? "text-gray-400"
      : isColorful
      ? "text-gray-700"
      : "text-gray-600",

    price: isDark
      ? "text-white"
      : isColorful
      ? "text-pink-700 font-semibold"
      : "text-black",

    cardButton: isDark
      ? "bg-[var(--theme-dark-color)]  text-white py-1 px-3 rounded-full"
      : isColorful
      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white py-1 px-3 rounded-full "
      : "bg-[var(--theme-light-color)] text-white py-1 px-3 rounded-full",
  };
};


const ProductCard = ({ product, theme }: Props) => {
  const { cardButton, cardWrapper, description, heading, price } =
    getThemeCardStyles(theme);

  const { itemCount } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (itemCount === 20) {
      toast.error("Max Item Reached");
      return;
    }

    dispatch(incrementItemCount());
    toast.success("Item added to cart");
  };

  return (
    <div
      className={cn(
        "w-80  cursor-pointer border-[1px] border-[#181D24]/20 rounded-lg overflow-hidden hover:shadow-[black_0px_5px_15px] hover:-translate-y-2 hover:rotate-1 ease-in transition-all",
        cardWrapper
      )}
    >
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="w-full h-48 object-contain bg-white p-4"
      />
      <div className="p-4 pt-6">
        <h2 className={cn("text-md font-semibold truncate", heading)}>
          {product.title}
        </h2>
        <p className={cn("text-sm line-clamp-2", description)}>
          {product.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className={cn("font-bold ", price)}>${product.price}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn("text-sm font-medium cursor-pointer hover:scale-105 transition-all", cardButton)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
