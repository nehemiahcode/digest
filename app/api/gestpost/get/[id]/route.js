import { connectMongoDb } from "@/lib/mongodb";
import Posts from "@/models/gest";
import { NextResponse } from "next/server";

//GETTING A SINGLE EVENT BY ID  for dynamic routing
export async function GET(req, { params: { id } }) {
  try {
    // Connect to the DB
    await connectMongoDb();
    // using the model to find and retrieve
    const post = await Posts.findOne({ _id: id });

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ok",
        data: post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Event",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

//Update/EDITING a Course
export async function PUT(request, { params: { id } }) {
  try {
    // Get the data from the request
    const requestBody = await request.json();

    console.log("Request Body:", requestBody);

    // Check if the request body is empty
    if (!requestBody || (!requestBody.newDescription && !requestBody.Image)) {
      return NextResponse.json(
        {
          message: "Empty or invalid request body",
        },
        {
          status: 400,
        }
      );
    }

    const { newDescription: description, Image: gestImage } = requestBody;

    // Connect to the DB
    await connectMongoDb();

    // Use the Model to update
    await Posts.findByIdAndUpdate(id, { description, gestImage });

    return NextResponse.json(
      {
        message: "Post updated successfully",
        data: { description, gestImage },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      {
        message: "Failed to update post",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
