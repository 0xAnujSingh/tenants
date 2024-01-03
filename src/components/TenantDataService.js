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

const tenantCollectionRef = collection(db, "TenantData");

class TenantDataService {
  ref = () => tenantCollectionRef;

  addTenant = (colRef, newTenant) => {
    return addDoc(colRef, newTenant);
  };

  updateTenant = (id, updateTenant) => {
    const tenantDoc = doc(db, "TenantData", id);
    return updateDoc(tenantDoc, updateTenant);
  };

  deleteTenant = (id) => {
    const tenantDoc = doc(db, "TenantData", id);
    return deleteDoc(tenantDoc);
  };

  getAllTenants = () => {
    return getDocs(tenantCollectionRef);
  };
  
  getTenantById = (id) => {
    const tenantDoc = doc(db, "TenantData", id);
    return getDoc(tenantDoc);
    
  };

}

export default new TenantDataService();
