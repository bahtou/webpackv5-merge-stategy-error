import './index.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const LazyHome = lazy(() => import(/* webpackChunkName: "home" */ './pages/home'));
const LazyAbout = lazy(() => import(/* webpackChunkName: "about" */ './pages/about'));

function Website() {
  return (
    <main>
      <h1>Something good here! {new Date().toLocaleDateString()}</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LazyHome />} />
          <Route path="about" element={<LazyAbout />} />
        </Routes>
      </Suspense>

    </main>
  );
}


createRoot(document.querySelector('#react-entry') as HTMLElement)
  .render(
    <StrictMode>
      <BrowserRouter>
        <Website />
      </BrowserRouter>
    </StrictMode>
  );
