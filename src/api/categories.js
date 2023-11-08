import db from "../firebase";
import {
  ref,
  get,
} from "firebase/database";

const categoriesRef = ref(db, "categories");

const getCategories = async () => {
    const snapshot = await get(categoriesRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
}


const categoriesAPI = {
  getCategories,
};

export default categoriesAPI;
