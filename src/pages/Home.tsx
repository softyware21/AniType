import React from "react";
import { randomCharacters, themeCards, recommendedCharacters } from "../data/sampleData";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
        <Navbar />
        {/* Hero Section */}
        <section className="w-full h-[500px] relative text-white custom-gradient">
            <div className="max-w-5xl mx-auto px-4 pt-20 text-center">
                <h2 className="text-3xl font-bold leading-snug">
                내 취향의 애니메이션 캐릭터를 찾아보세요.
                </h2>
                <p className="mt-3 text-base text-gray-300">
                캐릭터의 이름, 특징, 성격 키워드 등으로 검색할 수 있어요.
                </p>

                {/* 캐릭터 오버레이 이미지 */}
                <div className="mt-10 flex justify-center gap-4">
                {randomCharacters.map((char) => (
                    <img
                    key={char.id}
                    src={char.image}
                    alt={char.name}
                    className="w-24 h-32 object-cover rounded-xl border-2 border-white shadow-lg"
                    />
                ))}
                </div>
            </div>
        </section>


      {/* 추천 테마 */}
      <section className="bg-white text-[#050C36] px-4 py-10">
        <h2 className="text-xl font-bold mb-2">추천 테마</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeCards.map((theme) => (
            <div
              key={theme.id}
              className="relative rounded-xl overflow-hidden shadow-md border border-black"
            >
              <img
                src={theme.image}
                alt={theme.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-lg font-semibold">{theme.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 캐릭터 */}
        <section className="bg-white text-[#050C36] px-4 py-10">
            <h2 className="text-xl font-bold mb-2">추천 캐릭터</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {recommendedCharacters.map((char) => (
                <Link to={`/character/${char.id}`} key={char.id}>
                    <div className="bg-white text-black rounded-xl p-3 shadow border border-black w-[220px] hover:shadow-lg transition">
                    <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">{char.name}</h3>
                        <p className="text-sm text-gray-700">{char.anime}</p>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
        </section>
    </>
  );
};

export default Home;