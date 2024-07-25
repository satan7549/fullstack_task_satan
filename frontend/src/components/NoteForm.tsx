import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

interface NoteFormProps {
  addNote: (note: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = () => {
    if (note.trim()) {
      addNote(note);
      setNote("");
      setError("");
    } else {
      setError("Note cannot be empty.");
      setTimeout(() => setError(""), 1000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddNote();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          type="text"
          className={`flex-grow p-2 border rounded-md focus:outline-none shadow-md ${
            error ? "border-red-500" : ""
          }`}
          placeholder="New Note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-customBrown text-white p-2 rounded-md pl-4 pr-4"
          onClick={handleAddNote}
        >
          <div className="flex items-center space-x-2">
            <FaPlusCircle />
            <span className="font-bold">Add</span>
          </div>
        </button>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default NoteForm;
