import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { TrendingUp, TrendingDown, Wallet, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const SummaryCards: React.FC = () => {
  const { getTotalBalance, getTotalIncome, getTotalExpenses, transactions } = useAppStore();

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : '0';

  const cards = [
    {
      id: 'total-balance',
      label: 'Total Balance',
      value: formatCurrency(balance),
      change: `${savingsRate}% savings rate`,
      positive: balance >= 0,
      icon: <Wallet size={22} />,
      gradient: 'gradient-balance',
      iconBg: 'icon-balance',
    },
    {
      id: 'total-income',
      label: 'Total Income',
      value: formatCurrency(income),
      change: `${transactions.filter(t => t.type === 'income').length} transactions`,
      positive: true,
      icon: <TrendingUp size={22} />,
      gradient: 'gradient-income',
      iconBg: 'icon-income',
    },
    {
      id: 'total-expenses',
      label: 'Total Expenses',
      value: formatCurrency(expenses),
      change: `${transactions.filter(t => t.type === 'expense').length} transactions`,
      positive: false,
      icon: <TrendingDown size={22} />,
      gradient: 'gradient-expense',
      iconBg: 'icon-expense',
    },
    {
      id: 'net-savings',
      label: 'Net Savings',
      value: formatCurrency(Math.max(0, balance)),
      change: balance >= 0 ? 'You\'re in the green!' : 'Overspent this period',
      positive: balance >= 0,
      icon: <DollarSign size={22} />,
      gradient: 'gradient-savings',
      iconBg: 'icon-savings',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.id} className={`summary-card ${card.gradient}`} id={card.id}>
          <div className="card-header">
            <div className={`card-icon ${card.iconBg}`}>{card.icon}</div>
            <div className={`card-trend ${card.positive ? 'trend-up' : 'trend-down'}`}>
              {card.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            </div>
          </div>
          <div className="card-body">
            <p className="card-label">{card.label}</p>
            <h3 className="card-value">{card.value}</h3>
            <p className="card-change">{card.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
