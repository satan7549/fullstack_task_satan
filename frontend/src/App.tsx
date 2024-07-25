import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { io } from "socket.io-client";
import noteIcon from "./assets/noteIcon.svg";

const socket = io(`${BASE_URL}`);

function App() {
  const [notes, setNotes] = useState<string[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/fetchAllTasks`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();

    // Listen for the "taskAdded" event and update the notes state
    socket.on("taskAdded", (task: string) => {
      setNotes((prevNotes) => [...prevNotes, task]);
    });

    // Clean up the WebSocket listener on component unmount
    return () => {
      socket.off("taskAdded");
    };
  }, []);

  const addNote = async (note: string) => {
    try {
      socket.emit("add", note);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 lg:w-1/3 bg-white rounded-xl shadow-lg space-y-4 border border-gray-300">
        <div className="flex items-center space-x-3">
          <img
            src={noteIcon}
            alt="noteIcon"
            style={{ width: "48px", height: "48px" }}
          />
          <div>
            <div className="text-2xl font-bold text-black">Note App</div>
          </div>
        </div>
        <NoteForm addNote={addNote} />
        <NoteList notes={notes} />
      </div>
    </div>
  );
}

export default App;
