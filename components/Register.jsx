"use client";
import { RegisterValidate } from "@/lib/validate";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: RegisterValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const resUserExists = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { user } = await resUserExists.json();
      if (user) {
        toast.error("Opps something is not right!");
        navigator.vibrate([100, 30, 50]);
        return;
      }

      const res = await fetch("api/signin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirect: false,
          name: values.name,
          email: values.email,
          password: values.password,
          // profilePicture: values.profilePicture,
        }),
      });
      if (res.ok) {
        router.push("/login");
        toast.success("you are now registered");
      } else {
        toast.error("Opps something went wrong");
      }
    } catch (error) {
      alert("Error durig registration:", error);
    }
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
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
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                // onChange={(e) => setName(e.target.value)}
                {...formik.getFieldProps("name")}
                className={` ${
                  formik.errors.name && formik.touched.name
                    ? "border-rose-600"
                    : ""
                } w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
                {...formik.getFieldProps("email")}
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
                // onChange={(e) => setPassword(e.target.value)}
                {...formik.getFieldProps("password")}
                className={` ${
                  formik.errors.password && formik.touched.password
                    ? " border-rose-600"
                    : ""
                } w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
              />
            </div>
            <Button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
