// src/components/CharacterModal.tsx
import React from "react";

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
  onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl relative flex overflow-hidden">
        {/* 왼쪽: 애니 커버 이미지 */}
        <div className="w-1/2 bg-gray-100">
          <img
            src={character.coverImage}
            alt="anime cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽: 캐릭터 정보 */}
        <div className="w-1/2 p-6 text-[#050C36]">
          <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
          <p className="text-sm mb-1">출연작: {character.anime}</p>
          <p className="text-sm mb-1">성우: {character.voiceActor}</p>
          <p className="text-sm mb-1">외모: {character.appearance}</p>
          <p className="text-sm mb-4">
            성격: {character.traits.join(", ")}
          </p>

          <div className="flex gap-2 mt-4">
            <button className="bg-blue-100 text-blue-900 px-3 py-1 rounded shadow text-sm">
              성격이 비슷한 캐릭터 찾기
            </button>
            <button className="bg-green-100 text-green-900 px-3 py-1 rounded shadow text-sm">
              외모가 비슷한 캐릭터 찾기
            </button>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CharacterModal;