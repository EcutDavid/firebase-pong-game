import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from '../constants/firebase'

const defaultApp = firebase.initializeApp(FIREBASE_CONFIG)

export function getDefaultDatabase() {
  return defaultApp.database()
}
