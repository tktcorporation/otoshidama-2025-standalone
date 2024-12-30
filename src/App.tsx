import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GachaPage } from './pages/GachaPage';
import { ResultPage } from './pages/ResultPage';
import { Toaster } from './components/ui/toaster';
import { useState } from 'react';
import { GachaContext, type GachaResult } from './contexts/gacha';

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