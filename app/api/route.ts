import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
    console.log(req.geo?.city);
    console.log(req.headers);
    console.log(req.ip);
    console.log(req.signal);
    console.log(req.destination);
    console.log(req.cookies);
    return new Response("hi");
}
