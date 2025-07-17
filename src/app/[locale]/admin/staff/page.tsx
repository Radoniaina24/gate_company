import Staff from "@/features/staff";
import { StaffProvider } from "@/features/staff/context/StaffContext";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Personnel - Carrefour de l'emploi",
};

export default async function page() {
  return (
    <StaffProvider>
      <Staff />
    </StaffProvider>
  );
}
