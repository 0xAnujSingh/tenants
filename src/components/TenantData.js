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
  addTenant = (colRef, newTenant) => {
    return addDoc(colRef, newTenant);
  };

  updateTenant = (id, updateTenant) => {
    //console.log(id)
    const tenantDoc = doc(db, "TenantData", id);
    //console.log(tenantDoc,updateTenant)
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
    //console.log(id)
    const tenantDoc = doc(db, "TenantData", id);
    //console.log(id)
    //console.log(getDoc(tenantDoc))
    return getDoc(tenantDoc);
    
  };
}

export default new TenantDataService();
