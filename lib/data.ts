import { Campaign, Redemption, } from './types';

// Mock Campaigns - Based on Pagrin's instant cashout and Project incentive model
export const campaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'First Cashout Bonus',
    description: 'New projects get $500 bonus on their first instant cashout through Pagrin',
    type: 'cashout_bonus',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    totalBudget: 2000000,
    spentBudget: 847500,
    enrolled: 3452,
    qualified: 1695,
    targetValue: 1,
    rewardAmount: 500,
    region: 'Lagos',
    createdAt: '2025-10-28',
    updatedAt: '2025-11-25',
  },
  {
    id: 'camp-002',
    name: 'High Volume Project Reward',
    description: 'projects who cashout 20+ times per month get $2,000 bonus',
    type: 'volume_incentive',
    status: 'active',
    startDate: '2025-11-15',
    endDate: '2025-12-15',
    totalBudget: 5000000,
    spentBudget: 1640000,
    enrolled: 2134,
    qualified: 820,
    targetValue: 20,
    rewardAmount: 2000,
    region: 'All Regions',
    createdAt: '2025-11-10',
    updatedAt: '2025-11-25',
  },
  {
    id: 'camp-003',
    name: 'Refer a Project',
    description: 'Earn $1,000 for each Project you refer who completes 5 cashouts',
    type: 'referral',
    status: 'completed',
    startDate: '2025-10-01',
    endDate: '2026-01-31',
    totalBudget: 3000000,
    spentBudget: 892000,
    enrolled: 1567,
    qualified: 892,
    targetValue: 5,
    rewardAmount: 1000,
    region: 'All Regions',
    createdAt: '2025-09-25',
    updatedAt: '2025-11-24',
  },
  {
    id: 'camp-004',
    name: 'Weekend Warrior Cashout',
    description: 'Extra $200 per cashout on Saturdays and Sundays (max 3 cashouts)',
    type: 'cashout_bonus',
    status: 'paused',
    startDate: '2025-11-22',
    endDate: '2025-12-22',
    totalBudget: 1500000,
    spentBudget: 234600,
    enrolled: 4521,
    qualified: 1173,
    targetValue: 1,
    rewardAmount: 200,
    region: 'All Regions',
    createdAt: '2025-11-18',
    updatedAt: '2025-11-25',
  },
  {
    id: 'camp-005',
    name: 'Project Onboarding',
    description: 'Projects get zero fees on first 10 cashouts',
    type: 'retention',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    totalBudget: 800000,
    spentBudget: 456300,
    enrolled: 1823,
    qualified: 912,
    targetValue: 10,
    rewardAmount: 50,
    region: 'Lagos',
    createdAt: '2025-10-25',
    updatedAt: '2025-11-24',
  },
  {
    id: 'camp-006',
    name: 'Q4 Loyalty Bonus',
    description: 'projects active for 90+ days get $3,000 bonus',
    type: 'retention',
    status: 'scheduled',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    totalBudget: 10000000,
    spentBudget: 0,
    enrolled: 0,
    qualified: 0,
    targetValue: 90,
    rewardAmount: 3000,
    region: 'All Regions',
    createdAt: '2025-11-20',
    updatedAt: '2025-11-20',
  },
];

// Mock Redemptions - Instant cashout requests and reward payouts
export const redemptions: Redemption[] = [
  {
    id: 'red-001',
    ProjectName: 'BQLabs',
    campaignId: 'camp-001',
    campaignName: 'First Cashout Bonus',
    amount: 500,
    status: 'pending',
    redemptionType: 'campaign_reward',
    requestedAt: '2025-11-26T08:30:00Z',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'red-002',
    ProjectName: 'PineLabs',
    campaignId: 'camp-002',
    campaignName: 'High Volume Project Reward',
    amount: 2000,
    status: 'approved',
    redemptionType: 'campaign_reward',
    requestedAt: '2025-11-25T14:20:00Z',
    processedAt: '2025-11-25T15:45:00Z',
    paymentMethod: 'mobile_money',
  },
  {
    id: 'red-003',
    ProjectName: 'Uniswap',
    campaignId: 'camp-003',
    campaignName: 'Refer a Project',
    amount: 1000,
    status: 'paid',
    redemptionType: 'referral_bonus',
    requestedAt: '2025-11-24T10:15:00Z',
    processedAt: '2025-11-24T11:00:00Z',
    paidAt: '2025-11-24T12:30:00Z',
    paymentMethod: 'pagrin_wallet',
    transactionId: 'TXN-445566',
  },
  {
    id: 'red-004',
    ProjectName: 'Opensea',
    campaignId: 'camp-001',
    campaignName: 'First Cashout Bonus',
    amount: 500,
    status: 'processing',
    redemptionType: 'campaign_reward',
    requestedAt: '2025-11-26T07:00:00Z',
    processedAt: '2025-11-26T07:30:00Z',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'red-005',
    ProjectName: 'Trust Wallet',
    campaignId: 'camp-004',
    campaignName: 'Weekend Warrior Cashout',
    amount: 600, // 3 cashouts x $200
    status: 'paid',
    redemptionType: 'campaign_reward',
    requestedAt: '2025-11-24T16:45:00Z',
    processedAt: '2025-11-24T17:00:00Z',
    paidAt: '2025-11-24T18:15:00Z',
    paymentMethod: 'mobile_money',
    transactionId: 'TXN-445567',
  },
];

// Helper functions
export function filterCampaigns(
  campaigns: Campaign[],
  filters: {
    status?: string;
    type?: string;
    region?: string;
    search?: string;
  }
): Campaign[] {
  return campaigns.filter((campaign) => {
    if (filters.status && filters.status !== 'all' && campaign.status !== filters.status) {
      return false;
    }
    if (filters.type && filters.type !== 'all' && campaign.type !== filters.type) {
      return false;
    }
    if (filters.region && filters.region !== 'all' && campaign.region !== filters.region && campaign.region !== 'All Regions') {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}

export function filterRedemptions(
  redemptions: Redemption[],
  filters: {
    status?: string;
    type?: string;
    search?: string;
  }
): Redemption[] {
  return redemptions.filter((redemption) => {
    if (filters.status && filters.status !== 'all' && redemption.status !== filters.status) {
      return false;
    }
    if (filters.type && filters.type !== 'all' && redemption.redemptionType !== filters.type) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        redemption.ProjectName.toLowerCase().includes(searchLower) ||
        redemption.campaignName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}