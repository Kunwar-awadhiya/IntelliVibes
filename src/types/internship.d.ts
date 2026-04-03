// types/internship.d.ts
export interface Internship {
  [x: string]: any;
  role: ReactNode;
  applyLink: string | undefined;
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  platform: string;
  location: string;
  stipend?: string;
  duration?: string;
}
