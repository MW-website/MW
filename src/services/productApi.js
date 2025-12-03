/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 01:47:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Product API service (DummyJSON Edition)
 * Clean. Predictable. Fashion-focused mapping.
 */

const BASE = "https://dummyjson.com/products";

/* ------------------------------------------ */
/* CATEGORY MAPPING FOR YOUR FASHION WEBSITE  */
/* ------------------------------------------ */
const CATEGORY_MAP = {
  "womens-dresses": "Dresses",
  "womens-shoes": "Accessories",
  "womens-bags": "Bags",
  "womens-jewellery": "Accessories",
  "tops": "Tops",
  "mens-shirts": "Shirts",
  "mens-shoes": "Accessories",
  "sunglasses": "Accessories",
  "skincare": "Accessories",
  "fragrances": "Accessories",
};

/* ------------------------------------------ */
/* NORMALIZER — Build clean product object    */
/* ------------------------------------------ */
function normalizeProduct(p) {
  const apiCategory = p.category?.toLowerCase() || "";

  return {
    id: p.id,
    name: p.title,
    slug: p.title.toLowerCase().replace(/\s+/g, "-"),
    category: CATEGORY_MAP[apiCategory] || apiCategory,
    price: p.price,
    image: p.thumbnail || (p.images?.[0] ?? ""),
    short: p.description.substring(0, 120) + "...",
    description: p.description,
    tags: [CATEGORY_MAP[apiCategory] || apiCategory],
    colors: ["#D6C7B3", "#000000"],
    rating: p.rating,
    reviews: p.stock,
    onSale: Math.random() > 0.75,
  };
}

/* ------------------------------------------ */
/* FETCH ALL PRODUCTS                         */
/* ------------------------------------------ */
export async function fetchAllProducts() {
  try {
    const res = await fetch(`${BASE}?limit=100`);
    const data = await res.json();
    return data.products.map(normalizeProduct);
  } catch (err) {
    console.error("fetchAllProducts failed:", err);
    return [];
  }
}

/* ------------------------------------------ */
/* FETCH BY CATEGORY                          */
/* ------------------------------------------ */
export async function fetchProductsByCategory(category) {
  try {
    const res = await fetch(`${BASE}/category/${category}`);
    const data = await res.json();
    return data.products.map(normalizeProduct);
  } catch (err) {
    console.error("fetchProductsByCategory failed:", err);
    return [];
  }
}

/* ------------------------------------------ */
/* FETCH SINGLE PRODUCT                       */
/* ------------------------------------------ */
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${BASE}/${id}`);
    if (!res.ok) return null;

    const data = await res.json();
    return normalizeProduct(data);
  } catch (err) {
    console.error("fetchProductById failed:", err);
    return null;
  }
}

/* ------------------------------------------ */
/* SEARCH PRODUCTS                            */
/* ------------------------------------------ */
export async function searchProducts(query) {
  if (!query.trim()) return [];

  try {
    const res = await fetch(`${BASE}/search?q=${query}`);
    const data = await res.json();
    return data.products.map(normalizeProduct);
  } catch (err) {
    console.error("searchProducts failed:", err);
    return [];
  }
}
