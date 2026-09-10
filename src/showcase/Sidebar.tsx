import { NavLink } from 'react-router-dom';
import { ALL_COMPONENTS, GROUPS, READY_COUNT } from '../registry';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <NavLink to="/" className="sidebar-brand-title">
          Base UI Showroom
        </NavLink>
        <p className="sidebar-brand-meta">
          {ALL_COMPONENTS.length} components · {READY_COUNT} built · 3 themes
        </p>
      </div>

      <nav className="sidebar-scroll" aria-label="Components">
        {GROUPS.map((group) => (
          <div className="sidebar-group" key={group.label}>
            <p className="sidebar-group-label">{group.label}</p>
            {group.items.map((item) => (
              <NavLink key={item.slug} to={`/c/${item.slug}`} className="sidebar-link">
                {item.name}
                {item.status === 'planned' && <span className="sidebar-link-flag">soon</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
