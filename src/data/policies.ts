// PLACEHOLDER LEGAL CONTENT — NOT REVIEWED LEGAL COPY.
// This text was drafted to be structurally realistic for a small Indian
// architecture/interior design studio (contact form + project inquiry data,
// site analytics/cookies), but it has NOT been reviewed by a lawyer and
// must NOT be published as-is. Replace every section below with copy
// approved by qualified legal counsel before this site goes live.

export type PolicySection = {
  id: string;
  heading: string;
  body: string[];
  list?: string[];
};

export type Policy = {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: PolicySection[];
};

export const privacyPolicy: Policy = {
  title: "Privacy Policy",
  lastUpdated: "14 September 2026",
  intro: [
    "Voussoir (\"Voussoir\", \"we\", \"us\" or \"our\") respects your privacy and is committed to protecting the personal information you share with us through www.voussoir.in (the \"Site\"). This Privacy Policy explains what information we collect, how we use it, and the choices available to you.",
    "By using the Site, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not use the Site.",
  ],
  sections: [
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      body: [
        "We collect information you voluntarily provide to us, and limited information collected automatically when you browse the Site.",
      ],
      list: [
        "Contact and inquiry information — name, email address, phone number, and any project details you submit through our contact form or by email.",
        "Communications — records of correspondence if you contact us directly, including any files or images you choose to share about a prospective project.",
        "Usage data — pages visited, time spent on the Site, referring URLs, browser and device type, and approximate location, collected through cookies and analytics tools as described in our Cookie Policy.",
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How We Use Your Information",
      body: [
        "We use the information we collect to respond to project inquiries, understand your requirements, and communicate with you about a potential engagement. We also use aggregated, non-identifying usage data to understand how visitors use the Site and to improve its content and performance.",
        "We do not use the information you submit through our contact form for unsolicited marketing, and we do not sell your personal information to third parties.",
      ],
    },
    {
      id: "cookies-and-analytics",
      heading: "Cookies & Analytics",
      body: [
        "The Site uses cookies and similar technologies, including third-party analytics services, to understand how visitors interact with our pages. You can control or disable cookies through your browser settings. For details on what we use and how to manage your preferences, please see our Cookie Policy.",
      ],
    },
    {
      id: "sharing-and-disclosure",
      heading: "Sharing & Disclosure",
      body: [
        "We do not share your personal information with third parties except where necessary to operate the Site (for example, our website hosting or analytics providers, who are bound by their own confidentiality and data protection obligations), or where required by law, court order, or governmental request.",
      ],
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      body: [
        "We retain contact and project inquiry information for as long as reasonably necessary to respond to your inquiry, pursue a potential engagement, and comply with our legal and accounting obligations. You may request that we delete information you have submitted at any time, as described under Your Rights below.",
      ],
    },
    {
      id: "data-security",
      heading: "Data Security",
      body: [
        "We use reasonable administrative and technical safeguards to protect the information you provide to us. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      body: [
        "Subject to applicable law, you may have the right to:",
      ],
      list: [
        "Request access to the personal information we hold about you.",
        "Request correction of inaccurate or incomplete information.",
        "Request deletion of your personal information.",
        "Withdraw any consent you previously provided, where our processing relies on consent.",
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children's Privacy",
      body: [
        "The Site is not directed at children under the age of 18, and we do not knowingly collect personal information from children.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-Party Links",
      body: [
        "The Site may contain links to third-party websites, such as social media platforms. We are not responsible for the privacy practices of those third parties, and we encourage you to review their privacy policies before providing any information.",
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      body: [
        "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page reflects the most recent revision. Material changes will be reflected here, and we encourage you to review this page periodically.",
      ],
    },
    {
      id: "grievance-officer",
      heading: "Grievance Officer & Contact Us",
      body: [
        "In accordance with the Information Technology Act, 2000 and the rules made thereunder, the contact details of our Grievance Officer are provided below. If you have any questions, concerns, or complaints about this Privacy Policy or our handling of your information, please reach out to us.",
        "Voussoir, 505–507, Tower C, Urbtech Trade Centre, Sector 132, Noida, Uttar Pradesh, 201304. Email: info@voussoir.in. Phone: +91 93196 88233.",
      ],
    },
  ],
};

export const termsOfService: Policy = {
  title: "Terms of Service",
  lastUpdated: "14 September 2026",
  intro: [
    "These Terms of Service (\"Terms\") govern your access to and use of www.voussoir.in (the \"Site\"), operated by Voussoir (\"Voussoir\", \"we\", \"us\" or \"our\"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.",
  ],
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of Terms",
      body: [
        "By using the Site, submitting a project inquiry, or otherwise interacting with our content, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.",
      ],
    },
    {
      id: "use-of-the-website",
      heading: "Use of the Website",
      body: [
        "You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the Site by, any third party. You must not attempt to gain unauthorised access to any part of the Site, its underlying systems, or any related networks.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      body: [
        "All content on the Site — including project photography, drawings, renders, text, logos, and the Voussoir name and mark — is the property of Voussoir or its licensors and is protected by applicable intellectual property laws. Nothing on the Site grants you a licence to reproduce, distribute, modify, or otherwise use this content without our prior written consent.",
      ],
    },
    {
      id: "no-professional-advice",
      heading: "No Professional Advice",
      body: [
        "Content published on the Site — including project descriptions, approach, and process pages — is provided for general informational purposes only and does not constitute architectural, engineering, or design advice for any specific project. Any engagement with Voussoir for professional services is subject to a separate, signed agreement.",
      ],
    },
    {
      id: "project-inquiries",
      heading: "Project Inquiries & Proposals",
      body: [
        "Submitting an inquiry through the Site does not create a client relationship, engagement, or obligation on either party. A formal engagement begins only once both parties have agreed to and executed a separate scope of work, fee proposal, or engagement letter.",
      ],
    },
    {
      id: "third-party-links-services",
      heading: "Third-Party Links & Services",
      body: [
        "The Site may reference or link to third-party websites or services that are not owned or controlled by Voussoir. We are not responsible for the content, accuracy, or practices of any third-party site, and inclusion of a link does not imply endorsement.",
      ],
    },
    {
      id: "disclaimer-of-warranties",
      heading: "Disclaimer of Warranties",
      body: [
        "The Site and its content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including but not limited to accuracy, completeness, or fitness for a particular purpose. We do not warrant that the Site will be uninterrupted, timely, or error-free.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      body: [
        "To the fullest extent permitted by applicable law, Voussoir shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of, or inability to use, the Site.",
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      body: [
        "You agree to indemnify and hold harmless Voussoir, its principals, and employees from any claims, damages, liabilities, and expenses arising from your misuse of the Site or violation of these Terms.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law & Jurisdiction",
      body: [
        "These Terms are governed by the laws of India. Any disputes arising out of or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts at Gautam Buddh Nagar, Uttar Pradesh.",
      ],
    },
    {
      id: "changes-to-these-terms",
      heading: "Changes to These Terms",
      body: [
        "We may revise these Terms from time to time. The \"Last updated\" date at the top of this page reflects the most recent revision. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      body: [
        "Questions about these Terms can be directed to Voussoir, 505–507, Tower C, Urbtech Trade Centre, Sector 132, Noida, Uttar Pradesh, 201304. Email: info@voussoir.in. Phone: +91 93196 88233.",
      ],
    },
  ],
};

export const cookiePolicy: Policy = {
  title: "Cookie Policy",
  lastUpdated: "14 September 2026",
  intro: [
    "This Cookie Policy explains how Voussoir (\"we\", \"us\" or \"our\") uses cookies and similar technologies on www.voussoir.in (the \"Site\"), and how you can control them.",
  ],
  sections: [
    {
      id: "what-are-cookies",
      heading: "What Are Cookies",
      body: [
        "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, work more efficiently, and to provide reporting information to site owners.",
      ],
    },
    {
      id: "types-of-cookies-we-use",
      heading: "Types of Cookies We Use",
      body: [
        "We use the following categories of cookies on the Site:",
      ],
      list: [
        "Essential cookies — required for core site functionality, such as remembering your navigation preferences within a session.",
        "Analytics cookies — help us understand how visitors use the Site (pages visited, time on page, general location) so we can improve its content and performance.",
      ],
    },
    {
      id: "third-party-cookies",
      heading: "Third-Party Cookies",
      body: [
        "Some cookies on the Site may be set by third-party analytics providers we use to measure site traffic and engagement. These providers may collect information about your visits to this and other websites in accordance with their own privacy policies.",
      ],
    },
    {
      id: "managing-cookies",
      heading: "Managing Cookies",
      body: [
        "Most web browsers allow you to control cookies through their settings, including blocking or deleting them. Please note that disabling certain cookies may affect the functionality of the Site.",
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      body: [
        "We may update this Cookie Policy from time to time to reflect changes in the cookies and technologies we use. The \"Last updated\" date at the top of this page reflects the most recent revision.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      body: [
        "If you have questions about our use of cookies, please contact us at info@voussoir.in or +91 93196 88233.",
      ],
    },
  ],
};
