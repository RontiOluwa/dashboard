"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Campaign } from "@/lib/types";
import { filterCampaigns } from "@/lib/data";
import FieldLabel from "@/components/layout/FieldLabel";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import CampaignTable from "./CampaignTable";

interface CampaignsClientProps {
  campaigns: Campaign[];
}

export default function CampaignsClient({ campaigns }: CampaignsClientProps) {
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    search: "",
  });
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const filtered = filterCampaigns(campaigns, filters);
    setFilteredCampaigns(filtered);
  }, [filters, campaigns]);

  const searchFilter = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const statusFilter = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const typeFilter = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  return (
    <>
      {/* Filters */}
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
                className="block w-full p-4 rounded-md border-gray-300 pl-10 focus:border-pagrin-500 focus:ring-pagrin-500 sm:text-sm"
                func={searchFilter}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <FieldLabel label="Status" htmlFor="status" />
            <Select
              value={filters.status}
              items={["all", "active", "scheduled", "completed", "paused"]}
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
                "cashout_bonus",
                "referral",
                "volume_incentive",
                "retention",
              ]}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              func={typeFilter}
            />
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      {filteredCampaigns.length === 0 ? (
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-gray-500">
              No campaigns found matching your filters.
            </p>
          </div>
        </div>
      ) : (
        <CampaignTable filteredCampaigns={filteredCampaigns} />
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredCampaigns.length} of {campaigns.length} campaigns
      </div>
    </>
  );
}
