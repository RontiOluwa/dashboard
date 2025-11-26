import React from "react";
import { formatCurrency, formatDate, statusColors } from "@/utils/index";
import Table from "@/components/layout/Table";
import { Redemption } from "@/lib/types";
interface RedemptionTableProps {
  filteredRedemptions: Redemption[];
}
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

function RedemptionTable({ filteredRedemptions }: RedemptionTableProps) {
  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    processing: AlertCircle,
    paid: CheckCircle,
    rejected: XCircle,
  };

  const column = [
    "Project",
    "Campaign",
    "Amount",
    "Type",
    "Status",
    "Payment Method",
    "Requested",
    "Actions",
  ];

  return (
    <Table column={column}>
      {filteredRedemptions.map((redemption: Redemption) => {
        const StatusIcon = statusIcons[redemption.status];
        return (
          <tr key={redemption.id} className="hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-900">
                  {redemption.ProjectName}
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">
                {redemption.campaignName}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
              {formatCurrency(redemption.amount)}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm text-gray-900 capitalize">
                {redemption.redemptionType.replace("_", " ")}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                  statusColors[redemption.status]
                }`}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {redemption.status}
              </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 capitalize">
              {redemption.paymentMethod.replace("_", " ")}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {formatDate(redemption.requestedAt)}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm">
              {redemption.status === "pending" && (
                <div className="flex space-x-2">
                  <button className="text-success-600 hover:text-success-900">
                    Approve
                  </button>
                  <button className="text-danger-600 hover:text-danger-900">
                    Reject
                  </button>
                </div>
              )}
              {redemption.status === "paid" && redemption.transactionId && (
                <div className="text-xs text-gray-500">
                  ID: {redemption.transactionId}
                </div>
              )}
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

export default RedemptionTable;
