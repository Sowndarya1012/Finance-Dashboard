import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { format, parseISO } from 'date-fns';
import { CATEGORY_COLORS } from '../data/mockData';
import type { Category } from '../types';
import { ArrowUp, ArrowDown } from 'lucide-react';

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const RecentTransactions: React.FC = () => {
  const { transactions, setActiveTab } = useAppStore();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="chart-card" id="recent-transactions">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Recent Transactions</h3>
          <p className="chart-subtitle">Latest financial activity</p>
        </div>
        <button className="btn-link" onClick={() => setActiveTab('transactions')}>
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">No transactions yet.</div>
      ) : (
        <div className="recent-list">
          {recent.map((tx) => (
            <div key={tx.id} className="recent-item">
              <div
                className="recent-icon"
                style={{
                  background: `${CATEGORY_COLORS[tx.category as Category]}22`,
                  color: CATEGORY_COLORS[tx.category as Category] || '#6b7280',
                }}
              >
                {tx.type === 'income' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              </div>
              <div className="recent-info">
                <p className="recent-desc">{tx.description}</p>
                <p className="recent-meta">
                  {tx.category} · {format(parseISO(tx.date), 'dd MMM')}
                </p>
              </div>
              <span className={`recent-amount ${tx.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
