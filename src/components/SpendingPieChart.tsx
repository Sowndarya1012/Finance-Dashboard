import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { CATEGORY_COLORS } from '../data/mockData';
import type { Category } from '../types';

const SpendingPieChart: React.FC = () => {
  const { transactions } = useAppStore();

  const data = useMemo(() => {
    const catMap: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      });

    return Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const RADIAN = Math.PI / 180;
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="600">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (data.length === 0) {
    return (
      <div className="chart-card" id="spending-pie-chart">
        <div className="chart-header">
          <h3 className="chart-title">Spending by Category</h3>
        </div>
        <div className="empty-state">No expense data available.</div>
      </div>
    );
  }

  return (
    <div className="chart-card" id="spending-pie-chart">
      <div className="chart-header">
        <h3 className="chart-title">Spending by Category</h3>
        <p className="chart-subtitle">Distribution of expenses</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={105}
            innerRadius={50}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[entry.name as Category] || '#6b7280'}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`}
            contentStyle={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text)',
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingPieChart;
