import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { MenuItem } from "./menu";

interface SidebarMenuProps {
  items: MenuItem[];
  sidebarOpen: boolean;
  level?: number;
}

export const SidebarMenu = ({
  items,
  sidebarOpen,
  level = 0,
}: SidebarMenuProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const toggle = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <ul className={`${level > 0 ? "ml-4" : ""} space-y-1`}>
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = open[item.label];

        return (
          <li key={`${item.label}-${index}`}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggle(item.label)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                    sidebarOpen ? "justify-between" : "justify-center"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                  {sidebarOpen &&
                    (isOpen ? (
                      <FiChevronUp className="text-gray-400" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    ))}
                </button>
                {isOpen && sidebarOpen && item.children && (
                  <SidebarMenu
                    items={item.children}
                    sidebarOpen={sidebarOpen}
                    level={level + 1}
                  />
                )}
              </>
            ) : (
              <Link
                href={item.href!}
                className={`flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                  sidebarOpen ? "justify-start gap-2" : "justify-center"
                } ${isActive ? "text-black font-semibold" : "text-gray-600"}`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
