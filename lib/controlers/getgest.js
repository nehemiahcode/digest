export default async function getGest() {
  try {
    const response = await fetch(`api/gestpost/get`, {
      cache: "no-store",
    });
    const gest = await response.json();
    return gest.data;
  } catch (error) {
    console.log(error);
  }
}
