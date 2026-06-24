import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isSafeInternalPath } from "@/lib/site";

type SanityWebhookBody = {
  _type?: string;
  slug?: string | { current?: string };
};

function getSlug(value: SanityWebhookBody["slug"]) {
  return typeof value === "string" ? value : value?.current;
}

function pathsForDocument(body: SanityWebhookBody) {
  const paths = new Set<string>(["/", "/sitemap.xml"]);
  const slug = getSlug(body.slug);

  if (body._type === "project" && slug) {
    paths.add(`/works/${slug}`);
  }

  if (body._type === "regulation" && slug) {
    paths.add(`/regulation/${slug}`);
  }

  return [...paths];
}

function isAuthorized(request: NextRequest) {
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret") || request.headers.get("x-revalidate-secret");

  return Boolean(expectedSecret && providedSecret && expectedSecret === providedSecret);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SanityWebhookBody;
  const paths = pathsForDocument(body);

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const paths = isSafeInternalPath(path) ? [path!] : ["/"];

  paths.forEach((item) => revalidatePath(item));

  return NextResponse.json({ revalidated: true, paths });
}
