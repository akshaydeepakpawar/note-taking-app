"use client";

import React, { useState } from "react";

const NotesClient = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote=async(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()) return ;
    setLoading(true);
    try {
        const response=await fetch("/api/notes",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({title,content})
        })
        const result=await response.json();
        console.log(result);
        setLoading(false);
    } catch (error) {
        console.error("Error creating note:",error)
    }
  }

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
    </div>
  );
};

export default NotesClient;
