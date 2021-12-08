import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import { getCharacterMockedResponse } from "../../api/mocks";

import { Character } from "./Character";

const mocks = [getCharacterMockedResponse("2")];

describe("Character", () => {
  it("renders without error", async () => {
    // Given
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Character id="2" />
      </MockedProvider>
    );

    // When
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Some Name 2");
    screen.getByText("Some Status");
    screen.getByText("Some Species");
    screen.getByText("Some Gender");
    screen.getByText("Some Origin Name");
    screen.getByText("Some Location Name");

    screen.getByAltText("Some Name 2");
    const image = document.querySelector("img") as HTMLImageElement;
    expect(image.src).toContain("SomeImageURL");

    const episodesEl = screen.getByText(
      "Number of episodes appearances"
    ).parentElement;
    expect(episodesEl?.textContent?.endsWith("3")).toBe(true);
  });

  it("renders loading state", async () => {
    // Given
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Character id="2" />
      </MockedProvider>
    );

    // Then
    screen.getByText("Loading…");
  });
});
