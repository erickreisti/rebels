import { StaticImageData } from "next/image";

export interface Wine {
  id: string;
  name: string;
  type: "rose" | "white" | "red" | "sparkling";
  description: string;
  region: string;
  alcohol: string;
  pairing: string;
  image: string | StaticImageData;
}

export interface BlogPost {
  id: string;
  title: string;
  author: {
    name: string;
    role: string;
    avatar: string | StaticImageData;
  };
  image: string | StaticImageData;
  excerpt: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
