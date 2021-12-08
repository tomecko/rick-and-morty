import { gql } from "@apollo/client";

export interface CharactersDTO {
  characters: {
    info: {
      count: number;
      next: number | null;
      pages: number;
      prev: number | null;
    };
    results: {
      id: string;
      image: string;
      name: string;
    }[];
  };
}

export interface CharactersVariables {
  page: number;
}

export const CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        image
        name
      }
    }
  }
`;

export interface CharacterDTO {
  character: {
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    episode: { name: string }[];
  };
}

export interface CharacterVariables {
  id: string;
}

export const CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
      }
    }
  }
`;

// TODO: check if this can be combined with `CHARACTERS`
export const CHARACTER_FRAGMENT = gql`
  fragment MyCharacter on Character {
    image
    name
  }
`;
