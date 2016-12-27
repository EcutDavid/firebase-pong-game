import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from '../constants/firebase'

const defaultApp = firebase.initializeApp(FIREBASE_CONFIG)
const db = defaultApp.database();

export function getDefaultDatabase() {
  return db;
}
