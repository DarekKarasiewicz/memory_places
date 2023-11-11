import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { initialize } from "@googlemaps/jest-mocks";
import {
  APILoadingStatus,
  APIProviderContext,
} from "@vis.gl/react-google-maps";
import "@testing-library/jest-dom";

import GoogleMap from "../GoogleMap/GoogleMap";

let mockContextValue;
let wrapper;

beforeEach(() => {
  initialize();

  const setStateMock = jest.fn();
  const useStateMock = (useState) => [useState, setStateMock];
  jest.spyOn(React, "useEffect").mockImplementation(useStateMock);

  mockContextValue = {
    importLibrary: jest.fn(),
    loadedLibraries: {},
    status: APILoadingStatus.LOADED,
    mapInstances: {},
    addMapInstance: jest.fn(),
    removeMapInstance: jest.fn(),
    clearMapInstances: jest.fn(),
  };

  wrapper = ({ children }) =>
    React.createElement(
      APIProviderContext.Provider,
      { value: mockContextValue },
      children
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

it("when Api isn't loaded should display loading", () => {
  mockContextValue.status = APILoadingStatus.LOADING;
  render(<GoogleMap />, { wrapper });
  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

it("when Api is loaded should display map", async () => {
  mockContextValue.status = APILoadingStatus.LOADED;
  render(<GoogleMap />, { wrapper });
  const data = await waitFor(() => screen.findByTestId("map"));
  expect(data).toBeTruthy();
});
