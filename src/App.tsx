import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GachaPage } from "./pages/GachaPage";
import { ResultPage } from "./pages/ResultPage";
import { Toaster } from "./components/ui/toaster";
import { GachaProvider } from "./contexts/gacha";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <GachaProvider>
      <Router>
        <div className="h-[100svh] w-screen flex flex-col overflow-hidden bg-red-600 ">
          <div className="flex-1 flex items-center justify-center overflow-auto">
            <div className="w-full max-w-md mx-auto">
              <Routes>
                <Route path="/" element={<GachaPage />} />
                <Route path="/result" element={<ResultPage />} />
              </Routes>
            </div>
          </div>
          <Footer className="h-[2rem]" />
          <Toaster />
        </div>
      </Router>
    </GachaProvider>
  );
}
