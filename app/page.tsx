export const revalidate = 0; // get new data from server

import getProducts, { IProductParams } from "@/actions/getProducts";
import { Container } from "@/components/Container";
import { HomeBanner } from "@/components/HomeBanner";
import { NullData } from "@/components/NullData";
import { ProductList } from "@/components/ProductList";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title="Nenhum produto encontrado" />;
  }

  return (
    <div className="p-8">
      <Container>
        <div>{/* <HomeBanner /> */}</div>

        <ProductList products={products} />
      </Container>
    </div>
  );
}
