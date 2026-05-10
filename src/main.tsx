import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./components/AppContextProvider";
import { Toaster } from "@/components/ui/sonner";

document.documentElement.classList.add("dark");

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
