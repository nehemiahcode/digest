export default async function getSingleGest(id) {
  try {
    const response = await  fetch(`http://localhost:3000/api/gestpost/get/${id}`, {
      cache: "no-store",
    });
    const gest = await response.json();
    return gest.data;
  } catch (error) {
    console.log(error);
  }
}
