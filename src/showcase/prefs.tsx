import * as React from 'react';

export const THEMES = ['light', 'dark', 'contrast'] as const;
export const SIZES = ['sm', 'md', 'lg'] as const;

export type Theme = (typeof THEMES)[number];
export type Size = (typeof SIZES)[number];

interface Prefs {
  theme: Theme;
  size: Size;
  setTheme: (theme: Theme) => void;
  setSize: (size: Size) => void;
}

const PrefsContext = React.createContext<Prefs | null>(null);

const STORAGE_KEY = 'showroom.prefs';

function readStored(): { theme?: Theme; size?: Size } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { theme?: Theme; size?: Size }) : {};
  } catch {
    return {};
  }
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const stored = readStored().theme;
    return stored && THEMES.includes(stored) ? stored : 'light';
  });
  const [size, setSize] = React.useState<Size>(() => {
    const stored = readStored().size;
    return stored && SIZES.includes(stored) ? stored : 'md';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.size = size;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, size }));
    } catch {
      // Storage can be unavailable (private mode, blocked site data). The
      // preference still applies for this session.
    }
  }, [theme, size]);

  const value = React.useMemo(
    () => ({ theme, size, setTheme, setSize }),
    [theme, size],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): Prefs {
  const context = React.useContext(PrefsContext);
  if (!context) {
    throw new Error('usePrefs must be used inside <PrefsProvider>');
  }
  return context;
}
