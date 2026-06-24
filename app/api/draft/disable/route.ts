import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { isSafeInternalPath } from "@/lib/site";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const path = request.nextUrl.searchParams.get("path");

  redirect(isSafeInternalPath(path) ? path! : "/");
}
