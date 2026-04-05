export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food & Dining'
  | 'Travel'
  | 'Bills & Utilities'
  | 'Shopping'
  | 'Healthcare'
  | 'Entertainment'
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type UserRole = 'Admin' | 'Viewer';

export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: Category | 'All';
  type: TransactionType | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'success' | 'info' | 'danger';
  icon: string;
}
