import { CATEGORIES_DATA } from "@/lib/database/data";
import CategoryClientView from "./CategoryClientView";

export function generateStaticParams() {
  return CATEGORIES_DATA.map((c) => ({ slug: c.slug }));
}

export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CategoryClientView slug={params.slug} />;
}
