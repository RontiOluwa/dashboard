import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { getCampaignById } from "@/lib/data";
import {
  formatCurrency,
  formatDate,
  statusColors,
  typeColors,
  calculateProgress,
} from "@/utils/index";
import StatsCard from "@/components/layout/StatsCard";

// Server Component with SSR
export default async function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Simulate async data fetching
  await new Promise((resolve) => setTimeout(resolve, 100));

  const campaign = getCampaignById(params.id);

  if (!campaign) {
    notFound();
  }

  const progress = calculateProgress(
    campaign.spentBudget,
    campaign.totalBudget
  );
  const qualificationRate = Math.round(
    (campaign.qualified / campaign.enrolled) * 100
  );
  const remainingBudget = campaign.totalBudget - campaign.spentBudget;

  const campaignDetails = [
    {
      title: "Campaign Type",
      value: campaign.type.replace("_", " "),
    },
    {
      title: "Region",
      value: campaign.region,
    },
    {
      title: "Created",
      value: formatDate(campaign.createdAt),
    },
    {
      title: "Last Updated",
      value: formatDate(campaign.updatedAt),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <Link
        href="/campaigns"
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Campaigns
      </Link>

      {/* Header */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {campaign.name}
              </h1>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  statusColors[campaign.status]
                }`}
              >
                {campaign.status}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  typeColors[campaign.type]
                }`}
              >
                {campaign.type.replace("_", " ")}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{campaign.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" />
                {formatDate(campaign.startDate)} -{" "}
                {formatDate(campaign.endDate)}
              </div>
              <div className="flex items-center">
                <Zap className="mr-1.5 h-4 w-4" />
                {campaign.region}
              </div>
            </div>
          </div>
          <div className="mt-4 flex space-x-3 sm:mt-0">
            <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Enrolled Projects"
          value={campaign.enrolled.toLocaleString()}
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatsCard
          title="Qualified Projects"
          value={campaign.qualified.toLocaleString()}
          icon={TrendingUp}
          iconBgColor="bg-blue-100"
          iconColor="text-success-600"
          desc={`(${qualificationRate}%)`}
        />

        <StatsCard
          title="Budget Spent"
          value={formatCurrency(campaign.spentBudget)}
          icon={DollarSign}
          iconBgColor="bg-blue-100"
          iconColor="text-purple-600"
          desc={`${progress}%`}
        />

        <StatsCard
          title="Reward Amount"
          value={formatCurrency(campaign.rewardAmount)}
          icon={Target}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          desc={`per projects`}
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Campaign Details */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Campaign Details
          </h2>
          <dl className="space-y-4">
            {campaignDetails.map((item, i) => (
              <div className="flex justify-between" key={i}>
                <div className="text-sm font-medium text-gray-500">
                  {item.title}
                </div>
                <div className="text-sm capitalize text-gray-900">
                  {item.value}
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Budget Breakdown */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Budget Breakdown
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">Total Budget</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(campaign.totalBudget)}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">Amount Spent</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(campaign.spentBudget)}
                </span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-pagrin-600 transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {progress}% utilized
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">
                  Remaining Budget
                </span>
                <span className="font-semibold text-success-600">
                  {formatCurrency(remainingBudget)}
                </span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Projected Total Payout
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(campaign.qualified * campaign.rewardAmount)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Based on {campaign.qualified} qualified drivers ×{" "}
                {formatCurrency(campaign.rewardAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
