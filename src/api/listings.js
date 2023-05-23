import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    Timestamp,
} from "firebase/firestore";

import { database } from "../config/firabase";
import { now } from "moment/moment";

const endpoint = "listings";
const getListing = async (id) => {
    const docRef = doc(database, endpoint, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
};

const getListings = async () => {
    const querySnapshot = await getDocs(collection(database, endpoint));

    return querySnapshot.docs.map((doc) => doc.data());
};

const addListing = (listing, id, url, location) => {
    setDoc(doc(database, endpoint, id), {
        categoryId: listing.category.value,
        id: id,
        title: listing.title,
        price: listing.price,
        location: { ...location },
        description: listing.description,
        images: [url],
        date: Timestamp.fromMillis(now()).toDate(),
    });
};

export default {
    getListing,
    addListing,
    getListings,
};
