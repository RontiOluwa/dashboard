export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const statusColors = {
  pending: 'bg-warning-50 text-warning-800',
  approved: 'bg-blue-50 text-blue-800',
  processing: 'bg-purple-50 text-purple-800',
  paid: 'bg-success-50 text-success-800',
  rejected: 'bg-danger-50 text-danger-800',

  active: 'bg-blue-100 text-success-800',
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  paused: 'bg-warning-50 text-warning-800',
};

export const typeColors = {
  cashout_bonus: 'bg-pagrin-100 text-pagrin-800',
  referral: 'bg-purple-100 text-purple-800',
  volume_incentive: 'bg-orange-100 text-orange-800',
  retention: 'bg-pink-100 text-pink-800',
};


export const calculateProgress = (spent: number, budget: number) => {
  return Math.round((spent / budget) * 100);
};
