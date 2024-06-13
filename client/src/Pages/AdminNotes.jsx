import { useState, useEffect } from "react";
import {
  useGetNotesAdminApiQuery,
  useUpdateNotesApiMutation,
  useDeleteNotesApiMutation,
  useGetNotesApiQuery,
} from "../Store/slices/notesSlice"; // Ensure you have this mutation in your notesSlice
import { FaSearch, FaDownload, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminNotes = () => {
  const { data: notes, error, isLoading, refetch } = useGetNotesAdminApiQuery();
  const [updateNotesApi] = useUpdateNotesApiMutation();
  const [deleteNotesApi] = useDeleteNotesApiMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const { refetch: refectNotesUser } = useGetNotesApiQuery();

  useEffect(() => {
    if (notes) {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, notes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = (note) => {
    fetch(`http://13.51.172.58:8000/notes/pdf/${note.filename}`)
      .then((response) => {
        return response.blob();
      })
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
        console.error("Error downloading note:", error);
      });
  };

  const handleEditClick = (note) => {
    setEditNoteId(note._id);
    setNewNoteTitle(note.title);
  };

  const handleUpdateClick = async (noteId) => {
    if (!newNoteTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    const data = {
      title: newNoteTitle,
    };
    try {
      await updateNotesApi({ id: noteId, data }).unwrap();
      toast.success("Note title updated successfully");
      refetch();
      refectNotesUser();
      setEditNoteId(null);
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
    }
  };

  const handleDeleteClick = async (noteId) => {
    try {
      await deleteNotesApi(noteId).unwrap();
      toast.success("Note deleted successfully");
      refetch();
      refectNotesUser();
    } catch (error) {
      toast.error(`Delete failed: ${error.message}`);
    }
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
          className="w-full p-4 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search notes..."
        />
        <FaSearch className="absolute top-0 left-0 mt-4 ml-3 text-gray-400" />
      </div>
      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-600">No notes found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {editNoteId === note._id ? (
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4 sm:mb-0"
                  />
                ) : (
                  note.title
                )}
                <div className="flex flex-wrap items-center mt-2 sm:mt-0">
                  <button
                    onClick={() =>
                      editNoteId === note._id
                        ? handleUpdateClick(note._id)
                        : handleEditClick(note)
                    }
                    className="bg-blue-500 text-white rounded-lg px-9 py-1 hover:bg-blue-600 transition ml-2 mb-2 sm:mb-0"
                  >
                    {editNoteId === note._id ? (
                      <>
                        <FaSave className=" mr-1" />
                        Save
                      </>
                    ) : (
                      <>
                        <FaEdit className=" mr-1" />
                        Edit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(note)}
                    className="bg-blue-500 text-white rounded-lg px-3 py-1 hover:bg-blue-600 transition ml-2 mb-2 sm:mb-0"
                  >
                    <FaDownload className=" mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteClick(note._id)}
                    className="bg-red-500 text-white rounded-lg px-4 py-1 mb-2 lg:mb-[0.2rem] hover:bg-red-600 transition ml-2"
                  >
                    <FaTrash className=" mr-1" />
                    Delete
                  </button>
                </div>
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotes;
