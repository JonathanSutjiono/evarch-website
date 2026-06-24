import { defineQuery } from "next-sanity";

export const homePageQuery = defineQuery(`{
  "siteSettings": *[_type == "siteSettings"][0]{
    companyName, logo, logoMark, favicon, tagline, defaultSeoTitle,
    defaultSeoDescription, defaultOgImage, instagramUrl, linkedinUrl,
    whatsappNumber, email
  },
  "homepage": *[_type == "homepage"][0]{
    heroEyebrow, heroTitle, heroSubtitle, heroImage,
    primaryButtonLabel, primaryButtonLink, secondaryButtonLabel,
    secondaryButtonLink, introTitle, introText, selectedWorksTitle,
    selectedWorksSubtitle, studioTitle, studioText, expertiseTitle,
    expertiseSubtitle, contactTitle, contactSubtitle
  },
  "projects": *[_type == "project" && showOnWebsite != false] | order(coalesce(order, 1000) asc, featured desc, _createdAt asc){
    _id, title, "slug": slug.current, category, location, year, scope,
    status, coverImage, gallery, description, featured, showOnWebsite, order,
    seoTitle, seoDescription
  },
  "about": coalesce(*[_id == "studioAbout"][0], *[_id == "about"][0]){
    heading, "bodyText": pt::text(body), image, values[]{title, description}
  },
  "expertise": *[_type == "expertise" && showOnWebsite != false] | order(coalesce(order, 1000) asc, _createdAt asc){
    _id, title, description, showOnWebsite, order
  },
  "process": coalesce(*[_id == "processContent"][0], *[_id == "process"][0]){
    eyebrow, heading, description
  },
  "processSteps": *[_type == "processStep" && showOnWebsite != false] | order(coalesce(order, 1000) asc, _createdAt asc){
    _id, title, description, showOnWebsite, order
  },
  "stra": coalesce(*[_id == "straVerification"][0], *[_id == "stra"][0]){
    heading, description, badgeText, daiLogo, verificationUrl, buttonLabel, note
  },
  "regulations": *[_type == "regulation" && showOnWebsite != false] | order(coalesce(order, 1000) asc, publishedAt desc, _createdAt asc){
    _id, title, "slug": slug.current, category, excerpt, coverImage,
    readTime, publishedAt, showOnWebsite, order, seoTitle, seoDescription
  },
  "contact": coalesce(*[_id == "contactMap"][0], *[_id == "contact"][0]){
    heading, description, whatsappNumber, whatsappButtonLabel, email,
    address, googleMapsUrl, googleMapsEmbedUrl, latitude, longitude,
    instagramUrl, linkedinUrl
  },
  "footer": *[_type == "footer"][0]{
    shortDescription, copyrightText, links[]{label, url}
  }
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  companyName, defaultSeoTitle, defaultSeoDescription, defaultOgImage, favicon
}`);

export const projectSlugsQuery = defineQuery(`*[_type == "project" && showOnWebsite != false && defined(slug.current)] | order(coalesce(order, 1000) asc, _createdAt asc){
  "slug": slug.current,
  _updatedAt
}`);

export const regulationSlugsQuery = defineQuery(`*[_type == "regulation" && showOnWebsite != false && defined(slug.current)] | order(coalesce(order, 1000) asc, publishedAt desc, _createdAt asc){
  "slug": slug.current,
  _updatedAt
}`);

export const projectBySlugQuery = defineQuery(`*[_type == "project" && showOnWebsite != false && slug.current == $slug][0]{
  _id, _updatedAt, title, "slug": slug.current, category, location, year, scope,
  status, description, coverImage, gallery, featured, showOnWebsite, order,
  seoTitle, seoDescription
}`);

export const regulationBySlugQuery = defineQuery(`*[_type == "regulation" && showOnWebsite != false && slug.current == $slug][0]{
  _id, _updatedAt, title, "slug": slug.current, category, excerpt, content,
  coverImage, readTime, publishedAt, showOnWebsite, order, seoTitle, seoDescription
}`);
