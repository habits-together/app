import { DocumentSnapshot } from "firebase/firestore";
import { userWithIdT } from "../lib/db_types";


export const userDataConverter = {
    fromFirestore: (snapshot: DocumentSnapshot): userWithIdT => {
        const data = snapshot.data();
        const typedData: userWithIdT = {
            createdAt: data?.createdAt,
            displayName: data?.displayName,
            id: data?.id,
            picture: data?.picture,
            username: data?.username
        };
        return typedData;
    }
}