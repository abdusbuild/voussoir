import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { termsOfService } from "@/data/policies";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  return <PolicyPage policy={termsOfService} showToc />;
}
