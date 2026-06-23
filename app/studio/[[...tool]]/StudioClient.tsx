"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "@/sanity.config";

export function StudioClient() {
  return (
    <div className="evarch-studio">
      <NextStudio config={config} />
    </div>
  );
}
