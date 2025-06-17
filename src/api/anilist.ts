export type Character = {
  id: number;
  name: string;
  anime: string;
  image: string;
  appearance: string;
  voiceActor: string;
  coverImage: string;
  traits: string[];
};

// ✅ 캐릭터 후보 목록 가져오기
export const fetchCharacterCandidates = async (name: string): Promise<Character[]> => {
  const query = `
    query ($name: String) {
      Page(perPage: 5) {
        characters(search: $name) {
          id
          name {
            full
          }
          image {
            large
          }
          media(type: ANIME, perPage: 1) {
            nodes {
              title {
                romaji
              }
              coverImage {
                large
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { name } }),
  });

  const json = await res.json();
  console.log("📥 응답 결과 전체:", json);
  const rawList = json?.data?.Page?.characters ?? [];

  return rawList.map((raw: any) => ({
    id: raw.id,
    name: raw.name.full,
    anime: raw.media?.nodes?.[0]?.title?.romaji ?? "정보 없음",
    image: raw.image.large,
    appearance: "설명 없음",
    voiceActor: "미상",
    coverImage: raw.media?.nodes?.[0]?.coverImage?.large ?? raw.image.large,
    traits: [],
  }));
};
