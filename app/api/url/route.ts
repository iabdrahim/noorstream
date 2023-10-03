import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    let url = req.nextUrl.searchParams.get("url") || "";
    if (!url) {
      return new Response("url is not valid", { status: 400 });
    }
    let res = await axios.get(url);
    return new Response(res.data);
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
};
