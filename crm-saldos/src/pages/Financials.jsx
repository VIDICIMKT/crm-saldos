import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import BalanceWidget from '../financials/BalanceWidget';
import TransactionForm from '../financials/TransactionForm';

const Financials = () => {
  const { getDocuments, addDocument } = useFirestore();
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const data = await getDocuments('TRANSACTIONS');
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAddTransaction = async (transaction) => {
    await addDocument('TRANSACTIONS', {
      ...transaction,
      amount: Number(transaction.amount),
      date: new Date()
    });
    loadTransactions();
  };

  return (
    <div>
      <h2>Gestión Financiera</h2>
      <TransactionForm onSubmit={handleAddTransaction} />
      <BalanceWidget />
    </div>
  );
};

export default Financials;