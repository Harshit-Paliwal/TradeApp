import { db } from "../firebase";
import { doc, updateDoc, getDoc, addDoc, collection } from "firebase/firestore";

const MAX_LIMIT = 100000;

export const tradingService = {
  async buyStock(userId: string, symbol: string, price: number, quantity: number) {
    const total = price * quantity;

    if (total > MAX_LIMIT) {
      throw new Error("Transaction limit exceeded (₹100000)");
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();

    if (user.balance < total) {
      throw new Error("Insufficient balance");
    }

    // Update balance
    await updateDoc(userRef, {
      balance: user.balance - total,
      totalInvested: user.totalInvested + total
    });

    // Save trade
    await addDoc(collection(db, "trades"), {
      userId,
      symbol,
      price,
      quantity,
      type: "BUY",
      createdAt: Date.now()
    });
  },

  async sellStock(userId: string, symbol: string, price: number, quantity: number) {
    const total = price * quantity;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();

    await updateDoc(userRef, {
      balance: user.balance + total,
    });

    await addDoc(collection(db, "trades"), {
      userId,
      symbol,
      price,
      quantity,
      type: "SELL",
      createdAt: Date.now()
    });
  }
};