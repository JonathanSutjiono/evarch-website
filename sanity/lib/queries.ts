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
  "projects": *[_type == "project" && coalesce(showOnWebsite, published, true) == true] | order(featured desc, order asc){
    _id, title, "slug": slug.current, category, location, year, scope,
    status, coverImage, gallery, description, featured, showOnWebsite, order,
    seoTitle, seoDescription
  },
  "about": *[_type == "about"][0]{
    heading, "bodyText": pt::text(body), image, values[]{title, description}
  },
  "expertise": *[_type == "expertise" && coalesce(showOnWebsite, published, true) == true] | order(order asc){
    _id, title, description, showOnWebsite, order
  },
  "stra": *[_type == "stra"][0]{
    heading, description, badgeText, daiLogo, verificationUrl, buttonLabel, note
  },
  "regulations": *[_type == "regulation" && coalesce(showOnWebsite, published, true) == true] | order(publishedAt desc){
    _id, title, "slug": slug.current, category, excerpt, coverImage,
    readTime, publishedAt, showOnWebsite, seoTitle, seoDescription
  },
  "contact": *[_type == "contact"][0]{
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
