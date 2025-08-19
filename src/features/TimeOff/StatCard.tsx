interface StatCardProps {
  title: string;
  value: number;
  color: string; // "blue" | "amber" | "green" | "red"
  icon: React.ReactNode;
}
export const StatCard = ({ title, value, color, icon }: StatCardProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-${color}-50 to-${color}-100 p-4 rounded-xl border border-${color}-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-600 text-sm font-semibold`}>{title}</p>
          <p className={`text-2xl font-bold text-${color}-800`}>{value}</p>
        </div>
        <div className={`bg-${color}-500 p-2 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};
