"use client";
import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import LoginValidate from "@/lib/validate";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: LoginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res.error) {
        toast.error("Access denied!");
        navigator.vibrate([100, 30, 50]);
        return;
      }
      if (res.ok) {
        toast.success("Logged in succesfully", { duration: 2000 });
        router.push("/");
        // setDisable(true);
        // setTimeout(() => {
        //   router.push("/");
        // }, 5000);
      } else {
        alert("not a user");
      }
    } catch (error) {
      console.log(" failed to go to home page", error);
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                name="email"
                className={` ${
                  formik.errors.email && formik.touched.email
                    ? " border-rose-600"
                    : ""
                } w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                name="password"
                className={` ${
                  formik.errors.password && formik.touched.email
                    ? " border-rose-600"
                    : ""
                } w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
              />
            </div>
            <Button
              type="submit"
              // disabled={formik.setSubmitting}
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>

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
    </main>
  );
}
