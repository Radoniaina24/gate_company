import Recruiter from "@/features/recruiter";
import { RecruiterProvider } from "@/features/recruiter/context/RecruiterContext";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Recruteur- Carrefour d'emploi",
};

const RecruiterPage = () => {
  return (
    <RecruiterProvider>
      <Recruiter />
    </RecruiterProvider>
  );
};

export default RecruiterPage;
