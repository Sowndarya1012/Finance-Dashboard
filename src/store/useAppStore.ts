import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, UserRole, FilterState, Category, TransactionType, SortField, SortOrder } from '../types';
import { mockTransactions } from '../data/mockData';

export interface UserAccount {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  createdAt: string;
}

interface AppState {
  transactions: Transaction[];
  currentUser: UserAccount | null;
  users: UserAccount[];
  filters: FilterState;
  darkMode: boolean;
  activeTab: 'dashboard' | 'transactions' | 'insights' | 'settings' | 'users';
  
  login: (user: UserAccount) => void;
  logout: () => void;
  setDarkMode: (isDark: boolean) => void;
  setActiveTab: (tab: 'dashboard' | 'transactions' | 'insights' | 'settings' | 'users') => void;
  addUser: (user: Omit<UserAccount, 'id' | 'createdAt'>) => void;
  deleteUser: (id: string) => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  getFilteredTransactions: () => Transaction[];
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
}

const defaultFilters: FilterState = {
  search: '',
  category: 'All',
  type: 'All',
  sortField: 'date',
  sortOrder: 'desc',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      currentUser: null,
      users: [
        { id: '1', username: 'admin', password: 'admin123', role: 'Admin', createdAt: new Date().toISOString() },
        { id: '2', username: 'viewer', password: 'viewer123', role: 'Viewer', createdAt: new Date().toISOString() }
      ],
      filters: defaultFilters,
      darkMode: false,
      activeTab: 'dashboard',

      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, activeTab: 'dashboard' }),
      setDarkMode: (val) => set({ darkMode: val }),
      setActiveTab: (activeTab) => set({ activeTab }),

      addUser: (user) => {
        const newUser: UserAccount = {
          ...user,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },

      deleteUser: (id) => {
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
      },

      addTransaction: (t) => {
        const newTransaction: Transaction = {
          ...t,
          id: Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
      },

      updateTransaction: (id, updated) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
      },

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }

        if (filters.category !== 'All') {
          result = result.filter((t) => t.category === filters.category);
        }

        if (filters.type !== 'All') {
          result = result.filter((t) => t.type === filters.type);
        }

        result.sort((a, b) => {
          let valA: number, valB: number;
          if (filters.sortField === 'date') {
            valA = new Date(a.date).getTime();
            valB = new Date(b.date).getTime();
          } else {
            valA = a.amount;
            valB = b.amount;
          }
          return filters.sortOrder === 'asc' ? valA - valB : valB - valA;
        });

        return result;
      },

      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get();
        return getTotalIncome() - getTotalExpenses();
      },
    }),
    {
      name: 'zorvyn-finance-store',
      partialState: (state: AppState) => ({
        transactions: state.transactions,
        currentUser: state.currentUser,
        users: state.users,
        darkMode: state.darkMode,
      }),
    } as any
  )
);
