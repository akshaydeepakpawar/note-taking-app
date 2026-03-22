"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes || []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        // ✅ Update UI instantly
        setNotes((prev) => [result.data, ...prev]);
        toast.success("Note created successfully!");
        // ✅ Clear inputs
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    //remove from UI instantly
    setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted successfully!")
  };

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-gray-800 text-xl font-semibold mb-4">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">
            no notes yet. create your first notes above
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <div className="flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-3 py-1 rounded-lg hover:cursor-pointer font-semibold">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-sm text-white px-3 py-1 rounded-lg hover:cursor-pointer font-semibold
                    "
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(note.createdAt).toLocaleDateString("en-IN")}
              </p>
              {note.createAt !== note.updateAt && (
                <p className="text-sm text-gray-500">
                  Updated:{" "}
                  {new Date(note.updatedAt).toLocaleDateString("en-IN")}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
