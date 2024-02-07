import { ProductCard } from "../ProductCard";

interface ProductListProps {
  products: any[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 -mx-8">
      {products.map((item) => {
        return <ProductCard key={item.id} product={item} />;
      })}
    </div>
  );
}
