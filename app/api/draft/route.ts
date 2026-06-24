import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { isSafeInternalPath } from "@/lib/site";

function destinationFromRequest(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const type = request.nextUrl.searchParams.get("type");
  const slug = request.nextUrl.searchParams.get("slug");

  if (isSafeInternalPath(path)) return path!;
  if (type === "project" && slug) return `/works/${slug}`;
  if (type === "regulation" && slug) return `/regulation/${slug}`;

  return "/";
}

export async function GET(request: NextRequest) {
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ enabled: false, message: "Invalid preview secret." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(destinationFromRequest(request));
}
