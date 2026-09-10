import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './showcase/Layout';
import { ComponentRoute } from './pages/ComponentRoute';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="c/:slug" element={<ComponentRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
