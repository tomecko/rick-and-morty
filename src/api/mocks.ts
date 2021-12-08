import { MockedResponse } from "@apollo/client/testing";

import { CHARACTERS, CHARACTER, CharactersDTO, CharacterDTO } from "./queries";

const getMockCharacters = (
  count: number,
  initial: number = 0
): CharactersDTO["characters"]["results"] =>
  Array.from(Array(count).keys())
    .map((i) => i + initial)
    .map((i) => ({
      id: String(i),
      name: `Some Name ${i}`,
      image: `imageURL${i}`,
    }));

export const charactersMockedResponsePage1: MockedResponse<CharactersDTO> = {
  request: {
    query: CHARACTERS,
    variables: {
      page: 1,
    },
  },
  result: {
    data: {
      characters: {
        info: {
          count: 30,
          next: 2,
          pages: 2,
          prev: null,
        },
        results: getMockCharacters(20),
      },
    },
  },
};

export const charactersMockedResponsePage2: MockedResponse<CharactersDTO> = {
  request: {
    query: CHARACTERS,
    variables: {
      page: 2,
    },
  },
  result: {
    data: {
      characters: {
        info: {
          count: 30,
          next: null,
          pages: 2,
          prev: 1,
        },
        results: getMockCharacters(10, 20),
      },
    },
  },
};

export const getCharacterMockedResponse = (
  id: string
): MockedResponse<CharacterDTO> => ({
  request: {
    query: CHARACTER,
    variables: {
      id,
    },
  },
  result: {
    data: {
      character: {
        name: `Some Name ${id}`,
        status: "Some Status",
        species: "Some Species",
        gender: "Some Gender",
        image: "SomeImageURL",
        origin: {
          name: "Some Origin Name",
        },
        location: {
          name: "Some Location Name",
        },
        episode: [{ name: "a" }, { name: "b" }, { name: "c" }],
      },
    },
  },
});
