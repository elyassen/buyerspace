export async function getProduct(endpoint, id) {
  const req = await fetch(`http://localhost:3001/${endpoint}/${id}`);
  const res = await req.json();
  return res;
}

export const handleWishlist = async (data) => {
  try {
    const req = await fetch("http://localhost:3001/wishlist", {
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
