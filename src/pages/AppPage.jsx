import React from "react";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Save, XCircle } from "lucide-react";
import axios from "axios";

const AppPage = () => {
  const [text, setText] = useState("");

  const [quotes, setQuotes] = useState([
    { _id: "1", text: "Be yourself' everyone else is already taken." },
    {
      _id: "2",
      text: "Life is what happens when you're busy making other plans.",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const getQuotes = async () => {
    // Fetch quotes from the server or database
    // For now, we are using static data
    const res = await axios.get("https://newcompuss-back.onrender.com/api/quotes");
    setQuotes(res.data);
  };

  const handleAdd = async () => {
    if (!text.trim()) {
      alert("Please enter a quote");
      return;
    } else {
      await axios.post("https://newcompuss-back.onrender.com/api/quotes", { text });
      setText("");
      getQuotes();
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      try {
        await axios.delete(`https://newcompuss-back.onrender.com/api/quotes/${id}`);
        getQuotes();
      } catch (error) {
        console.error("Error deleting quote:", error);
      }
    }
  };

  const handilEdit = async () => {
    if (!editingText.trim()) {
      alert("Please enter a quote");
      return;
    } else {
      await axios.put(`https://newcompuss-back.onrender.com/api/quotes/${editingId}`, {
        text: editingText,
      });
      setEditingId(null);
      setEditingText("");
      getQuotes();
    }
  };

  const handlecancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-12 gap-6 md:px-10">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-[#6F36E8]">
        My Quotes App
      </h1>

      {/* create form */}

      <div className="max-w-xl max-auto flex gap-4 mb-10 mx-auto">
        <input
          type="text"
          placeholder="Type your Quotes..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-[#6F36E8] text-white px-6 py-2 rounded-md hover:bg-[#5c2ec4]"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Quotes List */}

      <div className="max-w-2xl mx-auto space-y-4">
        {Array.isArray(quotes) &&
          quotes.map((q) => (
            <div
              key={q._id}
              className="flex justify-between items-center bg-white p-2 rounded-md shadow-md"
            >
              {editingId == q._id ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center
              gap-1"
                      onClick={handilEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-400 text-white px-3 py-2 rounded-md flex items-center gap-1"
                      onClick={handlecancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full bg-white p-2 rounded-md">
                  <p className="text-lg md:text-md text-gray-800">{q.text}</p>
                  <div className="flex gap-6 ml-4">
                    <button
                      className="text-[#6F36E8]px-4 py-2 rounded-md hover:text-[#5c2ec4]"
                      onClick={() => startEdit(q._id, q.text)}
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    <button
                      className="text-red-500 px-4 py-2 rounded-md hover:text-red-600"
                      onClick={() => handleDelete(q._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppPage;
