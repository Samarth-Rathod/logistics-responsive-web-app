const iconPaths = {
  grid: 'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  truck: 'M3 6h11v11H3z M14 10h4l3 3v4h-7z M7 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 19z M18 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 18 19z',
  package: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5 12 12l8-4.5 M12 12v9 M8 5.3l8 4.5',
  users: 'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20 M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M17 4.5a3.2 3.2 0 0 1 0 6.2 M17 15h1.5a3.5 3.5 0 0 1 3.5 3.5V20',
  chart: 'M4 19V5 M4 19h17 M8 15l3-4 3 2 5-7',
  settings: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M19 13.5a7.5 7.5 0 0 0 0-3l2-1.5-2-3.5-2.4 1a7.7 7.7 0 0 0-2.6-1.5L13.6 2h-4l-.4 3a7.7 7.7 0 0 0-2.6 1.5l-2.4-1-2 3.5 2 1.5a7.5 7.5 0 0 0 0 3l-2 1.5 2 3.5 2.4-1a7.7 7.7 0 0 0 2.6 1.5l.4 3h4l.4-3a7.7 7.7 0 0 0 2.6-1.5l2.4 1 2-3.5-2-1.5z',
  plus: 'M12 5v14 M5 12h14',
  search: 'M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4z M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'M6 6l12 12 M18 6 6 18',
  chevron: 'm7 10 5 5 5-5',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  check: 'm5 12 4 4L19 6',
  pin: 'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  filter: 'M4 6h16 M7 12h10 M10 18h4',
  download: 'M12 3v12 M7 10l5 5 5-5 M4 20h16',
  calendar: 'M4 5h16v15H4z M8 3v4 M16 3v4 M4 9h16',
  edit: 'M4 20h4l11-11-4-4L4 16v4z M13.5 6.5l4 4',
  external: 'M14 4h6v6 M20 4l-9 9 M18 13v6H5V6h6',
  alert: 'M12 3 2.8 20h18.4L12 3z M12 9v4 M12 16.5h.01',
  clipboard: 'M8 5h8l1 2h3v14H4V7h3l1-2z M9 5V3h6v2 M8 12h8 M8 16h8',
  user: 'M20 21a8 8 0 0 0-16 0 M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  more: 'M5 12h.01 M12 12h.01 M19 12h.01',
};

export default function Icon({ name, size = 18, className = '' }) {
  const d = iconPaths[name] || iconPaths.package;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
