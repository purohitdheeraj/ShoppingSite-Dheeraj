export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status
    };
  }
  const parseData = await res.json();
  return parseData;
}

export async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status
    };
  }
  const parseData = await res.json();
  return parseData;
}
