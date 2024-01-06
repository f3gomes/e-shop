import { Container } from "@/components/Container";
import { HomeBanner } from "@/components/HomeBanner";
import { ProductList } from "@/components/ProductList";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>

        <ProductList />
      </Container>
    </div>
  );
}
