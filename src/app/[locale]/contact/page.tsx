import Contact from "@/components/Contact/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact - Gate Company",
};
const ContactPage = () => {
  return (
    <>
      <Contact />
    </>
  );
};
export default ContactPage;
