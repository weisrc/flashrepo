import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./components/AppContextProvider";
import { Toaster } from "@/components/ui/sonner";

if (!import.meta.env.DEV) {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
}

async function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </AppContextProvider>,
  );
}

void bootstrap();
