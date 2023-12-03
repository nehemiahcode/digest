import getSingleGest from "@/lib/controlers/getsinglegest";
import Editmodal from "@/components/editform";

export default async function EditCourse({ params: { id } }) {
  const gest = await getSingleGest(id);
  return (
    <>
      <Editmodal post={gest} />
    </>
  );
}
