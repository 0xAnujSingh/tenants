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

const collectionName = "Rooms";
const roomCollectionRef = collection(db, collectionName);

class RoomService {
  ref = () => roomCollectionRef;

  addRoom = (colRef, newRoom) => {
    return addDoc(
      colRef,
      Object.assign({ CreatedAtDate: new Date() }, newRoom)
    );
  };

  updateRoom = (id, attributes) => {
    const roomDoc = doc(db, "Rooms", id);
    return updateDoc(roomDoc, attributes);
  };

  deleteRoom = (id) => {
    const roomDoc = doc(db, "Rooms", id);
    return deleteDoc(roomDoc);
  };

  getAllRoom = () => {
    return getDocs(roomCollectionRef);
  };

  getRoomById = (id) => {
    const roomDoc = doc(db, "Rooms", id);
    return getDoc(roomDoc);
  };
}

export default new RoomService();
