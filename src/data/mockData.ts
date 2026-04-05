import type { Transaction, Category } from '../types';
import { subDays, format, subMonths, startOfMonth } from 'date-fns';

const today = new Date();

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockTransactions: Transaction[] = [
  // --- Current Month ---
  { id: generateId(), date: format(subDays(today, 0), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 75000, category: 'Salary', type: 'income' },
  { id: generateId(), date: format(subDays(today, 1), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 2400, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 2), 'yyyy-MM-dd'), description: 'Swiggy Order', amount: 650, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 3), 'yyyy-MM-dd'), description: 'Freelance Design Project', amount: 18000, category: 'Freelance', type: 'income' },
  { id: generateId(), date: format(subDays(today, 4), 'yyyy-MM-dd'), description: 'Grocery Store', amount: 3200, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 5), 'yyyy-MM-dd'), description: 'Uber Ride', amount: 480, category: 'Travel', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 6), 'yyyy-MM-dd'), description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 7), 'yyyy-MM-dd'), description: 'Amazon Shopping', amount: 5400, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 8), 'yyyy-MM-dd'), description: 'Doctor Visit', amount: 1200, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 9), 'yyyy-MM-dd'), description: 'Stock Dividend', amount: 4200, category: 'Investment', type: 'income' },
  { id: generateId(), date: format(subDays(today, 10), 'yyyy-MM-dd'), description: 'Zomato Order', amount: 890, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 11), 'yyyy-MM-dd'), description: 'Internet Bill', amount: 999, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 12), 'yyyy-MM-dd'), description: 'Weekend Trip Goa', amount: 12000, category: 'Travel', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 13), 'yyyy-MM-dd'), description: 'Spotify Premium', amount: 119, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 14), 'yyyy-MM-dd'), description: 'Consulting Fee', amount: 22000, category: 'Freelance', type: 'income' },
  { id: generateId(), date: format(subDays(today, 15), 'yyyy-MM-dd'), description: 'Pharmacy', amount: 560, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 16), 'yyyy-MM-dd'), description: 'Clothes Shopping', amount: 4800, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 17), 'yyyy-MM-dd'), description: 'Restaurant Dinner', amount: 1800, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 18), 'yyyy-MM-dd'), description: 'SIP Investment', amount: 10000, category: 'Investment', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 19), 'yyyy-MM-dd'), description: 'Train Tickets', amount: 2200, category: 'Travel', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 20), 'yyyy-MM-dd'), description: 'Gas Bill', amount: 850, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 21), 'yyyy-MM-dd'), description: 'Freelance Writing', amount: 8500, category: 'Freelance', type: 'income' },
  { id: generateId(), date: format(subDays(today, 22), 'yyyy-MM-dd'), description: 'Cinema Tickets', amount: 700, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 23), 'yyyy-MM-dd'), description: 'Coffee Shop', amount: 380, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(today, 24), 'yyyy-MM-dd'), description: 'Water Bill', amount: 450, category: 'Bills & Utilities', type: 'expense' },
  // --- Last Month ---
  { id: generateId(), date: format(subDays(subMonths(today, 1), 0), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 75000, category: 'Salary', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 2), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 2200, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 4), 'yyyy-MM-dd'), description: 'Grocery Store', amount: 2800, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 5), 'yyyy-MM-dd'), description: 'Freelance Project', amount: 15000, category: 'Freelance', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 7), 'yyyy-MM-dd'), description: 'Flight Tickets', amount: 8500, category: 'Travel', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 9), 'yyyy-MM-dd'), description: 'Amazon Shopping', amount: 6200, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 11), 'yyyy-MM-dd'), description: 'Gym Membership', amount: 1500, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 13), 'yyyy-MM-dd'), description: 'Mutual Fund Return', amount: 5500, category: 'Investment', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 15), 'yyyy-MM-dd'), description: 'Restaurant Lunch', amount: 1200, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 17), 'yyyy-MM-dd'), description: 'Internet + TV', amount: 1299, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 19), 'yyyy-MM-dd'), description: 'Weekend Outing', amount: 3200, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 1), 21), 'yyyy-MM-dd'), description: 'Freelance Design', amount: 12000, category: 'Freelance', type: 'income' },
  // --- 2 Months Ago ---
  { id: generateId(), date: format(subDays(subMonths(today, 2), 0), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 70000, category: 'Salary', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 3), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 1980, category: 'Bills & Utilities', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 5), 'yyyy-MM-dd'), description: 'Supermarket', amount: 3100, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 7), 'yyyy-MM-dd'), description: 'Side Project Income', amount: 9000, category: 'Freelance', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 10), 'yyyy-MM-dd'), description: 'Hotel Stay', amount: 7200, category: 'Travel', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 12), 'yyyy-MM-dd'), description: 'Electronics', amount: 14500, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 14), 'yyyy-MM-dd'), description: 'Medical Tests', amount: 2200, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 16), 'yyyy-MM-dd'), description: 'Stock Returns', amount: 6800, category: 'Investment', type: 'income' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 18), 'yyyy-MM-dd'), description: 'Coffee & Snacks', amount: 520, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: format(subDays(subMonths(today, 2), 20), 'yyyy-MM-dd'), description: 'Phone Bill', amount: 699, category: 'Bills & Utilities', type: 'expense' },
];

export const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Food & Dining',
  'Travel',
  'Bills & Utilities',
  'Shopping',
  'Healthcare',
  'Entertainment',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Food & Dining': '#f97316',
  'Travel': '#8b5cf6',
  'Bills & Utilities': '#3b82f6',
  'Shopping': '#ec4899',
  'Healthcare': '#10b981',
  'Entertainment': '#f59e0b',
  'Salary': '#22c55e',
  'Freelance': '#06b6d4',
  'Investment': '#a78bfa',
  'Other': '#6b7280',
};
