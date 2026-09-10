import type { MetadataRoute } from "next";

// Redesign preview: nothing here should be indexed alongside the live motiontheagency.com.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
