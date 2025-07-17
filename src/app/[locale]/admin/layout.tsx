import "@/app/[locale]/globals.css";
import AdminGuard from "@/components/Auth/Guard/AuthGuardAdmin";

import Admin from "@/components/Espace/admin";

export const metadata = {
  title: "Espace membres",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <Admin>{children}</Admin>
    </AdminGuard>
  );
}
