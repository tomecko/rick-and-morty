import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import {
  charactersMockedResponsePage1,
  charactersMockedResponsePage2,
  getCharacterMockedResponse,
} from "../api/mocks";

import { App } from "./App";

const mocks = [
  charactersMockedResponsePage1,
  charactersMockedResponsePage2,
  getCharacterMockedResponse("22"),
];

global.scrollTo = jest.fn();

// TODO: consider creating helper functions to make tests more concise
describe("App", () => {
  it("renders headings without error", () => {
    // Given
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Then
    screen.getByText("Rick and Morty");
    screen.getByText("Characters");
  });

  it("renders loading state", () => {
    // Given
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Then
    expect(screen.getAllByLabelText("loading character item")).toHaveLength(20);
  });

  it("renders success state", async () => {
    // Given
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // When
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    for (let i = 0; i < 20; i++) {
      screen.getByText(`Some Name ${i}`);
    }
  });

  it("renders error state", async () => {
    // Given
    const errorMocks = mocks.map((mock) => ({
      request: mock.request,
      error: new Error("An error occurred"),
    }));
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // When
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Error!");
  });

  it("allows navigating between pages", async () => {
    // Given
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // When
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Page 1 of 2");
    expect(
      screen.getByText("prev").closest("a")?.classList.contains("disabled")
    ).toBe(true);

    // When navigating to 2nd page
    screen.getByText("next").click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then new characters should be displayed
    screen.getAllByText("Page 2 of 2");
    for (let i = 20; i < 30; i++) {
      screen.getByText(`Some Name ${i}`);
    }
    screen
      .getAllByText("next")
      .map((el) => el.closest("a"))
      .forEach((el) => expect(el?.classList.contains("disabled")).toBe(true));

    // When navigating back to 1st page
    screen.getAllByText("prev")[0].click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Page 1 of 2");
    for (let i = 0; i < 20; i++) {
      screen.getByText(`Some Name ${i}`);
    }
  });

  it("allows navigating to Character details page and back", async () => {
    // Given
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // When navigating to 2nd page
    await new Promise((resolve) => setTimeout(resolve, 0));
    screen.getByText("next").click();

    // When entering Character details page
    await new Promise((resolve) => setTimeout(resolve, 0));
    screen.getByText("Some Name 22").click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Loading…");

    // When data arrives
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then
    screen.getByText("Some Name 22");

    // When back button is clicked
    screen.getByText("back").click();

    // Then 2nd page is displayed (not the 1st one)
    screen.getAllByText("Page 2 of 2");
  });
});
