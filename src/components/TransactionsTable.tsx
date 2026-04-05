import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import type { Category, TransactionType } from '../types';
import { format, parseISO } from 'date-fns';
import {
  Search, Filter, ArrowUpDown, Plus, Edit2, Trash2, X, ChevronUp, ChevronDown,
  ArrowUp, ArrowDown, Download,
} from 'lucide-react';
import TransactionModal from './TransactionModal';
import type { Transaction } from '../types';

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const TransactionsTable: React.FC = () => {
  const {
    currentUser, filters, setFilter, resetFilters, getFilteredTransactions,
    deleteTransaction,
  } = useAppStore();
  const role = currentUser?.role;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | undefined>(undefined);

  const transactions = getFilteredTransactions();

  const handleSort = (field: 'date' | 'amount') => {
    if (filters.sortField === field) {
      setFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setFilter('sortField', field);
      setFilter('sortOrder', 'desc');
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map((t) => [
      t.date, t.description, t.category, t.type, t.amount,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zorvyn-transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: 'date' | 'amount' }) => {
    if (filters.sortField !== field) return <ArrowUpDown size={14} className="sort-icon" />;
    return filters.sortOrder === 'asc'
      ? <ChevronUp size={14} className="sort-icon active" />
      : <ChevronDown size={14} className="sort-icon active" />;
  };

  return (
    <div className="transactions-section" id="transactions-section">
      {/* Header */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-subtitle">{transactions.length} records found</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={exportCSV} id="export-csv-btn">
            <Download size={16} /> Export CSV
          </button>
          {role === 'Admin' && (
            <button
              className="btn btn-primary"
              onClick={() => { setEditingTx(undefined); setModalOpen(true); }}
              id="add-transaction-btn"
            >
              <Plus size={16} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            id="search-input"
            type="text"
            placeholder="Search transactions..."
            className="search-input"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
          {filters.search && (
            <button className="clear-btn" onClick={() => setFilter('search', '')}>
              <X size={14} />
            </button>
          )}
        </div>

        <select
          id="filter-category"
          className="filter-select"
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          id="filter-type"
          className="filter-select"
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button className="btn btn-ghost" onClick={resetFilters} id="reset-filters-btn">
          <X size={14} /> Reset
        </button>
      </div>

      {/* Table */}
      {transactions.length === 0 ? (
        <div className="empty-state-large">
          <div className="empty-icon">📊</div>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or add a new transaction.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>
                  <button className="sort-btn" onClick={() => handleSort('date')}>
                    Date <SortIcon field="date" />
                  </button>
                </th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>
                  <button className="sort-btn" onClick={() => handleSort('amount')}>
                    Amount <SortIcon field="amount" />
                  </button>
                </th>
                {role === 'Admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="table-row">
                  <td className="date-cell">
                    {format(parseISO(tx.date), 'dd MMM yyyy')}
                  </td>
                  <td className="desc-cell">{tx.description}</td>
                  <td>
                    <span
                      className="category-badge"
                      style={{
                        background: `${CATEGORY_COLORS[tx.category as Category]}22`,
                        color: CATEGORY_COLORS[tx.category as Category] || '#6b7280',
                        border: `1px solid ${CATEGORY_COLORS[tx.category as Category]}44`,
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge type-${tx.type}`}>
                      {tx.type === 'income' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {tx.type}
                    </span>
                  </td>
                  <td className={`amount-cell amount-${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                  </td>
                  {role === 'Admin' && (
                    <td className="actions-cell">
                      <button
                        className="icon-btn edit-btn"
                        onClick={() => { setEditingTx(tx); setModalOpen(true); }}
                        aria-label={`Edit ${tx.description}`}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="icon-btn delete-btn"
                        onClick={() => deleteTransaction(tx.id)}
                        aria-label={`Delete ${tx.description}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <TransactionModal
          transaction={editingTx}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
