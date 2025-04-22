import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    return await addDoc(collection(db, collectionName), data);
  };

  const getDocuments = async (collectionName) => {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  return { addDocument, getDocuments };
};