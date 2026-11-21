import { PRODUCTS_DATA, CATEGORIES_DATA, ProductItem } from "./data";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  currency: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentMethod: "RAZORPAY" | "STRIPE" | "COD";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  shippingAddress: {
    fullName: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    image: string;
    sku?: string;
  }>;
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
}

export interface EnquiryRecord {
  id: string;
  type: "CUSTOM_ORDER" | "BULK_ORDER" | "WHOLESALE" | "CONTACT";
  name: string;
  email: string;
  phone: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "CONVERTED" | "CLOSED";
  details: Record<string, any>;
  createdAt: string;
}

// Global persistent store across hot reloads in Next.js development
declare global {
  var __crafttech_products: ProductItem[] | undefined;
  var __crafttech_orders: OrderRecord[] | undefined;
  var __crafttech_enquiries: EnquiryRecord[] | undefined;
  var __crafttech_subscribers: string[] | undefined;
}

if (!global.__crafttech_products) {
  global.__crafttech_products = [...PRODUCTS_DATA];
}

if (!global.__crafttech_orders) {
  global.__crafttech_orders = [
    {
      id: "ord_sample_01",
      orderNumber: "CG-2026-9812",
      customerName: "Patron Client",
      email: "patron@crafttechglobal.com",
      phone: "+91 90792 12937",
      currency: "INR",
      subtotal: 41900,
      discount: 4190,
      shippingFee: 0,
      total: 37710,
      status: "SHIPPED",
      paymentMethod: "STRIPE",
      paymentStatus: "PAID",
      shippingAddress: {
        fullName: "Patron Client",
        street: "H - 13, Gandhi Nagar",
        apartment: "Naka Madaar",
        city: "Ajmer",
        state: "RJ",
        postalCode: "305001",
        country: "India",
        phone: "+91 90792 12937",
      },
      items: [
        {
          productId: "prod_01",
          name: "Handmade Persian Rug",
          price: 41900,
          quantity: 1,
          size: "5 ft x 8 ft",
          color: "Heritage Maroon",
          image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80",
          sku: "CG-RUG-PRS-001",
        },
      ],
      trackingNumber: "DHL-984210745US",
      carrier: "DHL Express Global",
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: "ord_sample_02",
      orderNumber: "CG-2026-9813",
      customerName: "Vikram Singhania",
      email: "vikram.s@singhania.in",
      phone: "+91 98200 11223",
      currency: "INR",
      subtotal: 19950,
      discount: 0,
      shippingFee: 0,
      total: 19950,
      status: "CONFIRMED",
      paymentMethod: "RAZORPAY",
      paymentStatus: "PAID",
      shippingAddress: {
        fullName: "Vikram Singhania",
        street: "45 Marine Drive",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400020",
        country: "India",
        phone: "+91 98200 11223",
      },
      items: [
        {
          productId: "prod_06",
          name: "Royal Brass Elephant Figurine Pair",
          price: 12500,
          quantity: 1,
          size: "8 inch",
          color: "Polished Antique Gold",
          image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
          sku: "CG-ART-ELP-006",
        },
        {
          productId: "prod_05",
          name: "Decorative Brass Vase",
          price: 7450,
          quantity: 1,
          size: "14 inch",
          color: "Royal Antique Gold",
          image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
          sku: "CG-ART-VAS-005",
        },
      ],
      trackingNumber: "BLUEDART-889104",
      carrier: "Blue Dart Apex",
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
  ];
}

if (!global.__crafttech_enquiries) {
  global.__crafttech_enquiries = [
    {
      id: "enq_sample_01",
      type: "CUSTOM_ORDER",
      name: "Ambassador David Sterling",
      email: "d.sterling@embassy-decor.org",
      phone: "+44 20 7946 0991",
      status: "QUOTED",
      details: {
        category: "Carpets & Rugs",
        dimensions: "12 ft x 18 ft",
        material: "Kashmir Silk & Wool Blend",
        color: "Heritage Maroon & Royal Navy Border",
        notes: "Custom banquet hall carpet featuring royal coat of arms crest.",
      },
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      id: "enq_sample_02",
      type: "BULK_ORDER",
      name: "Priya Mehra",
      email: "p.mehra@tajluxuryhotels.com",
      phone: "+91 98110 54321",
      status: "CONTACTED",
      details: {
        businessName: "Taj Heritage Luxury Suites",
        category: "Home Decor & Cushion Covers",
        estimatedQuantity: 250,
        country: "India",
        requirements: "Hand-embroidered Zari velvet cushions in ruby and emerald for heritage hotel suites.",
      },
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];
}

if (!global.__crafttech_subscribers) {
  global.__crafttech_subscribers = [
    "sarah.m@crafttechglobal.com",
    "vikram.s@singhania.in",
    "curator@archdigest.com",
  ];
}

export const dbService = {
  // PRODUCTS
  getProducts(filter?: {
    category?: string;
    search?: string;
    badge?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) {
    let list = [...(global.__crafttech_products || [])];

    if (filter?.category && filter.category !== "all") {
      list = list.filter((p) => p.categorySlug === filter.category);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (filter?.badge) {
      list = list.filter((p) => p.badge === filter.badge);
    }

    if (filter?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (filter.minPrice || 0));
    }

    if (filter?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= (filter.maxPrice || Infinity));
    }

    if (filter?.sort) {
      switch (filter.sort) {
        case "price-asc":
          list.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          list.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          list.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        case "bestseller":
          list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
          break;
      }
    }

    return list;
  },

  getProductBySlug(slug: string) {
    return global.__crafttech_products?.find((p) => p.slug === slug);
  },

  getProductById(id: string) {
    return global.__crafttech_products?.find((p) => p.id === id);
  },

  createProduct(data: Omit<ProductItem, "id">) {
    const id = "prod_" + Date.now();
    const newProduct: ProductItem = { ...data, id };
    global.__crafttech_products = [newProduct, ...(global.__crafttech_products || [])];
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<ProductItem>) {
    const idx = (global.__crafttech_products || []).findIndex((p) => p.id === id);
    if (idx !== -1) {
      global.__crafttech_products![idx] = {
        ...global.__crafttech_products![idx],
        ...updates,
      };
      return global.__crafttech_products![idx];
    }
    return null;
  },

  deleteProduct(id: string) {
    global.__crafttech_products = (global.__crafttech_products || []).filter((p) => p.id !== id);
    return true;
  },

  // CATEGORIES
  getCategories() {
    return CATEGORIES_DATA;
  },

  getCategoryBySlug(slug: string) {
    return CATEGORIES_DATA.find((c) => c.slug === slug);
  },

  // ORDERS
  getOrders() {
    return global.__crafttech_orders || [];
  },

  getOrderById(id: string) {
    return (global.__crafttech_orders || []).find(
      (o) => o.id === id || o.orderNumber === id
    );
  },

  createOrder(data: Omit<OrderRecord, "id" | "orderNumber" | "createdAt">) {
    const orderNumber = `CG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      ...data,
      id: "ord_" + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    global.__crafttech_orders = [newOrder, ...(global.__crafttech_orders || [])];

    // Deduct stock
    newOrder.items.forEach((item) => {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    return newOrder;
  },

  updateOrderStatus(
    id: string,
    status: OrderRecord["status"],
    trackingNumber?: string,
    carrier?: string
  ) {
    const order = (global.__crafttech_orders || []).find((o) => o.id === id || o.orderNumber === id);
    if (order) {
      order.status = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      if (carrier) order.carrier = carrier;
      return order;
    }
    return null;
  },

  // ENQUIRIES
  getEnquiries() {
    return global.__crafttech_enquiries || [];
  },

  createEnquiry(enquiry: Omit<EnquiryRecord, "id" | "createdAt">) {
    const record: EnquiryRecord = {
      ...enquiry,
      id: "enq_" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    global.__crafttech_enquiries = [record, ...(global.__crafttech_enquiries || [])];
    return record;
  },

  updateEnquiryStatus(id: string, status: EnquiryRecord["status"]) {
    const enq = (global.__crafttech_enquiries || []).find((e) => e.id === id);
    if (enq) {
      enq.status = status;
      return enq;
    }
    return null;
  },

  // NEWSLETTER
  subscribeNewsletter(email: string) {
    const clean = email.toLowerCase().trim();
    if (!global.__crafttech_subscribers) global.__crafttech_subscribers = [];
    if (!global.__crafttech_subscribers.includes(clean)) {
      global.__crafttech_subscribers.push(clean);
    }
    return { success: true };
  },

  getSubscribers() {
    return global.__crafttech_subscribers || [];
  },
};

