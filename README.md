# Pagrin Incentives Dashboard

A modern dashboard for managing driver incentive campaigns and cashout redemptions built with Next.js 14, React 18, and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

| Technology   | Version | Purpose                               |
| ------------ | ------- | ------------------------------------- |
| Next.js      | 14.2.33 | React framework with App Router & SSR |
| React        | 18.3.1  | UI library                            |
| TypeScript   | 5.9.3   | Type safety                           |
| Tailwind CSS | 3.4.18  | Styling                               |
| Lucide React | 0.263.1 | Icons                                 |
| ESLint       | 8.57.1  | Code linting                          |

## 📁 Project Structure

```
app/
├── campaigns/          # Campaign management
│   ├── [id]/page.tsx  # Campaign details
│   └── page.tsx       # Campaign list
├── redemptions/        # Redemption processing
│   └── page.tsx       # Redemption list
└── page.tsx           # Dashboard home

components/
├── layout/            # Reusable layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   └── Table.tsx
└── ui/                # Form components
    ├── Input.tsx
    └── Select.tsx

lib/
├── data.ts            # Mock data & utilities
└── types.ts           # TypeScript types

utils/
└── index.tsx          # Helper functions
```

## ✨ Features

### Dashboard (`/`)

- Campaign and redemption statistics
- Active campaigns overview
- Recent redemptions feed
- Real-time budget tracking

### Campaigns (`/campaigns`)

- **List View**: Filter by status, type, and search
- **Detail View**: Full campaign info with budget breakdown
- **Campaign Types**: Cashout bonus, Referral, Volume incentive, Retention
- **Tracking**: Enrollment, qualification rates, budget utilization

### Redemptions (`/redemptions`)

- **Management**: Approve/reject pending requests
- **Filters**: Status, type, and search
- **Payment Tracking**: Methods and transaction IDs
- **Statistics**: Pending, paid, and total values

### UI/UX

- Responsive design (mobile, tablet, desktop)
- Collapsible sidebar navigation
- Color-coded status badges
- Progress bars for budgets
- Custom scrollbars

## Data Models

### Campaign

```typescript
interface Campaign {
  id: string;
  name: string;
  description: string;
  type: "cashout_bonus" | "referral" | "volume_incentive" | "retention";
  status: "active" | "scheduled" | "completed" | "paused";
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
```

### Redemption

```typescript
interface Redemption {
  id: string;
  ProjectName: string;
  campaignId: string;
  campaignName: string;
  amount: number;
  status: "pending" | "approved" | "processing" | "paid" | "rejected";
  redemptionType: "instant_cashout" | "campaign_reward" | "referral_bonus";
  requestedAt: string;
  processedAt?: string;
  paidAt?: string;
  paymentMethod: "bank_transfer" | "mobile_money" | "pagrin_wallet";
  transactionId?: string;
}
```

## 🎨 Key Components

### Layout Components

**Header**

```tsx
<Header title="Campaigns" desc="Manage driver incentives" />
```

**StatsCard**

```tsx
<StatsCard
  title="Total Campaigns"
  value={100}
  icon={DollarSign}
  iconBgColor="bg-success-500"
/>
```

**Table**

```tsx
<Table column={["Name", "Status", "Amount"]}>
  {data.map((item) => (
    <tr key={item.id}>...</tr>
  ))}
</Table>
```

### UI Components

**Input** - Custom text input with change handler
**Select** - Dropdown with array of options
**FieldLabel** - Accessible form labels

## 🎨 Design System

### Colors

- **Primary**: `pagrin-500` to `pagrin-900` (Blue)
- **Success**: Green (`success-50` to `success-600`)
- **Warning**: Yellow (`warning-50` to `warning-600`)
- **Danger**: Red (`danger-50` to `danger-600`)

### Status Colors

- Active/Paid → Green
- Pending → Yellow
- Processing → Purple
- Scheduled/Approved → Blue
- Rejected/Paused → Red

### Breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## 🔧 Utility Functions

```typescript
formatCurrency(1000000); // "$1,000,000"
formatNumber(1000000); // "1,000,000"
formatDate("2025-11-26"); // "Nov 26, 2025"
calculateProgress(500000, 1000000); // 50
```

## 🧪 Testing

**Current**: ESLint for code quality

```bash
npm run test
```

**Recommended Setup**:

- Unit tests: Jest + React Testing Library
- Component tests for filters, tables, and data transformations

## 📦 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run test`  | Run Unit Test            |

## 🔄 Architecture

1. **Server-Side Rendering**: Pages render on server for SEO
2. **Client-Side Hydration**: React takes over after initial load
3. **Client-Side Filtering**: Instant filter updates without reload
4. **State Management**: React hooks (useState, useEffect)

**Code Standards**:

- TypeScript for all components
- Tailwind utility classes for styling
- Small, focused components
- Proper type definitions

**Built with Next.js, React, TypeScript & Tailwind CSS**
