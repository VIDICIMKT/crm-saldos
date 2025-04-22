import { db, collections } from '../firebase';
import { query, where, getDocs } from 'firebase/firestore';

export const getProductsLowStock = async (threshold = 5) => {
  const q = query(
    collection(db, collections.PRODUCTS), 
    where('stock', '<=', threshold)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRecentSales = async (days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const q = query(
    collection(db, collections.SALES), 
    where('date', '>=', cutoffDate)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};