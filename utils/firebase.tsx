// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore"
import { Property, SetProperties } from './types';
//import { v4 as uuidv4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDU164LJOE8aadWQ7OapIp1hZD8IHpwisQ",

  authDomain: "ecampus-3e541.firebaseapp.com",

  projectId: "ecampus-3e541",

  storageBucket: "ecampus-3e541.appspot.com",

  messagingSenderId: "737761221868",

  appId: "1:737761221868:web:ebe5f8a76646ced8f299c9",

  measurementId: "G-B8QK3M2MWS"

};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth()
export const storage = getStorage(app)
export const db = getFirestore(app)





  
 // Fetch properties function
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const propertyCollectionRef = collection(db, '2309');
    const orderedQuery = query(propertyCollectionRef, orderBy('id'));
    const querySnapshot = await getDocs(orderedQuery);
    const propertyData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Property[];

    const propertiesWithImages = await Promise.all(propertyData.map(async (property) => {
      let images: string[] = [];
      const imagePath = property.ImagePath || property.id;
      const imageListRef = ref(storage, `${imagePath}/`);

      try {
        const imageList = await listAll(imageListRef);
        images = await Promise.all(imageList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        }));
      } catch (error) {
        console.error(`Error fetching images for property ${property.id}:`, error);
      }

      return { ...property, images };
    }));

    return propertiesWithImages;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Delete property function
export const deleteProperty = async (id: string, ImagePath: string, setProperties: SetProperties): Promise<void> => {
  try {
    await deleteDoc(doc(db, '2309', id));

    // Delete associated property image from Firebase storage
    const imageListRef = ref(storage, `${ImagePath}/`);
    const imageList = await listAll(imageListRef);
    const deletePromises = imageList.items.map((item) => deleteObject(ref(storage, item.fullPath)));

    await Promise.all(deletePromises);

    setProperties((prevProperties) => prevProperties.filter((prop) => prop.id !== id));
    console.log(`Property with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting property with id ${id}:`, error);
  }
};

// Update property function
export const updateProperty = async (propertyId: string, updatedData: Partial<Property>): Promise<void> => {
  try {
    console.log('Updating property with ID:', propertyId);
    console.log('Updated Data:', updatedData);

    const propertyRef = doc(db, '2309', propertyId);
    await updateDoc(propertyRef, updatedData);
    console.log('Property updated successfully', propertyId);
  } catch (error) {
    console.error('Error updating property: ', error);
    throw error;
  }
};

// Add property function
export const addProperty = async (property: Property, imageFiles: File[], ImagePath: string): Promise<void> => {
  try {
    const propertyRef = collection(db, '2309');

    // Remove imageFiles from property object
    const { imageFiles: removedImageFiles, ...propertyData } = property;

    // Add property data to Firestore
    const docRef = await addDoc(propertyRef, propertyData);

    // Upload images to storage with indexed names
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const storageRef = ref(storage, `${ImagePath}/${ImagePath}${i + 1}`);
      await uploadBytes(storageRef, file);
    }

    console.log('Property and images added successfully');
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};