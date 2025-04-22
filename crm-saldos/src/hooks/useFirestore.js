import { db, collections } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    return await addDoc(collection(db, collections[collectionName]), data);
  };

  const getDocuments = async (collectionName) => {
    const snapshot = await getDocs(collection(db, collections[collectionName]));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  return { addDocument, getDocuments };
};