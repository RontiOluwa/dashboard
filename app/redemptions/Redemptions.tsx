import React, { useState, useEffect } from "react";
import { Search, DollarSign } from "lucide-react";
import { Redemption } from "@/lib/types";
import FieldLabel from "@/components/layout/FieldLabel";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { filterRedemptions } from "@/lib/data";
import { redemptions as allRedemptions } from "@/lib/data";
import RedemptionTable from "./RedemptionTable";

function Redemptions() {
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    search: "",
  });

  const [filteredRedemptions, setFilteredRedemption] = useState<Redemption[]>(
    []
  );

  useEffect(() => {
    const filtered = filterRedemptions(allRedemptions, filters);
    setFilteredRedemption(filtered);
  }, [filters]);

  const searchFilter = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const statusFilter = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const typeFilter = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  const pendingValue = allRedemptions
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <>
      {/* Filter */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="sm:col-span-2">
            <FieldLabel label="Search" htmlFor="search" />
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={filters.search}
                className="block w-full rounded-md p-4 border-gray-300 pl-10 focus:border-pagrin-500 focus:ring-pagrin-500 sm:text-sm"
                func={searchFilter}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <FieldLabel label="Status" htmlFor="status" />
            <Select
              value={filters.status}
              items={[
                "all",
                "pending",
                "approved",
                "processing",
                "paid",
                "rejected",
              ]}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              func={statusFilter}
            />
          </div>

          {/* Type Filter */}
          <div>
            <FieldLabel label="Type" htmlFor="type" />
            <Select
              value={filters.type}
              items={[
                "all",
                "instant_cashout",
                "campaign_reward",
                "referral_bonus",
              ]}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              func={typeFilter}
            />
          </div>
        </div>
      </div>

      {/* Redemptions Table */}
      {filteredRedemptions.length === 0 ? (
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-12 text-center">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">
              No redemptions found matching your filters.
            </p>
          </div>
        </div>
      ) : (
        <RedemptionTable filteredRedemptions={filteredRedemptions} />
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredRedemptions.length} of {allRedemptions.length}{" "}
        redemptions
      </div>
    </>
  );
}

export default Redemptions;
