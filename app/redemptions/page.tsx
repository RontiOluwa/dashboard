"use client";

import { redemptions as allRedemptions } from "@/lib/data";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/layout/StatsCard";
import Redemptions from "./Redemptions";

export default function RedemptionsClient() {
  // Calculate summary stats
  const pendingCount = allRedemptions.filter(
    (r) => r.status === "pending"
  ).length;

  const paidToday = allRedemptions.filter((r) => r.status === "paid").length;
  const totalValue = allRedemptions.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Header
          title="Redemptions"
          desc=" Process instant cashout requests and campaign reward payouts"
        />

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <StatsCard title="Pending Requests" value={pendingCount} />
          <StatsCard title="Paid Today" value={paidToday} />
          <StatsCard title=" Total Redemptions" value={allRedemptions.length} />
          <StatsCard title=" Filtered Value" value={totalValue} />
        </div>
      </div>

      <Redemptions />
      {/* Filters */}
    </div>
  );
}
