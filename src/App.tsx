import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GachaPage } from "./pages/GachaPage";
import { ResultPage } from "./pages/ResultPage";
import { Toaster } from "./components/ui/toaster";
import { GachaProvider } from "./contexts/gacha";

export function App() {
  return (
    <GachaProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
          <Routes>
            <Route path="/" element={<GachaPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </GachaProvider>
  );
}
