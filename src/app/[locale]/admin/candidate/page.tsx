import Candidate from "@/features/candidate";
import { CandidateProvider } from "@/features/candidate/context/CandidateContext";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Candidate - Carrefour d'emploi",
};

const CandidatePage = () => {
  return (
    <CandidateProvider>
      <Candidate />
    </CandidateProvider>
  );
};

export default CandidatePage;
