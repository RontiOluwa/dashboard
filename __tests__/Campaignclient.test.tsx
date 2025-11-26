import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import CampaignsClient from "@/app/campaigns/CampaignClient";
import type { Campaign } from "@/lib/types";

const mockCampaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "First Cashout Bonus",
    description: "New projects get $500 bonus",
    type: "cashout_bonus",
    status: "active",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    totalBudget: 2000000,
    spentBudget: 847500,
    enrolled: 3452,
    qualified: 1695,
    targetValue: 1,
    rewardAmount: 500,
    region: "Lagos",
    createdAt: "2025-10-28",
    updatedAt: "2025-11-25",
  },
  {
    id: "camp-002",
    name: "High Volume Reward",
    description: "Get $2,000 bonus",
    type: "volume_incentive",
    status: "paused",
    startDate: "2025-11-15",
    endDate: "2025-12-15",
    totalBudget: 5000000,
    spentBudget: 1640000,
    enrolled: 2134,
    qualified: 820,
    targetValue: 20,
    rewardAmount: 2000,
    region: "All Regions",
    createdAt: "2025-11-10",
    updatedAt: "2025-11-25",
  },
];

describe("CampaignsClient Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<CampaignsClient campaigns={mockCampaigns} />);
      expect(screen.getByPlaceholderText(/search campaigns/i)).toBeTruthy();
    });

    it("should display all campaigns initially", () => {
      render(<CampaignsClient campaigns={mockCampaigns} />);

      expect(screen.getByText("First Cashout Bonus")).toBeTruthy();
      expect(screen.getByText("High Volume Reward")).toBeTruthy();
    });

    it("should display campaign count", () => {
      render(<CampaignsClient campaigns={mockCampaigns} />);

      expect(screen.getByText(/Showing 2 of 2 campaigns/i)).toBeTruthy();
    });

    describe("Search Functionality", () => {
      it("should filter campaigns by search term", async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const searchInput = screen.getByPlaceholderText(/search campaigns/i);
        fireEvent.change(searchInput, { target: { value: "Cashout" } });

        await waitFor(() => {
          expect(screen.getByText("First Cashout Bonus")).toBeTruthy();
          expect(screen.queryByText("High Volume Reward")).not.toBeTruthy();
        });
      });

      it("should update campaign count after search", async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const searchInput = screen.getByPlaceholderText(/search campaigns/i);
        fireEvent.change(searchInput, { target: { value: "Cashout" } });

        await waitFor(() => {
          expect(screen.getByText(/Showing 1 of 2 campaigns/i)).toBeTruthy();
        });
      });

      it('should show "no campaigns" message when search returns no results', async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const searchInput = screen.getByPlaceholderText(/search campaigns/i);
        fireEvent.change(searchInput, { target: { value: "nonexistent" } });

        await waitFor(() => {
          expect(
            screen.getByText(/No campaigns found matching your filters/i)
          ).toBeTruthy();
        });
      });

      it("should clear search results when input is cleared", async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const searchInput = screen.getByPlaceholderText(/search campaigns/i);

        // Type search term
        fireEvent.change(searchInput, { target: { value: "Cashout" } });
        await waitFor(() => {
          expect(screen.getByText(/Showing 1 of 2 campaigns/i)).toBeTruthy();
        });

        // Clear search
        fireEvent.change(searchInput, { target: { value: "" } });
        await waitFor(() => {
          expect(screen.getByText(/Showing 2 of 2 campaigns/i)).toBeTruthy();
        });
      });
    });

    describe("Status Filter", () => {
      it("should filter campaigns by status", async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const statusSelect = screen.getByLabelText(/status/i);
        fireEvent.change(statusSelect, { target: { value: "active" } });
        await waitFor(() => {
          expect(screen.getByText("First Cashout Bonus")).toBeTruthy();
          expect(screen.queryByText("High Volume Reward")).not.toBeTruthy();
        });
      });

      it('should show all campaigns when "all" is selected', async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const statusSelect = screen.getByLabelText(/status/i);

        // First filter by status
        fireEvent.change(statusSelect, { target: { value: "active" } });
        await waitFor(() => {
          expect(screen.getByText(/Showing 1 of 2 campaigns/i)).toBeTruthy();
        });

        // Then select "all"
        fireEvent.change(statusSelect, { target: { value: "all" } });
        await waitFor(() => {
          expect(screen.getByText(/Showing 2 of 2 campaigns/i)).toBeTruthy();
        });
      });
    });

    describe("Type Filter", () => {
      it("should filter campaigns by type", async () => {
        render(<CampaignsClient campaigns={mockCampaigns} />);

        const typeSelect = screen.getByLabelText(/type/i);
        fireEvent.change(typeSelect, { target: { value: "cashout_bonus" } });

        await waitFor(() => {
          expect(screen.getByText("First Cashout Bonus")).toBeTruthy();
          expect(screen.queryByText("High Volume Reward")).not.toBeTruthy();
        });
      });
    });

    describe("Empty State", () => {
      it("should handle empty campaigns array", () => {
        render(<CampaignsClient campaigns={[]} />);

        expect(
          screen.getByText(/No campaigns found matching your filters/i)
        ).toBeTruthy();
        expect(screen.getByText(/Showing 0 of 0 campaigns/i)).toBeTruthy();
      });
    });
  });
});
