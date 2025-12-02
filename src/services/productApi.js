/**
 * @description      : API service for fetching product data
 * @author           : fortu
 * @created          : 02/12/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/12/2025
 * - Modification    : Fetches from Fake Store API
 */

// Use DummyJSON as the data source for demo purposes
const API_ALL = "https://dummyjson.com/products?limit=100";

function detectCategoryFromTitle(title) {
  const t = title.toLowerCase();
  if (t.includes("dress")) return "Dresses";
  if (t.includes("skirt")) return "Skirts";
  if (t.includes("shirt") || t.includes("tee") || t.includes("top")) return "Tops";
  if (t.includes("bag") || t.includes("purse") || t.includes("backpack")) return "Bags";
  if (t.includes("ring") || t.includes("necklace") || t.includes("watch")) return "Accessories";
  if (t.includes("shirt")) return "Shirts";
  return "Accessories";
}

function transformProduct(apiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    slug: apiProduct.title.toLowerCase().replace(/\s+/g, "-"),
    category: detectCategoryFromTitle(apiProduct.title),
    price: Math.round(apiProduct.price * 100) / 100,
    image: Array.isArray(apiProduct.images) && apiProduct.images[0] ? apiProduct.images[0] : apiProduct.thumbnail || "",
    short: (apiProduct.description || "").substring(0, 120) + "...",
    description: apiProduct.description || "",
    tags: [detectCategoryFromTitle(apiProduct.title)],
    colors: ["#D6C7B3", "#000000"],
    rating: apiProduct.rating || 4.2,
    reviews: apiProduct.stock || 0,
    onSale: Math.random() > 0.75,
  };
}

let cachedProducts = null;

export async function fetchAllProducts() {
  try {
    if (cachedProducts) return cachedProducts;
    const res = await fetch(API_ALL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    const products = (data.products || []).map(transformProduct);
    cachedProducts = products;
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchProductsByCategory(category) {
  const all = await fetchAllProducts();
  return all.filter((p) => p.category === category).slice(0, 50);
}

export async function fetchProductById(id) {
  try {
    const all = await fetchAllProducts();
    const found = all.find((p) => String(p.id) === String(id));
    return found || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function searchProducts(query) {
  const all = await fetchAllProducts();
  return all.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())).slice(0, 50);
}
