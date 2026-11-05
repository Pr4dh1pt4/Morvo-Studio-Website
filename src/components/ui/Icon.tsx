import type { SVGProps } from "react";
import type { IconName } from "@/content/types";

/** Ikon garis sederhana (24×24, stroke currentColor). Dekoratif: aria-hidden. */
const paths: Record<IconName, React.ReactNode> = {
  bottle: (
    <>
      <path d="M10 2.75h4M10.5 2.75v2.5c0 .8-.4 1.4-1 1.9C8.2 8.2 7.5 9.4 7.5 11v8.5a1.75 1.75 0 0 0 1.75 1.75h5.5a1.75 1.75 0 0 0 1.75-1.75V11c0-1.6-.7-2.8-2-3.85-.6-.5-1-1.1-1-1.9v-2.5" />
      <path d="M7.5 13h9M7.5 17h9" />
    </>
  ),
  shred: (
    <>
      <path d="m4 7 3-2 2 3-3 1.5zM13 4.5l3.5.5-.5 3-3-.5zM9.5 12l3-1 1 3-3 1zM16.5 11l3 1.5-1.5 2.5-2.5-1.5zM5 15.5l3 .5-.5 3-3-1zM12 18l3-1.5 1 2.5-3 1.5z" />
    </>
  ),
  spool: (
    <>
      <circle cx="10" cy="12" r="7.25" />
      <circle cx="10" cy="12" r="2.25" />
      <path d="M10 4.75c3 1.5 3 12.5 0 14.5M6 6.5c2.2 2 2.2 9 0 11" />
      <path d="M17.25 12c2 0 3.5 1.2 3.5 3.5V21" />
    </>
  ),
  printer: (
    <>
      <path d="M3.75 3.75h16.5M5 3.75v16.5M19 3.75v16.5M3.75 20.25h16.5" />
      <path d="M9.5 7h5v3l-1.5 1.5h-2L9.5 10z" />
      <path d="M12 11.5V13" />
      <path d="M8 17.25h8M8.75 15.5h6.5" />
    </>
  ),
  pen: (
    <>
      <path d="M15.5 4.5 19.5 8.5 9 19H5v-4z" />
      <path d="M13 7l4 4" />
      <path d="M13 20.25h7" />
    </>
  ),
  qr: (
    <>
      <path d="M3.75 3.75h6v6h-6zM14.25 3.75h6v6h-6zM3.75 14.25h6v6h-6z" />
      <path d="M6 6h1.5v1.5H6zM16.5 6H18v1.5h-1.5zM6 16.5h1.5V18H6z" />
      <path d="M14.25 14.25h2.5v2.5h-2.5zM18.5 18.5h1.75v1.75H18.5zM14.25 19.5h2M19.5 14.25v2.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6.25" y="2.75" width="11.5" height="18.5" rx="2.25" />
      <path d="M10.5 18.25h3" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.2 19.8 5.3 16A8.25 8.25 0 1 1 8.4 19z" />
      <path d="M9.2 8.4c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.3 0 .5-.1.7l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.3.3.5 0 .6-.3 1.3-.9 1.6-.6.4-1.6.5-3.1-.2a9.6 9.6 0 0 1-3.8-3.6c-.8-1.4-.6-2.6-.2-3.5z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.25" width="18" height="13.5" rx="2" />
      <path d="m3.75 6.75 8.25 6 8.25-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" />
    </>
  ),
};

export function Icon({
  name,
  className,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className ?? "size-5"}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
