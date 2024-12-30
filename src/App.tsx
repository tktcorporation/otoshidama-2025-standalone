import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GachaPage } from '@/pages/GachaPage';
import { ResultPage } from '@/pages/ResultPage';
import { Toaster } from '@/components/ui/toaster';
import { createContext, useState } from 'react';

export interface GachaResult {
  playerName: string;
  amount: number;
}

export const GachaContext = createContext<{
  result: GachaResult | null;
  setResult: (result: GachaResult | null) => void;
}>({
  result: null,
  setResult: () => {},
});

function App() {
  const [result, setResult] = useState<GachaResult | null>(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <GachaPage />,
    },
    {
      path: '/result',
      element: <ResultPage />,
    },
  ]);

  return (
    <GachaContext.Provider value={{ result, setResult }}>
      <div className="w-screen">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </GachaContext.Provider>
  );
}

export default App;