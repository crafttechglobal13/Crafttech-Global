import { PrismaClient } from "@prisma/client";
import { PRODUCTS_DATA, CATEGORIES_DATA } from "../lib/database/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CRAFTTECH GLOBAL Database...");

  // 1. Seed Categories
  for (const cat of CATEGORIES_DATA) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image: cat.image,
        isFeatured: true,
      },
    });
  }

  // 2. Seed Products
  for (const prod of PRODUCTS_DATA) {
    const created = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        slug: prod.slug,
        name: prod.name,
        sku: prod.sku,
        description: prod.description,
        shortDescription: prod.shortDescription,
        price: prod.price,
        salePrice: prod.originalPrice,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isFeatured: prod.isFeatured ?? false,
        isBestseller: prod.isBestseller ?? false,
        isNew: prod.isNew ?? false,
        stock: prod.stock,
        material: prod.material,
        color: prod.color,
        dimensions: prod.dimensions,
        weight: prod.weight,
        origin: prod.origin,
        craftsmanship: prod.craftsmanship,
        careInstructions: prod.careInstructions,
        shippingInfo: prod.shippingInfo,
      },
    });

    // Create primary image
    if (prod.images && prod.images.length > 0) {
      await prisma.productImage.create({
        data: {
          productId: created.id,
          url: prod.images[0],
          alt: prod.name,
          isPrimary: true,
          order: 0,
        },
      });
    }
  }

  // 3. Seed Default Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "CRAFTTECH GLOBAL",
      tagline: "Bringing Traditional Craftsmanship to Modern Living.",
      contactEmail: "care@crafttechglobal.com",
      contactPhone: "+91 98765 43210",
      defaultCurrency: "INR",
      supportedCurrencies: "INR,USD,GBP,EUR",
      announcementText:
        "✈ International Shipping Available | 🎁 Discover Our New Collection | 🏷 Free Shipping on Orders Above $100",
    },
  });

  console.log("CRAFTTECH GLOBAL database successfully seeded with heritage inventory!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

