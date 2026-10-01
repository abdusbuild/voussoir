// Common questions for the Contact page. Leave an answer null until the client
// supplies it — the section only renders once at least 3 are answered.
// Answers are plain text; a line break (\n) starts a new paragraph.
export type Faq = {
  question: string;
  answer: string | null;
};

export const faqs: Faq[] = [
  {
    question: "How do you charge for your services?",
    answer:
      "Every project is different, so our fees depend on its size and scope. After we understand what you need, we send a written fee proposal setting out the scope of work, and nothing begins until you have agreed to it.",
  },
  {
    question: "Which areas do you work in?",
    answer:
      "Our studio is in Noida, and much of our work is across Noida, Greater Noida and Delhi. We have also completed projects in Haryana and Madhya Pradesh, so if your site is further away, do get in touch.",
  },
  {
    question: "Do you take on interior-only projects?",
    answer:
      "Yes. Interiors is one of our core disciplines, from space planning and materials to lighting, furniture and joinery, for homes and workplaces alike.",
  },
  {
    question: "Do you handle construction, or only design?",
    answer:
      "We design, and we stay involved through construction. We prepare the drawings your contractor builds from, coordinate with them, review progress on site and check that what is built matches the design.",
  },
  { question: "How long does a typical home project take?", answer: null },
  { question: "What happens in the first meeting, and is there a fee?", answer: null },
  {
    question: "Can we work with our own contractor?",
    answer:
      "Yes. We are happy to work with a contractor you already trust. We will coordinate with them throughout, answer their questions on site and review the work against the design.",
  },
];
