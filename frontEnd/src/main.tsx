import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "@/storeReducer/store";
import GlobalStyles from "./styles/GlobalStyle";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider, ToasterDisplay } from "./components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // cacheTime: 5 * 60 * 1000, // Time remove state out of cache
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ToasterDisplay />
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
