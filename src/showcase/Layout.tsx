import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

export function Layout() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Toolbar />
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
