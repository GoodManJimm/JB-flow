// Page-specific JSON-LD per plan.md §13.1. Each page embeds its own node.
// Types are intentionally narrow: NEVER use "Product" for a mall.

import type { Mall } from "@/lib/types";

export function webPage(name: string, url: string, description?: string) {
   return {
       "@context": "https://schema.org",
       "@type": "WebPage",
       name,
       url,
       ...(description ? { description } : {}),
     };
}

// §13.1: mall detail -> ShoppingCenter + Place (NOT Product).
export function shoppingCenter(mall: Mall, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["ShoppingCenter", "Place"],
    name: mall.name,
    url,
    ...(mall.lat !== undefined && mall.lng !== undefined
        ? {
             address: {
              "@type": "Place",
              location: {
               "@type": "GeoCoordinates",
               latitude: mall.lat,
               longitude: mall.lng,
              },
             },
           }
       : {}),
    };
}

export function place(name: string, url: string) {
  return {
     "@context": "https://schema.org",
     "@type": "Place",
     name,
     url,
    };
}

export function organization(name: string, url: string, email?: string) {
   return {
       "@context": "https://schema.org",
       "@type": "Organization",
       name,
       url,
       ...(email ? { email } : {}),
     };
}

// Small helper to JSON.stringify a node into a script component string.
export function jsonLd(obj: unknown) {
  return JSON.stringify(obj);
}
