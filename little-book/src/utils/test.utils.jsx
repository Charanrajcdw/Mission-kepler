import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import ThemeContextProvider from "../contexts/theme.context";
import blogSlice from "../store/slices/blogSlice";

const customRender = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { blogs: blogSlice.reducer },
      preloadedState,
    }),
    ...options
  } = {}
) => {
  const ProviderWrapper = ({ children }) => {
    return (
      <ThemeContextProvider theme="light">
        <Provider store={store}>{children}</Provider>
      </ThemeContextProvider>
    );
  };
  return render(ui, { wrapper: ProviderWrapper, ...options });
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
