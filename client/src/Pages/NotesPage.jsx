import { useState, useEffect } from "react";
import { useGetNotesApiQuery } from "../Store/slices/notesSlice";
import { FaSearch, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const NotesPage = () => {
  const { data: notes, error, isLoading } = useGetNotesApiQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (Array.isArray(notes)) {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredNotes([]);
    }
  }, [searchTerm, notes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = (note) => {
    fetch(`http://localhost:8000/notes/pdf/${note.filename}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${note.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        toast.error("Error downloading note:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notes</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <h2 className="text-3xl font-bold sm:text-4xl text-center mb-8">Notes</h2>
      <div className="relative mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search notes..."
        />
        <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
      </div>
      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-600">No notes found</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-4">{note.title}</h3>
              <div className="mt-auto">
                <button
                  onClick={() => handleDownload(note)}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center justify-center"
                >
                  <FaDownload className="inline-block mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
