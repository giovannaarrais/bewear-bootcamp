
import { getProducts } from "@/data/products/get";

import TableProducts from "./components/table-products";

export default async function ProdutosPage() {

  const products = await getProducts()
  

  return (
    <div>
      <h1 className="text-3xl font-bold">Produtos</h1>
      <p className="text-muted-foreground">Gerenciar produtos</p>

      <section>
        <TableProducts products={products}/>
      </section>
    </div>
  );
}
