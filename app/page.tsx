"use client";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQJQpmKp-Ffkz9To51pA9ZxD_7oC3zN38",
  authDomain: "xo-game-ae7b9.firebaseapp.com",
  projectId: "xo-game-ae7b9",
  storageBucket: "xo-game-ae7b9.appspot.com",
  messagingSenderId: "418879005181",
  appId: "1:418879005181:web:5893d95d07bc3b751bb994",
  measurementId: "G-8NX5EMW78T",
  databaseURL: "https://xo-game-ae7b9-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Login() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [roomKey, setRoomKey] = useState<string | null>(null);

  const createOrJoinRoom = async () => {
    if (!playerOne || !playerTwo) {
      alert("Please enter both player names.");
      return;
    }

    setLoading(true);

    const dbRef = ref(db, "rooms");
    const snapshot = await get(dbRef);
    let foundRoomKey: string | null = null;

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const room = childSnapshot.val();
        if (room.players.playerOne === playerTwo && !room.players.playerTwo) {
          foundRoomKey = childSnapshot.key;
          return true;
        }
      });
    }

    if (foundRoomKey) {
      const updates: Record<string, any> = {};
      updates[`rooms/${foundRoomKey}/players/playerTwo`] = playerOne;
      //updates[`rooms/${foundRoomKey}/Reset`] = 0;

      await update(ref(db), updates);
      setRoomKey(foundRoomKey);
      waitForSecondPlayer(foundRoomKey);
    } else {
      const newRoomKey = `${playerOne}_${playerTwo}`;
      const newRoomRef = ref(db, `rooms/${newRoomKey}`);
      await set(newRoomRef, {
        players: {
          playerOne: playerOne,
          playerTwo: null,
        },
        board: Array<string>(9).fill(""),
        turn: playerOne,
        //status: "waiting", // Initial status
      });
      setRoomKey(newRoomKey);
      waitForSecondPlayer(newRoomKey);
    }
  };

  const waitForSecondPlayer = (roomId: string) => {
    const roomRef = ref(db, `rooms/${roomId}`);

    onValue(roomRef, (snapshot) => {
      const room = snapshot.val();
      if (room && room.players.playerTwo) {
        setLoading(false);
        router.push(`/game?roomId=${roomId}&playerOne=${playerOne}&playerTwo=${playerTwo}`);
      }
    });
  };

  function onScreen() {

    router.push(`/offline`);

  }

  return (
    <div className="container">
      <div className="inputs">
        <input
          className="field"
          type="text"
          placeholder="Player one name ..."
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
          required
        />
        <input
          className="field"
          type="text"
          placeholder="Player two name ..."
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
          required
        />
      </div>

      <div className="play-btns">
        <button className="online" onClick={createOrJoinRoom} disabled={loading}>
          {loading ? "Waiting for player..." : "Find or Create Room"}
        </button>
        <button className="onscreen" onClick={onScreen}>
          same screen
        </button>

      </div>
    </div>
  );
}
