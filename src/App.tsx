import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GachaPage } from "./pages/GachaPage";
import { ResultPage } from "./pages/ResultPage";
import { Toaster } from "./components/ui/toaster";
import { useState } from "react";
import { GachaContext, type GachaResult } from "./contexts/gacha";
import { Footer } from "./components/Footer";

function App() {
  const [result, setResult] = useState<GachaResult | null>(null);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <GachaPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    }
  );

  return (
    <GachaContext.Provider value={{ result, setResult }}>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-red-700">
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-md mx-auto">
            <RouterProvider router={router} />
          </div>
        </div>
        <Footer className="h-[2rem]" />
        <Toaster />
      </div>
    </GachaContext.Provider>
  );
}

export default App;
