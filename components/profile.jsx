"use client";
import { CiEdit } from "react-icons/ci";
import { Avatar, Button } from "@nextui-org/react";
export default function Profile() {
  return (
    <section>
      <div className="flex flex-col px-2 py-5">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          size="lg"
        />
        <div className="flex  items-center gap-x-3">
          <div className="flex flex-col">
            <p className="text-black font-medium text-lg">Nehemiah</p>
            <blockquote className="text-base textgray-700 py-2">
              Hello my name is nehemiah, I am a fullstack developer..
            </blockquote>
          </div>

          <Button className="bg-white" isIconOnly>
            <CiEdit />
          </Button>
        </div>
      </div>

      <div>
      <p>Uploaded gests</p>
      </div>
    </section>
  );
}
