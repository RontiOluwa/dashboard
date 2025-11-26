import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Redemptions from "@/app/redemptions/Redemptions";
import type { Redemption } from "@/lib/types";

const redemptions: Redemption[] = [
  {
    id: "red-001",
    ProjectName: "BQLabs",
    campaignId: "camp-001",
    campaignName: "First Cashout Bonus",
    amount: 500,
    status: "pending",
    redemptionType: "campaign_reward",
    requestedAt: "2025-11-26T08:30:00Z",
    paymentMethod: "bank_transfer",
  },
  {
    id: "red-002",
    ProjectName: "PineLabs",
    campaignId: "camp-002",
    campaignName: "High Volume Project Reward",
    amount: 2000,
    status: "approved",
    redemptionType: "campaign_reward",
    requestedAt: "2025-11-25T14:20:00Z",
    processedAt: "2025-11-25T15:45:00Z",
    paymentMethod: "mobile_money",
  },
  {
    id: "red-003",
    ProjectName: "Uniswap",
    campaignId: "camp-003",
    campaignName: "Refer a Project",
    amount: 1000,
    status: "paid",
    redemptionType: "referral_bonus",
    requestedAt: "2025-11-24T10:15:00Z",
    processedAt: "2025-11-24T11:00:00Z",
    paidAt: "2025-11-24T12:30:00Z",
    paymentMethod: "pagrin_wallet",
    transactionId: "TXN-445566",
  },
];

describe("Redemptions Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<Redemptions />);
      expect(screen.getByPlaceholderText(/search campaigns/i)).toBeTruthy();
    });

    it("should display all redemptions initially", () => {
      render(<Redemptions />);

      expect(screen.getByText("BQLabs")).toBeTruthy();
      expect(screen.getByText("PineLabs")).toBeTruthy();
      expect(screen.getByText("Uniswap")).toBeTruthy();
    });
  });

  describe("Search Functionality", () => {
    it("should filter redemptions by project name", async () => {
      render(<Redemptions />);

      const searchInput = screen.getByPlaceholderText(/search campaigns/i);
      fireEvent.change(searchInput, { target: { value: "BQLabs" } });

      await waitFor(() => {
        expect(screen.getByText("BQLabs")).toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
        expect(screen.queryByText("Uniswap")).not.toBeTruthy();
      });
    });

    it("should be case-insensitive", async () => {
      render(<Redemptions />);

      const searchInput = screen.getByPlaceholderText(/search campaigns/i);
      fireEvent.change(searchInput, { target: { value: "bqlabs" } });

      await waitFor(() => {
        expect(screen.getByText("BQLabs")).toBeTruthy();
      });
    });

    it('should show "no redemptions" message when search returns no results', async () => {
      render(<Redemptions />);

      const searchInput = screen.getByPlaceholderText(/search campaigns/i);
      fireEvent.change(searchInput, { target: { value: "nonexistent" } });

      await waitFor(() => {
        expect(
          screen.getByText(/No redemptions found matching your filters/i)
        ).toBeTruthy();
      });
    });
  });

  describe("Status Filter", () => {
    it("should filter redemptions by pending status", async () => {
      render(<Redemptions />);

      const statusSelect = screen.getByLabelText(/status/i);
      fireEvent.change(statusSelect, { target: { value: "pending" } });

      await waitFor(() => {
        expect(screen.getByText("BQLabs")).toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
        expect(screen.queryByText("Uniswap")).not.toBeTruthy();
      });
    });

    it("should filter redemptions by paid status", async () => {
      render(<Redemptions />);

      const statusSelect = screen.getByLabelText(/status/i);
      fireEvent.change(statusSelect, { target: { value: "paid" } });

      await waitFor(() => {
        expect(screen.queryByText("BQLabs")).not.toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
        expect(screen.getByText("Uniswap")).toBeTruthy();
      });
    });

    it("should filter redemptions by approved status", async () => {
      render(<Redemptions />);

      const statusSelect = screen.getByLabelText(/status/i);
      fireEvent.change(statusSelect, { target: { value: "approved" } });

      await waitFor(() => {
        expect(screen.queryByText("BQLabs")).not.toBeTruthy();
        expect(screen.getByText("PineLabs")).toBeTruthy();
        expect(screen.queryByText("Uniswap")).not.toBeTruthy();
      });
    });
  });

  describe("Type Filter", () => {
    it("should filter redemptions by campaign_reward type", async () => {
      render(<Redemptions />);

      const typeSelect = screen.getByLabelText(/type/i);
      fireEvent.change(typeSelect, { target: { value: "campaign_reward" } });

      await waitFor(() => {
        expect(screen.getByText("BQLabs")).toBeTruthy();
        expect(screen.getByText("PineLabs")).toBeTruthy();
        expect(screen.queryByText("Uniswap")).not.toBeTruthy();
      });
    });

    it("should filter redemptions by referral_bonus type", async () => {
      render(<Redemptions />);

      const typeSelect = screen.getByLabelText(/type/i);
      fireEvent.change(typeSelect, { target: { value: "referral_bonus" } });

      await waitFor(() => {
        expect(screen.queryByText("BQLabs")).not.toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
        expect(screen.getByText("Uniswap")).toBeTruthy();
      });
    });
  });

  describe("Multiple Filters", () => {
    it("should apply multiple filters simultaneously", async () => {
      render(<Redemptions />);

      const statusSelect = screen.getByLabelText(/status/i);
      const typeSelect = screen.getByLabelText(/type/i);

      fireEvent.change(statusSelect, { target: { value: "paid" } });
      fireEvent.change(typeSelect, { target: { value: "referral_bonus" } });

      await waitFor(() => {
        expect(screen.queryByText("BQLabs")).not.toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
        expect(screen.getByText("Uniswap")).toBeTruthy();
        expect(screen.getByText(/Showing 1 of 5 redemptions/i)).toBeTruthy();
      });
    });

    it("should combine search with status filter", async () => {
      render(<Redemptions />);

      const searchInput = screen.getByPlaceholderText(/search campaigns/i);
      const statusSelect = screen.getByLabelText(/status/i);

      fireEvent.change(searchInput, { target: { value: "Labs" } });
      fireEvent.change(statusSelect, { target: { value: "pending" } });

      await waitFor(() => {
        expect(screen.getByText("BQLabs")).toBeTruthy();
        expect(screen.queryByText("PineLabs")).not.toBeTruthy();
      });
    });

    it("should handle no results from multiple filters", async () => {
      render(<Redemptions />);

      const statusSelect = screen.getByLabelText(/status/i);
      const typeSelect = screen.getByLabelText(/type/i);

      // Select filters that don't match any redemption
      fireEvent.change(statusSelect, { target: { value: "pending" } });
      fireEvent.change(typeSelect, { target: { value: "referral_bonus" } });

      await waitFor(() => {
        expect(
          screen.getByText(/No redemptions found matching your filters/i)
        ).toBeTruthy();
      });
    });
  });
});
