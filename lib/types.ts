// Pagrin Business Model: Instant payment platform for ride-hailing Projects
// Core features: Instant cashouts, earnings advances, financial services

export type CampaignStatus = 'active' | 'scheduled' | 'completed' | 'paused';
export type CampaignType = 'cashout_bonus' | 'referral' | 'volume_incentive' | 'retention';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  totalBudget: number;
  spentBudget: number;
  enrolled: number;
  qualified: number;
  targetValue: number;
  rewardAmount: number;
  region: string;
  createdAt: string;
  updatedAt: string;
}

export interface Redemption {
  id: string;
  ProjectName: string;
  campaignId: string;
  campaignName: string;
  amount: number;
  status: 'pending' | 'approved' | 'processing' | 'paid' | 'rejected';
  redemptionType: 'instant_cashout' | 'campaign_reward' | 'referral_bonus';
  requestedAt: string;
  processedAt?: string;
  paidAt?: string;
  paymentMethod: 'bank_transfer' | 'mobile_money' | 'pagrin_wallet';
  transactionId?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  ProjectId: string;
  type: 'instant_cashout' | 'campaign_payout' | 'referral_bonus' | 'perk_redemption';
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  method: 'bank_transfer' | 'mobile_money' | 'pagrin_wallet';
}

export interface FilterOptions {
  status?: CampaignStatus[];
  type?: CampaignType[];
  platform?: string[];
  region?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
}
