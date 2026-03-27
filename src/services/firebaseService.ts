import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile, Trade, Holding, WatchlistItem, Notification } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

// User Profile
export async function createUserProfile(profile: UserProfile) {
  const path = `users/${profile.uid}`;
  try {
    await setDoc(doc(db, 'users', profile.uid), profile);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

// Trades
export async function addTrade(trade: Trade) {
  const path = 'trades';
  try {
    const newTradeRef = doc(collection(db, 'trades'));
    const tradeWithId = { ...trade, id: newTradeRef.id };
    await setDoc(newTradeRef, tradeWithId);
    return tradeWithId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToTrades(userId: string, callback: (trades: Trade[]) => void) {
  const path = 'trades';
  const q = query(collection(db, 'trades'), where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const trades = snapshot.docs.map(doc => doc.data() as Trade);
    callback(trades);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
}

// Holdings
export async function updateHolding(holding: Holding) {
  const path = `holdings/${holding.userId}_${holding.symbol}`;
  try {
    const holdingRef = doc(db, 'holdings', `${holding.userId}_${holding.symbol}`);
    await setDoc(holdingRef, holding, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToHoldings(userId: string, callback: (holdings: Holding[]) => void) {
  const path = 'holdings';
  const q = query(collection(db, 'holdings'), where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const holdings = snapshot.docs.map(doc => doc.data() as Holding);
    callback(holdings);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
}

// Watchlist
export async function addToWatchlist(userId: string, symbol: string) {
  const path = 'watchlist';
  try {
    const newItemRef = doc(collection(db, 'watchlist'));
    const item: WatchlistItem = { 
      id: newItemRef.id, 
      userId, 
      symbol, 
      addedAt: Date.now() 
    };
    await setDoc(newItemRef, item);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeFromWatchlist(itemId: string) {
  const path = `watchlist/${itemId}`;
  try {
    await deleteDoc(doc(db, 'watchlist', itemId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeToWatchlist(userId: string, callback: (items: WatchlistItem[]) => void) {
  const path = 'watchlist';
  const q = query(collection(db, 'watchlist'), where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => doc.data() as WatchlistItem);
    callback(items);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
}

// Notifications
export async function markNotificationAsRead(notificationId: string) {
  const path = `notifications/${notificationId}`;
  try {
    await updateDoc(doc(db, 'notifications', notificationId), { read: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function clearNotifications(userId: string) {
  const path = 'notifications';
  try {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeToNotifications(userId: string, callback: (notifications: Notification[]) => void) {
  const path = 'notifications';
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => doc.data() as Notification);
    callback(notifications);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
}
