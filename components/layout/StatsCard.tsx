import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  desc?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-pagrin-500",
  iconColor = "text-white",
  desc,
}: StatsCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-5">
        <div className="flex items-center">
          {Icon && (
            <div className="flex-shrink-0">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor}`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
            </div>
          )}

          <div className="ml-5 w-0 flex-1">
            <div>
              <div className="truncate text-sm font-medium text-gray-500">
                {title}
              </div>
              <div className="flex items-baseline">
                <div className="text-1xl font-semibold text-gray-900">
                  {value}
                </div>
                {desc && <p className="ml-2 text-sm text-gray-500">{desc}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
