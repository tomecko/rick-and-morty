import { useQuery } from "@apollo/client";
import React from "react";

import {
  CHARACTER,
  CHARACTER_FRAGMENT,
  CharacterDTO,
  CharacterVariables,
} from "../../api/queries";
import { Link } from "../../shared/components/Link";
import { store } from "../../store";

import { CHARACTER_INFO_LIST_CONFIG } from "./config";
import styles from "./Character.module.scss";

interface Props {
  id: string;
}

export function Character(props: Props) {
  return (
    <>
      <BackLink />
      <CharacterInfo {...props} />
    </>
  );
}

function BackLink() {
  return store.lastVisitedPage ? (
    <Link className={styles.back} href={`/page/${store.lastVisitedPage}`}>
      back
    </Link>
  ) : null;
}

function CharacterInfo(props: Props) {
  const { loading, error, data, client } = useQuery<
    CharacterDTO,
    CharacterVariables
  >(CHARACTER, {
    variables: {
      id: props.id,
    },
  });

  // Trying to reuse cached Character data
  // so a user can read Character name heading and image immediately
  const partialCharacter = client.readFragment({
    id: `Character:${props.id}`,
    fragment: CHARACTER_FRAGMENT,
  });

  if (!partialCharacter) {
    if (loading) {
      return <p>Loading…</p>;
    }

    if (error) {
      return <p>Error!</p>;
    }

    if (!data) {
      return <p>No data :(</p>;
    }
  }

  const character = {
    ...partialCharacter,
    ...data?.character,
  };

  return (
    <div className={styles.characterInfoWrapper}>
      <img
        className={styles.characterInfoImage}
        src={character.image}
        height="300"
        width="300"
        alt={character.name}
      />
      <div className={styles.characterInfo}>
        <h2>{character.name}</h2>
        {data?.character && (
          <ul>
            {CHARACTER_INFO_LIST_CONFIG.map(({ label, getValue }) => (
              <li className={styles.infoItem} key={label}>
                <strong className={styles.label}>{label}</strong>
                {getValue(character) ?? "N/A"}
              </li>
            ))}
          </ul>
        )}
        {loading && <p>Loading…</p>}
        {error && <p>Error!</p>}
      </div>
    </div>
  );
}
