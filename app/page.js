import Homepage from "@/components/Homepage";
import Layout from "@/components/layout";
// import { getServerSession } from "next-auth";
// import { Options } from "./api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
export default  function MainHomePage() {
  // const session = await getServerSession(Options);
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <Layout>
      <Homepage />
    </Layout>
  );
}
