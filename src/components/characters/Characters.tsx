import { ApolloClient, ApolloQueryResult, useQuery } from "@apollo/client";
import React, { useCallback, useEffect } from "react";
import { Link as WouterLink } from "wouter";

import {
  CHARACTERS,
  CharactersDTO,
  CharactersVariables,
} from "../../api/queries";
import { store } from "../../store";
import { preloadImage } from "../../shared/util/preload-image";

import { Pagination } from "./Pagination";
import styles from "./Characters.module.scss";

// TODO: compute it from backend data, do not hard code it
const ITEMS_PER_PAGE = 20;

interface Props {
  page: number;
}

const usePrefetchSiblingPages = (
  data: CharactersDTO | undefined,
  client: ApolloClient<any>
) => {
  const prefetch = useCallback(
    (prevOrNext: "prev" | "next") => {
      if (data?.characters.info[prevOrNext]) {
        client
          .query({
            query: CHARACTERS,
            variables: { page: data.characters.info[prevOrNext] },
          })
          .then(({ data }: ApolloQueryResult<CharactersDTO>) => {
            data.characters.results
              .map(({ image }) => image)
              .forEach(preloadImage);
          });
      }
    },
    [data, client]
  );
  useEffect(() => {
    prefetch("prev");
    prefetch("next");
  }, [client, data, prefetch]);
};

const useScrollToTop = (page: number) => {
  useEffect(() => window.scrollTo(0, 0), [page]);
};

export function Characters(props: Props) {
  store.lastVisitedPage = props.page;

  const { loading, error, data, client } = useQuery<
    CharactersDTO,
    CharactersVariables
  >(CHARACTERS, {
    variables: {
      page: props.page,
    },
  });

  usePrefetchSiblingPages(data, client);
  useScrollToTop(props.page);

  // TODO: consider splitting into smaller components
  return (
    <>
      <h2>
        Characters {data && <small>({data.characters.info.count})</small>}
      </h2>
      {error && <p>Error!</p>}
      {loading && (
        <ul className={styles.charactersList}>
          {Array.from(Array(ITEMS_PER_PAGE).keys()).map((i) => (
            <li
              key={i}
              className={styles.emptyCharacter}
              aria-label="loading character item"
            ></li>
          ))}
        </ul>
      )}
      {data && (
        <>
          {props.page > 1 && (
            <Pagination
              data={data}
              page={props.page}
              className={styles.topNavigation}
            />
          )}
          <ul className={styles.charactersList}>
            {data.characters.results.map((character) => (
              <li key={character.id} className={styles.character}>
                <WouterLink
                  href={`/character/${character.id}`}
                  className={styles.characterLink}
                >
                  <img
                    src={character.image}
                    height="50"
                    width="50"
                    alt={character.name}
                    className={styles.characterImage}
                  />
                  <p className={styles.characterName}>{character.name}</p>
                </WouterLink>
              </li>
            ))}
          </ul>
          <Pagination data={data} page={props.page} />
        </>
      )}
      {!loading && !error && !data && <p>No data :(</p>}
    </>
  );
}

Characters.defaultProps = {
  page: 1,
};
