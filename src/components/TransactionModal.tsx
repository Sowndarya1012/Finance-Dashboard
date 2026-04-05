import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppStore } from '../store/useAppStore';
import { CATEGORIES } from '../data/mockData';
import type { Transaction, Category, TransactionType } from '../types';
import { X, Save, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionModal: React.FC<Props> = ({ transaction, onClose }) => {
  const { addTransaction, updateTransaction } = useAppStore();

  const [form, setForm] = useState({
    date: transaction?.date || format(new Date(), 'yyyy-MM-dd'),
    description: transaction?.description || '',
    amount: transaction?.amount?.toString() || '',
    category: transaction?.category || ('Food & Dining' as Category),
    type: transaction?.type || ('expense' as TransactionType),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid positive amount';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      date: form.date,
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category as Category,
      type: form.type as TransactionType,
    };

    if (transaction) {
      updateTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  const categories = CATEGORIES.filter((c) => c !== 'All') as Category[];

  return createPortal(
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" id="transaction-modal">
        <div className="modal-header">
          <h3 className="modal-title">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tx-type">Type</label>
              <div className="type-toggle">
                {(['income', 'expense'] as TransactionType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`type-btn type-btn-${t} ${form.type === t ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, type: t })}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tx-date">Date</label>
              <input
                id="tx-date"
                type="date"
                className={`form-input ${errors.date ? 'error' : ''}`}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tx-description">Description</label>
            <input
              id="tx-description"
              type="text"
              className={`form-input ${errors.description ? 'error' : ''}`}
              placeholder="e.g. Salary, Grocery, Netflix..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tx-amount">Amount (₹)</label>
              <input
                id="tx-amount"
                type="number"
                className={`form-input ${errors.amount ? 'error' : ''}`}
                placeholder="0"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
              {errors.amount && <span className="form-error">{errors.amount}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tx-category">Category</label>
              <select
                id="tx-category"
                className="form-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="submit-transaction-btn">
              {transaction ? <><Save size={16} /> Save Changes</> : <><Plus size={16} /> Add Transaction</>}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default TransactionModal;
