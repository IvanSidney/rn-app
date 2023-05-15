import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    collection,
} from "firebase/firestore";

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
    const newData = [];
    querySnapshot.forEach((item) => {
        newData.push(item.data());
    });
    return newData;
};

// const addListing = (listing) => {
//     const data = new FormData({});

//     data.append("title", listing.title);

//     data.append("price", listing.price);

//     data.append("categoryId", listing.category.value);

//     data.append("description", listing.description);

//     listing.images.forEach((image, index) =>
//         data.append("images", {
//             name: "image" + index,
//             type: "image/jpeg",
//             uri: image,
//         })
//     );

//     if (listing.location) data.append("location", listing.location);

//     let object = {};
//     data._parts.forEach((item) => (object[item[0]] = item[1]));
//     console.log(object);

//     return client.post(endpoint, object);
// };
const addListing = async (listing) => {
    // console.log(2, listing);
    const listingRef = await addDoc((database, endpoint, listing.id), {
        categoryId: listing.category.value,
        id: listing.id,
        title: listing.title,
        price: listing.price,
    });
    console.log("Document written with ID: ", listingRef.id);

    // const res = await addDoc(doc(listingRef, listing.id), {
    //     id: listing.id,
    //     title: listing.title,
    //     price: listing.price,
    //     image: listing.image,
    // });
    return listingRef;
};

export default {
    getListings,
    addListing,
    getListings,
};
