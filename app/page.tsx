import Link from "next/link";
import { DollarSign, Zap } from "lucide-react";
import StatsCard from "@/components/layout/StatsCard";
import {
  formatCurrency,
  formatNumber,
  statusColors,
  calculateProgress,
} from "@/utils/index";
import { campaigns, redemptions } from "@/lib/data";
import Header from "@/components/layout/Header";
import CardHeader from "@/components/layout/CardHeader";

// Server Component with SSR
export default async function DashboardPage() {
  // Simulate async data fetching
  await new Promise((resolve) => setTimeout(resolve, 100));

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const pendingRedemptions = redemptions.filter((r) => r.status === "pending");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <Header
        title="Dashboard"
        desc="Real-time overview of projects cashouts, campaigns, and incentives."
      />

      {/* Key Metrics Grid */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <StatsCard
          title="Total Campaign"
          value={formatNumber(campaigns.length)}
          icon={DollarSign}
          iconBgColor="bg-success-500"
        />
        <StatsCard
          title="Total Redemption"
          value={formatNumber(redemptions.length)}
          icon={Zap}
          iconBgColor="bg-pagrin-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Campaigns */}
        <div className="rounded-lg bg-white shadow">
          <CardHeader title="Active Campaigns" url="/campaigns" />

          <div className="divide-y divide-gray-200">
            {activeCampaigns.slice(0, 4).map((campaign) => {
              return (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className="block px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {campaign.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>{formatNumber(campaign.enrolled)} Enrolled</span>
                        <span>•</span>
                        <span>
                          {formatCurrency(campaign.spentBudget)} spent
                        </span>
                      </div>
                    </div>

                    <span
                      className={`ml-4 inline-flex rounded-full bg-success-100 px-2 py-1 text-xs font-semibold ${statusColors.active}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Budget</span>
                      <span>
                        {calculateProgress(
                          campaign.spentBudget,
                          campaign.totalBudget
                        )}
                        %
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-pagrin-500 transition-all"
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
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Redemptions */}
        <div className="rounded-lg bg-white shadow">
          <CardHeader title="Recent Redemptions" url="/redemptions" />

          <div className="divide-y divide-gray-200">
            {redemptions.slice(0, 5).map((redemption) => {
              return (
                <div key={redemption.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {redemption.ProjectName}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {redemption.campaignName}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(redemption.amount)}
                      </div>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          statusColors[redemption.status]
                        }`}
                      >
                        {redemption.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
