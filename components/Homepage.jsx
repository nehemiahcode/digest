"use client";
import { IoSearchSharp } from "react-icons/io5";
import Postcards, { MainCards } from "./postcards";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";
import getUser from "../lib/controlers/getusers";
export default function Homepage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const Users = async () => {
      const user = await getUser();
      setUsers(user);
    };
    Users();
  }, []);
  const FilterData = users.filter((value) => {
    if (searchTerm == "") {
      return value;
    } else if (
      value.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) {
      return value;
    }
  });
  return (
    <section className=" w-[100%]">
      <h1 className=" hero bg-clip-text text-transparent bg-gradient-to-r from-[#7e48e4] to-[#f8393c] text-4xl font-bold py-4 text-center">
        Inspire others with your words.
      </h1>
      <p className="pop text-lg text-black text-center">
        Tell the world something good and inspire friends and family
      </p>

      <div className="max-w-md px-4 mx-auto my-4">
        <div className="relative">
          <input
            onClick={onOpen}
            // disabled
            type="text"
            placeholder="Search users"
            // onChange={(event) => setSearchTerm(event.target.value)}
            className=" bg-white relative rounded-full w-full outline-none shadow-lg text-gray-700  py-3 pl-12 pr-4"
          />
          <span className="absolute top-1 bottom-0 w-6 h-6 my-auto text-gray-400 left-3">
            <IoSearchSharp size={20} />
          </span>

          <Modal
            size={"2xl"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top"
            className="rounded-none bg-white   px-3  py-3 "
            isDismissable={true}
          >
            <ModalContent>
              <ModalHeader>
                <div className="relative w-full  ">
                  <span className="absolute top-6 bottom-0 w-6 h-6 my-auto text-2xl text-gray-800 left-3">
                    <IoSearchSharp size={20} />
                  </span>

                  <input
                    type="search"
                    placeholder={"search users"}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className={`w-[100%] py-3 pl-12 mt-5 pr-4 text-sm text-gray-500 border  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600`}
                  />
                </div>
              </ModalHeader>
              <ModalBody>
                {searchTerm === "" ? (
                  <p className="text-center text-black flex items-center gap-x-2 justify-center text-sm  font-normal">
                    {" "}
                    Search for someone you know <LuUser2 />
                  </p>
                ) : FilterData.length === 0 ? (
                  <span className="text-white py-3 bg-slate-800 text-sm text-center">
                    No match for <strong>{searchTerm}</strong>
                  </span>
                ) : (
                  FilterData.map((value) => (
                    <ul
                      key={value.id}
                      className={`text-md text-black font-normal `}
                    >
                      <li className="pb-1 font-semibold hover:underline ">
                        <Link
                          scroll={false}
                          prefetch={false}
                          href={value._id}
                          className="py-2 flex"
                        >
                          <User
                            size="lg"
                            name={value.name}
                            description={value.email}
                            avatarProps={{
                              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                          />
                        </Link>
                      </li>
                    </ul>
                  ))
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <Postcards />
    </section>
  );
}
