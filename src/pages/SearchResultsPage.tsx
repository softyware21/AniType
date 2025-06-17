import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCharacterCandidates } from "../api/anilist";
import { Character } from "../types/Character";
import CharacterModal from "../components/CharacterModal";
import Navbar from "../components/Navbar";

const availableTraits = [
  "차분함", "활발함", "냉정함", "상냥함", "열정적", "쿨함",
  "소심함", "강직함", "정의로움", "도도함", "츤데레"
];

const SearchResultsPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";
  const mode = params.get("mode") || "default";

  const [results, setResults] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTrait, setActiveTrait] = useState<string | null>(null);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      const found = await fetchCharacterCandidates(query);
      setResults(found);
      setLoading(false);
    };
    if (query) search();
  }, [query]);

  const filterBy = (key: keyof Character, matchExact: boolean = false) =>
    results.filter((c) => {
      const raw = c[key];
      if (typeof raw === "string") {
        const value = raw.toLowerCase();
        return matchExact ? value.includes(query) : value.indexOf(query) >= 0;
      }
      return false;
    });

  const traitMatches = results.filter((c) =>
    c.traits.some((t) => t.toLowerCase().includes(query))
  );

  const nameMatches = filterBy("name", true);
  const animeMatches = filterBy("anime");
  const appearanceMatches = filterBy("appearance");

  const combined = [
    ...nameMatches,
    ...traitMatches,
    ...animeMatches,
    ...appearanceMatches,
  ];

  const uniqueResults = Array.from(
    new Map(combined.map((c) => [c.id, c])).values()
  );

  const filteredResults = activeTrait
    ? uniqueResults.filter((c) => c.traits.includes(activeTrait))
    : uniqueResults;

  const renderSection = (title: string, characters: Character[]) =>
    characters.length > 0 && (
      <section className="mb-10">
        <h3 className="text-lg font-bold mt-10 mb-4 border-b border-white/20 pb-1">
          {title} ({characters.length}명)
        </h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {characters.map((char) => (
            <div
              key={char.id}
              className="w-[200px] cursor-pointer bg-[#1f1f2b] rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-400 shadow-md"
              onClick={() => setSelected(char)}
            >
              <div className="relative">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">캐릭터</span>
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold truncate">{char.name}</h3>
                <p className="text-xs text-gray-300 truncate">{char.anime}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <div className="min-h-screen bg-[#050C36] text-white font-sans">
      <Navbar />

      <div className="px-4 py-10">
        <h2 className="text-xl font-bold pb-2 mb-6 border-b border-white/20">
          "{query}" 검색 결과
        </h2>

        {mode === "default" && (
          <>
            {/* 필터 UI */}
            <div className="flex flex-wrap gap-2 mb-8">
              {availableTraits.map((trait) => (
                <button
                  key={trait}
                  onClick={() =>
                    setActiveTrait((prev) => (prev === trait ? null : trait))
                  }
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    trait === activeTrait
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-white text-white hover:bg-white hover:text-[#050C36]"
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-sm text-gray-300">검색 중입니다...</p>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {filteredResults.map((char) => (
                  <div
                    key={char.id}
                    className="w-[200px] cursor-pointer bg-[#1f1f2b] rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-400 shadow-md"
                    onClick={() => setSelected(char)}
                  >
                    <div className="relative">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-40 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">캐릭터</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-base font-semibold truncate">{char.name}</h3>
                      <p className="text-xs text-gray-300 truncate">{char.anime}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {mode === "related" && (
          <>
            {renderSection("이름이 비슷한 캐릭터", nameMatches)}
            {renderSection("성격이 비슷한 캐릭터", traitMatches)}
            {renderSection("외모가 비슷한 캐릭터", appearanceMatches)}
          </>
        )}

        {/* 모달 */}
        {selected && (
          <CharacterModal
            character={selected}
            onClose={() => setSelected(null)}
            allCharacters={results}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;