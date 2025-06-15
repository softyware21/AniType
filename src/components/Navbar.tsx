import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#050C36] px-4 py-3 flex items-center justify-between border-b border-white/10">
      {/* 로고 */}
      <div className="text-white text-2xl font-bold">AniType</div>

      {/* 검색창 */}
      <div className="relative w-1/2 max-w-md">
        <input
          type="text"
          placeholder="캐릭터 이름으로 검색하세요"
          className="w-full rounded-lg px-4 py-2 text-black focus:outline-none"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          🔍
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
