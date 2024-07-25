import React from "react";

interface NoteListProps {
  notes: string[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-black border-b-2 pb-1">Notes</h2>
      <ul className="space-y-1 mt-2 max-h-52 overflow-y-auto custom-scrollbar ">
        {notes.map((note, index) => (
          <li key={index} className="pt-2 pb-2 border-b-2 border-b-gray-300 ">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
