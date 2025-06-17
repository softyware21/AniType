// src/components/SimilarCharactersModal.tsx

type Character = {
  id: number;
  name: string;
  anime: string;
  image: string;
  appearance: string;
  voiceActor: string;
  coverImage: string;
  traits: string[];
};

interface Props {
  character: Character;
  allCharacters: Character[];
  mode: "traits" | "appearance";
  onClose: () => void;
  onBack: () => void; // ✅ 뒤로가기 추가
}

function calculateScore(a: string, b: string) {
  const setA = new Set(a.split(" "));
  const setB = new Set(b.split(" "));
  const common = [...setA].filter(x => setB.has(x));
  return common.length;
}

function calculateTraitScore(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  const common = [...setA].filter(x => setB.has(x));
  return common.length;
}

const SimilarCharactersModal: React.FC<Props> = ({ character, allCharacters, mode, onClose, onBack }) => {
  const similar = allCharacters
    .filter(c => c.id !== character.id)
    .map(c => {
      const score =
        mode === "traits"
          ? calculateTraitScore(character.traits, c.traits)
          : calculateScore(character.appearance, c.appearance);
      return { ...c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const maxScore = similar.length > 0 ? similar[0].score : 1;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-3xl relative">
        {/* 닫기 및 뒤로가기 */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 text-2xl">×</button>
        <button onClick={onBack} className="absolute top-3 left-4 text-sm text-gray-500 hover:text-gray-800">← 뒤로가기</button>

        <h2 className="text-xl font-bold mb-6 text-center">
          {mode === "traits" ? "성격이 비슷한 캐릭터" : "외모가 비슷한 캐릭터"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {similar.map(c => (
            <div key={c.id} className="border p-4 rounded-lg shadow flex items-center gap-4">
              {/* 캐릭터 이미지 */}
              <img src={c.image} alt={c.name} className="w-16 h-16 object-cover rounded-full" />
              
              {/* 정보 */}
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">
                  {mode === "traits" ? c.traits.join(", ") : c.appearance}
                </div>
                {/* 유사도 점수 + 바 */}
                <div className="text-xs text-blue-500 mt-1">유사도 점수: {c.score}</div>
                <div className="h-2 w-full bg-gray-200 rounded mt-1">
                  <div
                    className="h-full bg-blue-400 rounded"
                    style={{ width: `${(c.score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarCharactersModal;