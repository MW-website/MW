// Export as productsApi object for compatibility
export const productsApi = {
  fetchAll: fetchAllProducts,
  fetchByCategory: fetchProductsByCategory,
  fetchById: fetchProductById,
  search: searchProducts,
};
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
 * Product API service (Multi-API Fashion Edition)
 * Combines DummyJSON + FakeStore API for better fashion data
 */

const DUMMY_BASE = "https://dummyjson.com/products";
const FAKESTORE_BASE = "https://fakestoreapi.com/products";

/* ------------------------------------------ */
/* CATEGORY MAPPING FOR YOUR FASHION WEBSITE  */
/* ------------------------------------------ */
const DUMMY_CATEGORY_MAP = {
  "womens-dresses": "Dresses",
  "womens-bags": "Bags",
  "tops": "Tops",
};

const FAKESTORE_CATEGORY_MAP = {
  "women's clothing": "Dresses",
  "men's clothing": "Shirts",
  "jewelery": "Accessories",
};

/* Only allow these fashion categories */
const ALLOWED_CATEGORIES = ["Bags", "Tops", "Dresses", "Skirts", "Shirts", "Accessories"];

/* ------------------------------------------ */
/* NORMALIZERS — Build clean product objects  */
/* ------------------------------------------ */
function normalizeDummyProduct(p) {
  const apiCategory = p.category?.toLowerCase() || "";
  const mappedCategory = DUMMY_CATEGORY_MAP[apiCategory];
  
  if (!mappedCategory) return null;

  return {
    id: `dummy-${p.id}`,
    name: p.title,
    slug: p.title.toLowerCase().replace(/\s+/g, "-"),
    category: mappedCategory,
    price: p.price,
    image: p.thumbnail || (p.images?.[0] ?? ""),
    short: p.description.substring(0, 120) + "...",
    description: p.description,
    tags: [mappedCategory],
    colors: ["#D6C7B3", "#000000"],
    rating: p.rating || 4.5,
    reviews: p.stock || 12,
    onSale: Math.random() > 0.75,
  };
}

function normalizeFakeStoreProduct(p) {
  const apiCategory = p.category?.toLowerCase() || "";
  let mappedCategory = FAKESTORE_CATEGORY_MAP[apiCategory];
  
  // Smart categorization based on title/description
  const title = p.title.toLowerCase();
  const desc = p.description.toLowerCase();
  
  if (title.includes("bag") || title.includes("backpack") || title.includes("tote") || title.includes("purse")) {
    mappedCategory = "Bags";
  } else if (title.includes("dress") || title.includes("gown") || desc.includes("dress")) {
    mappedCategory = "Dresses";
  } else if (title.includes("skirt") || desc.includes("skirt")) {
    mappedCategory = "Skirts";
  } else if (title.includes("shirt") || title.includes("button") || apiCategory === "men's clothing") {
    mappedCategory = "Shirts";
  } else if (title.includes("top") || title.includes("tee") || title.includes("t-shirt") || title.includes("blouse")) {
    mappedCategory = "Tops";
  } else if (title.includes("jacket") || title.includes("sweater") || title.includes("hoodie") || title.includes("cardigan")) {
    mappedCategory = "Tops";
  } else if (apiCategory === "women's clothing") {
    // If it's women's clothing and not categorized, make it a dress or top
    mappedCategory = Math.random() > 0.5 ? "Dresses" : "Tops";
  }
  
  if (!mappedCategory || !ALLOWED_CATEGORIES.includes(mappedCategory)) return null;

  return {
    id: `fake-${p.id}`,
    name: p.title,
    slug: p.title.toLowerCase().replace(/\s+/g, "-"),
    category: mappedCategory,
    price: p.price,
    image: p.image,
    short: p.description.substring(0, 120) + "...",
    description: p.description,
    tags: [mappedCategory],
    colors: ["#D6C7B3", "#000000"],
    rating: p.rating?.rate || 4.5,
    reviews: p.rating?.count || 12,
    onSale: Math.random() > 0.75,
  };
}

/* ------------------------------------------ */
/* FETCH ALL PRODUCTS FROM MULTIPLE APIS      */
/* ------------------------------------------ */
export async function fetchAllProducts() {
  try {
    // Fetch from both APIs in parallel
    const [dummyRes, fakeStoreRes] = await Promise.all([
      fetch(`${DUMMY_BASE}?limit=100`).catch(() => null),
      fetch(FAKESTORE_BASE).catch(() => null)
    ]);

    const allProducts = [];

    // Process DummyJSON products
    if (dummyRes && dummyRes.ok) {
      const dummyData = await dummyRes.json();
      const dummyProducts = dummyData.products
        .map(normalizeDummyProduct)
        .filter(p => p !== null);
      allProducts.push(...dummyProducts);
    }

    // Process FakeStore products
    if (fakeStoreRes && fakeStoreRes.ok) {
      const fakeStoreData = await fakeStoreRes.json();
      const fakeStoreProducts = fakeStoreData
        .map(normalizeFakeStoreProduct)
        .filter(p => p !== null);
      allProducts.push(...fakeStoreProducts);
    }

    // Filter to only allowed categories
    return allProducts.filter(p => ALLOWED_CATEGORIES.includes(p.category));
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
    // Fetch all products and filter by category
    const allProducts = await fetchAllProducts();
    return allProducts.filter(p => p.category === category);
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
    // Determine which API to use based on ID prefix
    if (id.startsWith('dummy-')) {
      const realId = id.replace('dummy-', '');
      const res = await fetch(`${DUMMY_BASE}/${realId}`);
      if (!res.ok) return null;
      const data = await res.json();
      return normalizeDummyProduct(data);
    } else if (id.startsWith('fake-')) {
      const realId = id.replace('fake-', '');
      const res = await fetch(`${FAKESTORE_BASE}/${realId}`);
      if (!res.ok) return null;
      const data = await res.json();
      return normalizeFakeStoreProduct(data);
    }
    
    // Fallback: search in all products
    const allProducts = await fetchAllProducts();
    return allProducts.find(p => p.id === id) || null;
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
