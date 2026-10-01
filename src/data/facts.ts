// Key numbers for the homepage strip. Leave a value null until it's confirmed —
// the strip only renders once at least 3 facts have a value.
export type Fact = {
  value: string | null;
  label: string;
};

export const facts: Fact[] = [
  { value: null, label: "Years of combined practice" },
  { value: null, label: "Projects delivered by our founders" },
  { value: null, label: "Cities and regions" },
  { value: null, label: "Disciplines under one roof" },
];
