"use client";
import {
  User,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
} from "@nextui-org/react";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoShareSocialOutline, IoCopyOutline } from "react-icons/io5";
import { BsBookmarks } from "react-icons/bs";
import { useEffect, useState } from "react";
import getUser from "../lib/controlers/getusers";
import getGest from "../lib/controlers/getgest";
import PostSkeleton from "./skeleton";
import NextLink from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  WeiboShareButton,
  WhatsappIcon,
  XIcon,
  TwitterShareButton,
} from "react-share";
import { useSession } from "next-auth/react";

export default function Postcards() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userData, setUserData] = useState([]);
  const [gestData, setGestData] = useState([]);
  //   const [edit, setEdit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUser();
      const gestsData = await getGest();
      //   const editPost = await getSingleGest();
      setUserData(usersData);
      setGestData(gestsData);
      //   setEdit(editPost);
    };

    fetchData();
  }, []);

  return (
    <section className=" w-full grid grid-cols-1 mt-7 px-5  place-items-center py-10 md:grid-cols-2 gap-10">
      {gestData.length === 0 && userData.length === 0 ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        gestData.map((u) => (
          <div
            key={u._id}
            className="w-[100%] rounded-md cursor-default h-[auto]  py-2 shadow-lg bg-white "
          >
            <div className="flex  items-center  px-2 justify-between">
              <>
                {userData.map((user) => (
                  <User
                    key={user._id}
                    size="lg"
                    name={user.name}
                    description={user.email}
                    avatarProps={{
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                  />
                ))}
              </>
              <Dropdown className="inset-0 rounded-none">
                <DropdownTrigger>
                  <Button isIconOnly className=" bg-white">
                    <SlOptionsVertical />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu className="">
                  <DropdownItem startContent={<IoCopyOutline />}>
                    Copy
                  </DropdownItem>
                  <DropdownItem startContent={<BsBookmarks />}>
                    Bookmark
                  </DropdownItem>
                  <DropdownItem
                    onClick={onOpen}
                    startContent={<IoShareSocialOutline />}
                  >
                    Share
                  </DropdownItem>
                  <DropdownItem
                    as={NextLink}
                    href={`/editgest/${u._id}`}
                    startContent={<CiEdit />}
                  >
                    Edit gest
                  </DropdownItem>
                  <DropdownItem
                    startContent={<MdDelete />}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <ShareModal isOpen2={isOpen} onOpenChange2={onOpenChange} />
            <div className="w-[100%] flex cursor-default md:cursor-pointer  flex-col py-2 px-2">
              <div className="flex w-full h-[300px]">
                <Image
                  src={u.gestImage}
                  className="w-full h-full object-cover "
                  alt="gest image"
                />
              </div>
              <blockquote className="pop text-sm text-black py-2">
                {u.description}
              </blockquote>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export function ShareModal({ isOpen2, onOpenChange2 }) {
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen2}
      onOpenChange={onOpenChange2}
      placement="bottom"
      className="rounded-none bg-white   px-3  py-3 "
      isDismissable={true}
    >
      <ModalContent>
        <ModalHeader>
          <p>help others by sharing</p>
        </ModalHeader>
        <ModalBody>
          <FacebookShareButton
            url={"https://web.facebook.com"}
            className="text-sm"
          >
            <FacebookIcon size={32} />
          </FacebookShareButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
