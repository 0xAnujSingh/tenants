import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const collectionName = "Transactions";
const transactionCollectionRef = collection(db, collectionName);

class TransactionService {
  ref = () => transactionCollectionRef;

  addTransaction = (colRef, newTransaction) => {
    return addDoc(colRef, Object.assign({date: new Date()}, newTransaction));
  };

  updateTransaction = (id, updateTransaction) => {
    const transactionDoc = doc(db, "TransactionData", id);
    return updateDoc(transactionDoc, updateTransaction);
  };

  deleteTransaction = (id) => {
    const transactionDoc = doc(db, "TransactionData", id);
    return deleteDoc(transactionDoc);
  };

  getAllTransaction = () => {
    return getDocs(transactionCollectionRef);
  };

  getTransactionById = (id) => {
    const transactionDoc = doc(db, "TransactionData", id);
    return getDoc(transactionDoc);
  };
}

export default new TransactionService();
