import AdminDashBoard from "@/components/Espace/admin/Dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Espace-Admin",
};

export default async function page() {
  return <AdminDashBoard />;
}
