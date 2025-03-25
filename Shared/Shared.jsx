import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const getFavList = async (user) => {    
    const docSnap = await getDoc(doc(db, "UserFavPet", user));
    // console.log("docSnap : ", docSnap);
    if (docSnap?.exists()) {
        return docSnap?.data()?.favourites || [];
    } else {
        await setDoc(doc(db, "UserFavPet", user), {
            email: user,
            favourites: ['3']
        });
    }
}

const toggleFav = async (user, petId) => {
    const favList = await getFavList(user);
    const newFavList = favList.includes(petId)
        ? favList.filter((id) => id !== petId)
        : [...favList, petId];

    await setDoc(doc(db, "UserFavPet", user), {
        email: user,
        favourites: newFavList
    });
}
export default {getFavList, toggleFav};