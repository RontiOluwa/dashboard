import { Plus } from "lucide-react";
import CampaignsClient from "./CampaignClient";
import { campaigns } from "@/lib/data";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/layout/StatsCard";
import { formatCurrency } from "@/utils/index";

// Server Component - SSR enabled
export default async function CampaignsPage() {
  // Simulate async data fetching
  await new Promise((resolve) => setTimeout(resolve, 100));

  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spentBudget, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <Header
        title="Campaigns"
        desc=" Manage cashout bonuses, referral programs, and driver incentives"
      />
      <div className="mb-8">
        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <StatsCard title="Total Campaigns" value={campaigns.length} />
          <StatsCard title="Active" value={activeCount} />
          <StatsCard title="Total Budget" value={formatCurrency(totalBudget)} />
          <StatsCard title="Total Spent" value={formatCurrency(totalSpent)} />
        </div>
      </div>

      {/* Filters and Table */}
      <CampaignsClient campaigns={campaigns} />
    </div>
  );
}
