"use client";
import { User, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import getUser from "../lib/controlers/getusers";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col px-3">
      {user.length === 0 ? (
        <div className="max-w-[300px] w-full flex items-center my-3 py-3 px-3 gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        user.map((u) => (
          <div
            key={u._id}
            className="max-w-[300px] w-full flex items-center my-3 py-3 px-3 gap-3"
          >
            <User
              size="lg"
              name={u.name}
              description={u.email}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </div>
        ))
      )}

      <nav className="flex flex-col my-2">
        <ul>
          <li className=" rounded-md py-2 px-2 hover:bg-slate-400 hover:text-black">
            <Link
              href={"/"}
              scroll={false}
              prefetch={false}
              className="flex items-center gap-x-2"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
