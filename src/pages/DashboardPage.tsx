import React from 'react';
import SummaryCards from '../components/SummaryCards';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingPieChart from '../components/SpendingPieChart';
import RecentTransactions from '../components/RecentTransactions';
import InsightsPanel from '../components/InsightsPanel';

const DashboardPage: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Financial Overview</h1>
        <p className="page-subtitle">Track your income, expenses, and net balance at a glance.</p>
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <div className="chart-wide">
          <BalanceTrendChart />
        </div>
        <div className="chart-narrow">
          <SpendingPieChart />
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-wide">
          <RecentTransactions />
        </div>
        <div className="chart-narrow">
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
