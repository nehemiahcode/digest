import { connectMongoDb } from "@/lib/mongodb";
import Posts from "@/models/gest";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Connect to the DB
    await connectMongoDb();
    //get the data using the model
    const posts = await Posts.find()
    //   .populate("creator")
    //   .sort({ createdAt: -1 })
    //   .limit(100);
    return NextResponse.json(
      {
        message: "Ok",
        data: posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch posts",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    //Get the Id of the course
    const id = request.nextUrl.searchParams.get("id");
    //Connect to db
    await connectMongoDb();
    //Use the model to delete
    await Posts.findByIdAndDelete(id);
    //return the response
    return NextResponse.json(
      {
        message: "Course deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Delete a Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
