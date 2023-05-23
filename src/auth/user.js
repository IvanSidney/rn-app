import { getAuth, updateProfile } from "firebase/auth";

updateProfile(auth.currentUser, {
    //Replace "Jane Q. User" to the username you desire
    //And Replace the PhotoURL with the desired Image
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
})
    .then(() => {
        // Profile updated!
        // ...
    })
    .catch((error) => {
        // An error occurred
        // ...
    });
