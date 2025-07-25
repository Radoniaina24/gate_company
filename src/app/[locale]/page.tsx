import DepartmentServiceManager from "@/features/DepartmentService/DepartmentServiceManager";

export default async function Home() {
  return (
    <div className="mt-36">
      <DepartmentServiceManager />
    </div>
  );
}
