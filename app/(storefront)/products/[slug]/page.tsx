import { PRODUCTS_DATA } from "@/lib/database/data";
import ProductClientView from "./ProductClientView";

export function generateStaticParams() {
  return PRODUCTS_DATA.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProductClientView slug={params.slug} />;
}
