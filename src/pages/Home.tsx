import React from "react";
import { randomCharacters, themeCards, recommendedCharacters } from "../data/sampleData";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    
    <div className="bg-[#050C36] min-h-screen text-white px-4 py-6">
        <Navbar />
        
      {/* 상단: 랜덤 캐릭터 이미지 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">오늘의 캐릭터</h2>
        <div className="flex gap-3 overflow-x-auto">
          {randomCharacters.map((char) => (
            <img
              key={char.id}
              src={char.image}
              alt={char.name}
              className="w-32 h-40 object-cover rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </section>

      {/* 추천 테마 카드 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">추천 테마</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeCards.map((theme) => (
            <div key={theme.id} className="relative rounded-xl overflow-hidden shadow-md">
              <img src={theme.image} alt={theme.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-lg font-semibold">{theme.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 캐릭터 리스트 */}
      <section>
        <h2 className="text-xl font-bold mb-2">추천 캐릭터</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedCharacters.map((char) => (
            <div key={char.id} className="bg-white text-black rounded-xl p-3 shadow">
              <img src={char.image} alt={char.name} className="w-full h-40 object-cover rounded-md mb-2" />
              <div>
                <h3 className="text-lg font-semibold">{char.name}</h3>
                <p className="text-sm text-gray-700">{char.anime}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
