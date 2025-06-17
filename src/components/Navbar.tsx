import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      setInput("");
    }
  };

  return (
    <nav className="bg-[#050C36] text-white px-6 py-3 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold">AniType</h1>

      {/* 🔍 검색창 */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="이름, 특징 등 검색"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-3 py-1 rounded text-black w-48 sm:w-64"
        />
        <button
          type="submit"
          className="p-1 text-white hover:text-blue-400"
        >
          <Search size={20} />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
