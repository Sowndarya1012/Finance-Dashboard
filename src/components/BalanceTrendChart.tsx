import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { format, parseISO, startOfMonth } from 'date-fns';

const formatINR = (v: number) => `₹${(v / 1000).toFixed(0)}K`;

const BalanceTrendChart: React.FC = () => {
  const { transactions } = useAppStore();

  const data = useMemo(() => {
    // Group by month
    const monthMap: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((t) => {
      const month = format(parseISO(t.date), 'MMM yy');
      if (!monthMap[month]) monthMap[month] = { income: 0, expense: 0 };
      if (t.type === 'income') monthMap[month].income += t.amount;
      else monthMap[month].expense += t.amount;
    });

    return Object.entries(monthMap)
      .map(([month, vals]) => ({
        month,
        Income: vals.income,
        Expenses: vals.expense,
        Balance: vals.income - vals.expense,
      }))
      .sort((a, b) => new Date('01 ' + a.month).getTime() - new Date('01 ' + b.month).getTime());
  }, [transactions]);

  return (
    <div className="chart-card" id="balance-trend-chart">
      <div className="chart-header">
        <h3 className="chart-title">Income vs Expenses</h3>
        <p className="chart-subtitle">Monthly comparison over time</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <YAxis tickFormatter={formatINR} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <Tooltip
            formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`}
            contentStyle={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text)',
            }}
          />
          <Legend />
          <Bar dataKey="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
