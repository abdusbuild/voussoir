import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { cookiePolicy } from "@/data/policies";

export const metadata: Metadata = { title: "Cookie Policy — Voussoir" };

export default function CookiePolicyPage() {
  return <PolicyPage policy={cookiePolicy} />;
}
