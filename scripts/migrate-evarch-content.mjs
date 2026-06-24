import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-07";
const token = process.env.SANITY_API_WRITE_TOKEN;

const missingEnvironment = [
  ["NEXT_PUBLIC_SANITY_PROJECT_ID", projectId],
  ["NEXT_PUBLIC_SANITY_DATASET", dataset],
  ["SANITY_API_WRITE_TOKEN", token],
].filter(([, value]) => !value).map(([name]) => name);

if (missingEnvironment.length) {
  console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
  console.error("Add them to .env.local, then run npm run migrate:content again.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function visibilityPatch(document, index) {
  const patch = {};

  if (document.showOnWebsite === undefined) {
    patch.showOnWebsite = true;
  }

  if (typeof document.order !== "number") {
    patch.order = index + 1;
  }

  return patch;
}

function slugPatch(document) {
  if (document.slug?.current || !document.title) return {};

  return {
    slug: {
      _type: "slug",
      current: slugify(document.title),
    },
  };
}

async function migrateCollection(type, needsSlug = false) {
  const documents = await client.fetch(
    `*[_type == $type] | order(coalesce(order, 1000) asc, _createdAt asc){_id, _type, title, slug, showOnWebsite, order}`,
    { type },
  );

  let changed = 0;
  let transaction = client.transaction();

  documents.forEach((document, index) => {
    const patch = {
      ...visibilityPatch(document, index),
      ...(needsSlug ? slugPatch(document) : {}),
    };

    if (Object.keys(patch).length) {
      transaction = transaction.patch(document._id, (builder) => builder.set(patch));
      changed += 1;
    }
  });

  if (changed) {
    await transaction.commit({ visibility: "sync" });
  }

  return { type, checked: documents.length, changed };
}

const results = await Promise.all([
  migrateCollection("project", true),
  migrateCollection("regulation", true),
  migrateCollection("expertise"),
  migrateCollection("processStep"),
]);

console.table(results);
console.log("Migration complete. Image alt text was intentionally left as an editor-facing warning because it requires human-written descriptions.");
