"use client";
import { CiLogout } from "react-icons/ci";
import { Avatar, Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="static w-full py-3 flex items-center justify-between bg-[#0B1B36] shadow-lg px-2 sm:px-6 md:px-10 right-0">
      <span className="hero relative font-bold text-2xl text-white">
        Digest
        <span className=" absolute top-0 right-0 bg-orange-500 p-2 rounded-full"></span>
      </span>
      <div className="flex items-center gap-x-3">
        <Button
          onClick={signOut()}
          isIconOnly
          className="bg-white text-orange-500 font-bold cursor-pointer"
        >
          <CiLogout size={20} />
        </Button>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          size="md"
          className="md:hidden"
        />
      </div>
    </header>
  );
}
