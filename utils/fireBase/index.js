import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyALCk5QBr0DYOjhcs3JpNcSaGcU6AgzQc0',
  authDomain: 'map-events-293ec.firebaseapp.com',
  databaseURL: 'https://map-events-293ec.firebaseio.com',
  projectId: 'map-events-293ec',
  storageBucket: 'map-events-293ec.appspot.com',
  messagingSenderId: '368625046311',
  appId: '1:368625046311:web:412b93094c7e857b8d0f02',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export const database = firebase.database()
export const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()
export default firebase

export const singInWithEmailUsingFirebase = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      const { user } = result
      return user
    })
    .catch((error) => {})
}

export const singInWithGoogleAccountUsingFirebase = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const { user } = result
      return user
    })
}

export const checkUserAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

export const singOutUsingFirebase = () => {
  return firebase.auth().signOut()
}

export const getEventsListFirebaseDB = () => {
  return database
    .ref('/events')
    .once('value')
    .then((snapshot) => Object.entries(snapshot.val()))
}

export const sendItemInFirebaseDb = (item) => {
  return database.ref('/events').push(item)
}

export const deleteItemFromFirebaseDb = (value) => {
  const databaseRef = database.ref(value.collectionName)
  return databaseRef.once('value', (snpsht) => {
    snpsht.forEach((dp) => {
      database.ref(value.collectionRoot + value.itemId).set(null)
    })
  })
}

export const deleteItemFromFirebaseStorage = (fileName) => {
  const storageRef = storage.ref()
  const fileRef = storageRef.child(fileName)
  fileRef.delete()
}

export const updateItemFromFirebaseDb = (value) => {
  const databaseRef = database.ref(value.collectionName)
  return databaseRef.once('value', (snpsht) => {
    snpsht.forEach((dp) => {
      database.ref(value.collectionRoot + value.editEventId).set(value.data)
    })
  })
}

export const getUsersProfileListFirebaseDb = () => {
  return database
    .ref('/userProfiles')
    .once('value')
    .then((snapshot) => Object.entries(snapshot.val()))
}

export const uploadFileToFirebaseStorage = async (profile, useEmail) => {
  const file = profile
  const storageRef = storage.ref()
  const fileRef = storageRef.child(file.name)

  await fileRef.put(file)

  return fileRef
}

export const createUserProfileInFirebaseDb = async (profile) => {
  await database.ref('/userProfiles').push(profile)
}

export const updateUserProfilesInFirebaseDb = (value) => {
  const databaseRef = database.ref(value.collectionName)

  return databaseRef.once('value', (snpsht) => {
    database.ref(value.collectionRoot + value.profile.id).set(value.profile)
  })
}
