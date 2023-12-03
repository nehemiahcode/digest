export default async function getUser() {
    try {
      const response = await fetch(`api/signin/getuser`, {
        cache: "no-store",
      });
      const user = await response.json();
      return user.data;
    } catch (error) {
      console.log(error);
    }
  }
  