import Signin from "@/components/signin/Signin";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Connexion - Gate Company",
};
const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};
export default SigninPage;
