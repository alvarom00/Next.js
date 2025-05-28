import { productsDB } from "../../data/products";
import DetailPage from "./DetailPage";

export default function Page({ params }) {
  const { slug } = params;
  const product = productsDB.find((product) => product.slug === slug);

  return <DetailPage product={product} />;
}