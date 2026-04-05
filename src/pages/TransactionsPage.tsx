import React from 'react';
import TransactionsTable from '../components/TransactionsTable';

const TransactionsPage: React.FC = () => {
  return (
    <div className="page">
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
