"use client";
import {
  Button,
  useDisclosure,
  Modal,
  ModalHeader,
  Image,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useFormik } from "formik";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import { MdAdd } from "react-icons/md";
import { TbBookUpload } from "react-icons/tb";
import { UploadValidation } from "@/lib/validate";

export default function Creategestbtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        size="lg"
        className="fixed bottom-20 right-10 z-[999] bg-slate-900 text-xl text-white rounded-full"
      >
        <MdAdd />
      </Button>

      <CreateGestModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export function CreateGestModal({ isOpen, onOpenChange }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const formik = useFormik({
    initialValues: {
      description: "",
      gestImage: "",
    },
    validate: UploadValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    const response = await fetch("http://localhost:3000/api/gestpost/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: values.description,
        gestImage: values.gestImage,
      }),
    });
    if (response.ok) {
      toast.success("gest created...");
      setTimeout(() => {
        router.refresh();
      }, 5000);
    } else {
      toast.error("something went wrong");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={true}
      placement="center"
      size={"xl"}
      className=" py-8 rounded"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <Toaster
              toastOptions={{
                success: {
                  style: {
                    background: "green",
                    color: "white",
                    duration: 2000,
                  },
                },
                error: {
                  style: {
                    background: "red",
                    color: "white",
                  },
                },
              }}
            />
            <ModalHeader>
              <p>Tell others what you know about anything..</p>
            </ModalHeader>

            <ModalBody>
              {/* <Image src /> */}
              <form onSubmit={formik.handleSubmit}>
                {formik.values.gestImage ? (
                  <div className="flex items-center flex-col  w-full">
                    <Image
                      src={formik.values.gestImage}
                      alt="Profile picture"
                      width={100}
                      height={100}
                      className=" border object-cover"
                    />
                  </div>
                ) : (
                  <UploadButton
                    endpoint="gestImage"
                    appearance={{
                      button: {
                        background: "#131b36",
                        color: "white",
                        padding: "4px",
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      console.log("Upload Response:", res);
                      if (res[0] && res[0].url) {
                        setImageUrl(res[0].url);
                        formik.setFieldValue("gestImage", res[0].url);
                        formik.getFieldProps("gestImage");
                      }

                      // Do something with the response
                      console.log("Files:", res);
                      // toast.success("Uploaded");
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      toast.error("something went wrong!!");
                    }}
                  />
                )}
                <textarea
                  {...formik.getFieldProps("description")}
                  className={` ${
                    formik.errors.description && formik.touched.description
                      ? "border-orange-500"
                      : ""
                  }  resize-none rounded outline-none w-full border py-2 px-2 h-[200px]`}
                ></textarea>
                <div className="flex items-center gap-x-4 justify-between">
                  <Button
                    type="button"
                    onClick={onClose}
                    className=" bg-red-500 text-white rounded"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    startContent={<TbBookUpload />}
                    className="bg-slate-800 text-white rounded"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
