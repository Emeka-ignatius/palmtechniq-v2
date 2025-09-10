import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { filename, contentType, type } = await request.json();

    if (!["image", "video"].includes(type)) {
      return Response.json(
        {
          success: false,
          error: "Invalid file type. Only images and videos are supported.",
        },
        { status: 400 }
      );
    }
    const client = new S3Client({
      region: process.env.AWS_REGION ?? "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
    const maxSize = type === "image" ? 10 * 1024 * 1024 : 100 * 1024 * 1024; // 10MB for images, 100MB for videos

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME ?? "",
      Key: `${type}/${uuidv4()}`,
      Conditions: [
        ["content-length-range", 0, maxSize],
        [
          "starts-with",
          "$Content-Type",
          type === "image" ? "image/" : "video/",
        ],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600,
    });

    console.log({ fields, url });
    return Response.json({ success: true, url, fields });
  } catch (error) {
    return new Response(JSON.stringify({ error: "unknown error occured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
