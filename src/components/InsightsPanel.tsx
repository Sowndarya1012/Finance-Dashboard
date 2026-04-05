import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { CATEGORY_COLORS } from '../data/mockData';
import type { Category } from '../types';
import { format, parseISO, subMonths } from 'date-fns';
import { AlertTriangle, TrendingDown, TrendingUp, Lightbulb, Star, AlertCircle } from 'lucide-react';

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const InsightsPanel: React.FC = () => {
  const { transactions } = useAppStore();

  const insights = useMemo(() => {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = subMonths(thisMonthStart, 1);
    const lastMonthEnd = new Date(thisMonthStart.getTime() - 1);

    const thisMonth = transactions.filter((t) => new Date(t.date) >= thisMonthStart);
    const lastMonth = transactions.filter(
      (t) => new Date(t.date) >= lastMonthStart && new Date(t.date) <= lastMonthEnd
    );

    const thisExpenses = thisMonth.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const lastExpenses = lastMonth.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const thisIncome = thisMonth.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const lastIncome = lastMonth.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);

    // Top spending category
    const catMap: Record<string, number> = {};
    transactions.filter((t) => t.type === 'expense').forEach((t) => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    const result = [];

    if (topCat) {
      result.push({
        id: 'top-category',
        type: 'warning' as const,
        icon: <AlertTriangle size={20} />,
        title: `Highest Spend: ${topCat[0]}`,
        description: `You've spent ${formatINR(topCat[1])} on ${topCat[0]} overall. Consider reviewing this category.`,
        color: CATEGORY_COLORS[topCat[0] as Category] || '#f59e0b',
      });
    }

    if (lastExpenses > 0) {
      const diff = thisExpenses - lastExpenses;
      const pct = Math.abs(((diff / lastExpenses) * 100)).toFixed(1);
      result.push({
        id: 'expense-change',
        type: diff > 0 ? 'danger' as const : 'success' as const,
        icon: diff > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />,
        title: `Expenses ${diff > 0 ? 'Up' : 'Down'} ${pct}% vs Last Month`,
        description: `This month: ${formatINR(thisExpenses)} | Last month: ${formatINR(lastExpenses)}. ${diff > 0 ? 'Try to cut back on discretionary spending.' : 'Great job keeping expenses low!'}`,
        color: diff > 0 ? '#ef4444' : '#22c55e',
      });
    }

    if (lastIncome > 0) {
      const diff = thisIncome - lastIncome;
      const pct = Math.abs(((diff / lastIncome) * 100)).toFixed(1);
      result.push({
        id: 'income-change',
        type: diff > 0 ? 'success' as const : 'info' as const,
        icon: <TrendingUp size={20} />,
        title: `Income ${diff >= 0 ? 'Up' : 'Down'} ${pct}% vs Last Month`,
        description: `This month: ${formatINR(thisIncome)} | Last month: ${formatINR(lastIncome)}.`,
        color: diff >= 0 ? '#22c55e' : '#8b5cf6',
      });
    }

    const savingsRate = thisIncome > 0 ? ((thisIncome - thisExpenses) / thisIncome) * 100 : 0;
    result.push({
      id: 'savings-rate',
      type: savingsRate >= 20 ? 'success' as const : savingsRate >= 10 ? 'info' as const : 'danger' as const,
      icon: <Star size={20} />,
      title: `Savings Rate: ${savingsRate.toFixed(1)}%`,
      description:
        savingsRate >= 20
          ? 'Excellent! You\'re saving more than 20% of your income this month.'
          : savingsRate >= 10
          ? 'You\'re saving a decent amount—aim for 20%+ for financial security.'
          : 'Your savings rate is below 10%. Try to reduce expenses or increase income.',
      color: savingsRate >= 20 ? '#22c55e' : savingsRate >= 10 ? '#06b6d4' : '#ef4444',
    });

    // Food spending warning
    const foodSpend = transactions.filter(t => t.type === 'expense' && t.category === 'Food & Dining').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const foodPct = totalExpense > 0 ? (foodSpend / totalExpense) * 100 : 0;
    if (foodPct > 20) {
      result.push({
        id: 'food-insight',
        type: 'info' as const,
        icon: <Lightbulb size={20} />,
        title: `Food Spending at ${foodPct.toFixed(0)}% of Total`,
        description: `You're spending ${formatINR(foodSpend)} on Food & Dining — cooking at home more often could save you significantly.`,
        color: '#f97316',
      });
    }

    // Entertainment overspend
    const entSpend = transactions.filter(t => t.type === 'expense' && t.category === 'Entertainment').reduce((s, t) => s + t.amount, 0);
    if (entSpend > 0) {
      result.push({
        id: 'entertainment-insight',
        type: 'info' as const,
        icon: <AlertCircle size={20} />,
        title: `Entertainment Spend: ${formatINR(entSpend)}`,
        description: `Review your subscriptions and entertainment costs — small recurring charges add up over time.`,
        color: '#f59e0b',
      });
    }

    return result;
  }, [transactions]);

  return (
    <div className="insights-panel" id="insights-panel">
      <div className="insights-header">
        <h2 className="section-title">Financial Insights</h2>
        <p className="section-subtitle">Smart observations based on your data</p>
      </div>
      <div className="insights-grid">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`insight-card insight-${insight.type}`}
            id={`insight-${insight.id}`}
            style={{ '--insight-color': insight.color } as React.CSSProperties}
          >
            <div className="insight-icon" style={{ color: insight.color }}>
              {insight.icon}
            </div>
            <div className="insight-content">
              <h4 className="insight-title">{insight.title}</h4>
              <p className="insight-desc">{insight.description}</p>
            </div>
          </div>
        ))}
        {insights.length === 0 && (
          <div className="empty-state">
            <p>Add transactions to generate insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
