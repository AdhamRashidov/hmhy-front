import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./hooks/use-auth.tsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // Boshqa tabdan qaytganda qayta yuklamasligi uchun.
    },
  },
});

const GOOGLE_CLIENT_ID =
  "101776018039-3mnitje8helt8q725qovul9f84l3k8of.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
