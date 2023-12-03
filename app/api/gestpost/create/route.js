import { connectMongoDb } from "@/lib/mongodb";
import Posts from "@/models/gest";
import { NextResponse } from "next/server";

const STATUS_FAILURE = { ok: false, code: 500 };
const STATUS_SUCCESS = { ok: true, code: 200 };

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongoDb();
    const post = await Posts.create(data)
      .populate("creator")
      .sort({ createdAt: -1 })
      .limit(100);
    if (!post) {
      return NextResponse({
        message: "event could not be created",
        data: [],
        status: STATUS_FAILURE,
      });
    }
    return NextResponse.json({ message: "gest created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "an error occured while creating.." },
      { status: 500 }
    );
  }
}
