import * as React from 'react';

type IconProps = React.ComponentProps<'svg'>;

function icon(path: React.ReactNode, extra?: Partial<IconProps>) {
  return function Icon(props: IconProps) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...extra}
        {...props}
        style={{ display: 'block', ...props.style }}
      >
        {path}
      </svg>
    );
  };
}

export const PlusIcon = icon(<path d="M2.75 8h10.5M8 13.25V2.75" />);
export const CaretIcon = icon(<path d="m4 6.25 4 4 4-4" />);
export const ChevronIcon = icon(<path d="m4 6.25 4 4 4-4" />);
export const CheckIcon = icon(<path d="m3 8.5 3.25 3.25L13 4.5" />);
export const CopyIcon = icon(
  <React.Fragment>
    <rect x="5.75" y="5.75" width="7.5" height="7.5" rx="1.5" />
    <path d="M10.25 3.25a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5" />
  </React.Fragment>,
);
export const ExternalIcon = icon(
  <React.Fragment>
    <path d="M9.25 2.75h4v4" />
    <path d="M13.25 2.75 7.5 8.5" />
    <path d="M12.25 9.75v2.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5v-7a1.5 1.5 0 0 1 1.5-1.5h2.5" />
  </React.Fragment>,
);
export const SearchIcon = icon(
  <React.Fragment>
    <circle cx="7.25" cy="7.25" r="4.5" />
    <path d="m10.75 10.75 2.5 2.5" />
  </React.Fragment>,
);
export const CrossIcon = icon(<path d="m4 4 8 8M12 4l-8 8" />);
