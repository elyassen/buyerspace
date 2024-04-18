export const BASE_URL = "https://major-backend-cucq.onrender.com";

export async function getProduct(endpoint, id) {
  const req = await fetch(`${BASE_URL}/${endpoint}/${id}`);
  const res = await req.json();
  return res;
}

export const handleWishlist = async (data) => {
  try {
    const req = await fetch(`${BASE_URL}/wishlist`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
  } catch (e) {
    console.log(e);
  }
};
