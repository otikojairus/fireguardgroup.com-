import type { ReactNode } from "react";
import type { ContentSection } from "@/lib/page-content";

type IconName = ContentSection["icon"];

const paths: Record<IconName, ReactNode> = {
  shield: (
    <path
      d="M12 2l8 3v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V5l8-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 4.5h6a1.5 1.5 0 0 1 1.5 1.5v1H7.5V6A1.5 1.5 0 0 1 9 4.5z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2z" fill="currentColor" />
    </>
  ),
  check: (
    <path
      d="M6 12.5l3.2 3.2L18 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  phone: (
    <path
      d="M7.5 5.5c2.2 4.2 5.8 7.8 10 10l2.2-2.2a1.2 1.2 0 0 1 1.2-.28c1.3.43 2.7.66 4.1.66a1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2C10.3 21.2 2.8 13.7 2.8 4.2A1.2 1.2 0 0 1 4 3h3.55a1.2 1.2 0 0 1 1.2 1.2c0 1.4.23 2.8.66 4.1a1.2 1.2 0 0 1-.28 1.2L7.5 5.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
};

type ServiceIconProps = {
  name: IconName;
  className?: string;
};

export function ServiceIcon({ name, className = "" }: ServiceIconProps) {
  return (
    <svg className={`service-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
