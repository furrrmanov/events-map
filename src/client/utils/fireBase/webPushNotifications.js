import 'firebase/messaging'

import localforage from 'localforage'

import firebase from 'src/client/utils/fireBase'

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false
      }

      const messaging = firebase.messaging()
      await Notification.requestPermission()
      const token = await messaging.getToken()

      localforage.setItem('fcm_token', token)
      console.log('fcm_token', token)
      return token
    } catch (error) {
      console.error(error)
    }
  },
}

export { firebaseCloudMessaging }
