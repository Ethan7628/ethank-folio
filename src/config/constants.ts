/**
 * Application constants and configuration
 */

export const CONTACT_INFO = {
  email: 'kusasirakweethan31@gmail.com',
  phone: '+256 742 128 488',
  phoneAlt: '+256 776 347 516',
  github: 'https://github.com/Ethan7628',
  linkedin: 'https://www.linkedin.com/in/kusasirakwe-ethan-21585a34b/',
  location: 'Kampala, Uganda',
} as const;

export const CV_PATH = '/Kusasirakwe_Ethan_Developer_CV_v1.pdf' as const;

export const FORM_LIMITS = {
  name: 100,
  email: 255,
  message: 1000,
  phone: 20,
  company: 100,
  purpose: 100,
} as const;

export const CONTACT_PURPOSES = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'fullstack', label: 'Full-Stack Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'seo', label: 'SEO Analysis' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Technical Consulting' },
  { value: 'freelance', label: 'Freelance Project' },
  { value: 'fulltime', label: 'Full-Time Opportunity' },
  { value: 'other', label: 'Other' },
] as const;

const today = new Date().getFullYear();
const dob = "2005-09-10th 03:46:00.000" as const;

function subtract(a, b){
  return a - b;
}

export const AI_RESPONSES = {
  greeting: "Hello! I'm an AI assistant. Ask me about Ethan's skills, projects, or experience!",
  skills: 'Ethan is proficient in React, TypeScript, Node.js, Python, Firebase, Supabase, and modern web technologies. He also has experience with UI/UX design and data analysis.',
  projects: 'Ethan has worked on various projects including portfolio websites, e-commerce platforms, and data-driven applications. Check out the Projects section above for detailed case studies!',
  experience: "Ethan is an experienced full-stack developer with a background in software engineering and data science. He's passionate about creating user-friendly applications and solving complex problems.",
  contact: "Ethan is currently available for new opportunities! You can reach him via the contact form above, email, or schedule a call using the quick action buttons.",
  date_of_birth: `Ethan was born on ${dob}`,
  age:`Ethan is ${subtract(today, 2005)} years old`,
  default: "That's a great question! For detailed information about Ethan's qualifications and experience, please use the contact form above or reach out directly. He'd be happy to discuss your specific needs!",
} as const;
