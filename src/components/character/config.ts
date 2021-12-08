import { CharacterDTO } from "../../api/queries";

export const CHARACTER_INFO_LIST_CONFIG: {
  label: string;
  getValue: (character: CharacterDTO["character"]) => string;
}[] = [
  {
    label: "Status",
    getValue: ({ status }) => status,
  },
  {
    label: "Species",
    getValue: ({ species }) => species,
  },
  {
    label: "Gender",
    getValue: ({ gender }) => gender,
  },
  {
    label: "Origin",
    getValue: ({ origin }) => origin.name,
  },
  {
    label: "Last known location",
    getValue: ({ location }) => location.name,
  },
  {
    label: "Number of episodes appearances",
    getValue: ({ episode }) => String(episode.length),
  },
];
