import React from 'react';
import InsightsPanel from '../components/InsightsPanel';
import SpendingPieChart from '../components/SpendingPieChart';
import BalanceTrendChart from '../components/BalanceTrendChart';
import { useAppStore } from '../store/useAppStore';
import { CATEGORY_COLORS } from '../data/mockData';
import type { Category } from '../types';

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const InsightsPage: React.FC = () => {
  const { transactions } = useAppStore();

  // Top categories by spend
  const catMap: Record<string, number> = {};
  transactions.filter((t) => t.type === 'expense').forEach((t) => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const topCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const totalExpense = Object.values(catMap).reduce((s, v) => s + v, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Financial Insights</h1>
        <p className="page-subtitle">Deep-dive into your spending patterns and financial health.</p>
      </div>

      <InsightsPanel />

      <div className="charts-grid" style={{ marginTop: '24px' }}>
        <div className="chart-wide">
          <BalanceTrendChart />
        </div>
        <div className="chart-narrow">
          <SpendingPieChart />
        </div>
      </div>

      <div className="chart-card" id="top-categories-chart" style={{ marginTop: '24px' }}>
        <div className="chart-header">
          <h3 className="chart-title">Top Spending Categories</h3>
          <p className="chart-subtitle">Your biggest expense categories</p>
        </div>
        {topCats.length === 0 ? (
          <div className="empty-state">No expense data.</div>
        ) : (
          <div className="category-bars">
            {topCats.map(([cat, amount]) => {
              const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
              const color = CATEGORY_COLORS[cat as Category] || '#6b7280';
              return (
                <div key={cat} className="category-bar-item">
                  <div className="category-bar-label">
                    <span style={{ color }}>{cat}</span>
                    <span className="category-bar-amount">{formatINR(amount)}</span>
                  </div>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="category-bar-pct">{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPage;
