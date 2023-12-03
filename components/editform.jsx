"use client";
import { Button, Image } from "@nextui-org/react";
import { GrDocumentUpdate } from "react-icons/gr";
import { useFormik } from "formik";
import { updateValidate } from "@/lib/validate";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import toast, { Toaster } from "react-hot-toast";

export default function Editmodal({ post }) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      description: post.description,
      gestImage: "",
    },
    validate: updateValidate,
    onSubmit, // Log validation errors on change
  });
  async function onSubmit(values) {
    const response = await fetch(
      `http://localhost:3000/api/gestpost/get/${post._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newDescription: values.description,
          Image: values.gestImage,
        }),
      }
    );
    if (response.ok) {
      router.push("/");
      alert("weldone");
    } else {
      console.error("Error updating description:", response.error);
    }

    console.log(values);
  }

  return (
    <div>
      <h1 className=" text-black font-medium text-lg">
        Have something else on your mind?
      </h1>
      <p className="text-gray-700">Let them know..</p>
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
          <UploadDropzone
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
                formik.setFieldValue("gestImage", res[0].url);
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
        <input
          type="text"
          {...formik.getFieldProps("description")}
          className={`resize-none rounded outline-none border text-black w-[300px]  py-3 px-2 `}
        />
        <div className="flex items-center gap-x-4 justify-end">
          <Button
            type="submit"
            startContent={<GrDocumentUpdate />}
            className="bg-slate-800 text-white rounded"
          >
            Update
          </Button>
        </div>
      </form>
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
    </div>
  );
}
