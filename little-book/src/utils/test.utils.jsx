import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import ThemeContextProvider from "../contexts/theme.context";
import blogSlice from "../store/slices/blogSlice";
import { THEME } from "../constants";

const customRender = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { blogs: blogSlice.reducer },
      preloadedState,
    }),
    theme = THEME.light,
    ...options
  } = {}
) => {
  const ProviderWrapper = ({ children }) => {
    return (
      <ThemeContextProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeContextProvider>
    );
  };
  return render(ui, { wrapper: ProviderWrapper, ...options });
};

const customCreateSnapshot = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { blogs: blogSlice.reducer },
      preloadedState,
    }),
    theme = THEME.light,
  } = {}
) => {
  const ProviderWrapper = ({ children }) => {
    return (
      <ThemeContextProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeContextProvider>
    );
  };
  return renderer.create(<ProviderWrapper>{ui}</ProviderWrapper>).toJSON();
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render, customCreateSnapshot as createSnapshot };
