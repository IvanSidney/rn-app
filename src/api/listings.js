import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";

import { database } from "../config/firabase";

const endpoint = "listings";
const getListing = async (id) => {
    const docRef = doc(database, endpoint, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
};

const getListings = async () => {
    const querySnapshot = await getDocs(collection(database, endpoint));
    // console.log(querySnapshot);
    // const newData = [];
    // querySnapshot.forEach((item) => {
    //     newData.push(item.data());
    // });
    // return newData;
    return querySnapshot.docs.map((doc) => doc.data());
};

const addListing = (listing) => {
    // console.log(listing);
    setDoc(doc(database, endpoint, listing.id), {
        categoryId: listing.category.value,
        id: listing.id,
        title: listing.title,
        price: listing.price,
        location: listing.location,
        images: [listing.urlImage],
    });
};

export default {
    getListing,
    addListing,
    getListings,
};
