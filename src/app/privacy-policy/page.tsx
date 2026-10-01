import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { privacyPolicy } from "@/data/policies";

export const metadata: Metadata = { title: "Privacy Policy — Voussoir" };

export default function PrivacyPolicyPage() {
  return <PolicyPage policy={privacyPolicy} showToc />;
}
