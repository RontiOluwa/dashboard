import React from "react";
import { Campaign } from "@/lib/types";
import Link from "next/link";
import { Eye, Users } from "lucide-react";
import Table from "@/components/layout/Table";
import {
  formatCurrency,
  formatDate,
  statusColors,
  calculateProgress,
} from "@/utils/index";

interface CampaignTableProps {
  filteredCampaigns: Campaign[];
}

const typeColors = {
  cashout_bonus: "bg-pagrin-100 text-pagrin-800",
  referral: "bg-purple-100 text-purple-800",
  volume_incentive: "bg-orange-100 text-orange-800",
  retention: "bg-pink-100 text-pink-800",
};

const column = [
  "Campaign",
  "Type",
  "Status",
  "Projects",
  "Budget",
  "Progress",
  "Period",
  "Actions",
];

function CampaignTable({ filteredCampaigns }: CampaignTableProps) {
  return (
    <Table column={column}>
      {filteredCampaigns.map((campaign: Campaign) => {
        return (
          <tr key={campaign.id} className="hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-900">
                  {campaign.name}
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  typeColors[campaign.type]
                }`}
              >
                {campaign.type.replace("_", " ")}
              </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  statusColors[campaign.status]
                }`}
              >
                {campaign.status}
              </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center text-sm text-gray-900">
                <Users className="mr-1.5 h-4 w-4 text-gray-400" />
                {campaign.enrolled.toLocaleString()}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(campaign.totalBudget)}
                </div>
                <div className="text-xs text-gray-500">
                  Spent: {formatCurrency(campaign.spentBudget)}
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex flex-col">
                <div className="text-sm text-gray-900">
                  {calculateProgress(
                    campaign.spentBudget,
                    campaign.totalBudget
                  )}
                  %
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-pagrin-600"
                    style={{
                      width: `${Math.min(
                        calculateProgress(
                          campaign.spentBudget,
                          campaign.totalBudget
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              <div className="flex flex-col">
                <div>{formatDate(campaign.startDate)}</div>
                <div className="text-xs">to {formatDate(campaign.endDate)}</div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
              <Link
                href={`/campaigns/${campaign.id}`}
                className="inline-flex items-center text-pagrin-600 hover:text-pagrin-900"
              >
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

export default CampaignTable;
