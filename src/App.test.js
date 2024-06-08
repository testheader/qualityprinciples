import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import React from "react";
import {BrowserRouter} from "react-router-dom";

test('verify default components are present', () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  const homeComponent = screen.getByTestId("homeComponent")
  const footerComponent = screen.getByTestId("footerComponent")

  expect(homeComponent).toBeInTheDocument();
  expect(footerComponent).toBeInTheDocument();
});

test('overview button is hidden then shown', async () => {
  render(<BrowserRouter><App/></BrowserRouter>)
  let overviewButton = screen.queryByTestId("overviewButton")
  expect(overviewButton).not.toBeInTheDocument();

  let showOverview = screen.getByTestId("showOverview")
  await fireEvent.click(showOverview)

  overviewButton = screen.queryByTestId("overviewButton")
  expect(overviewButton).toBeInTheDocument();
});

