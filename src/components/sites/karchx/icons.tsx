import React from "react";

/** KARCHX logo mark (public/sites/karchx/logo.png). Size it with width/height classes. */
export function LogoKarchxIcon({ className = "w-5 h-5" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/sites/karchx/logo-192.png" alt="KARCHX" className={`object-contain ${className}`} draggable={false} />;
}

export function TerminalIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.25 4.75L6 6.5L4.25 8.25M7.75 8.25H9.75M3.75 17.25H14.25C15.9069 17.25 17.25 15.9069 17.25 14.25V3.75C17.25 2.09315 15.9069 0.75 14.25 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V14.25C0.75 15.9069 2.09315 17.25 3.75 17.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SendIcon({ className = "w-[20px] h-[20px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7.5006 9.79167L1.63879 4.58117C1.06608 4.0721 1.42617 3.125 2.19243 3.125H17.7327C18.3723 3.125 18.7734 3.81561 18.4566 4.37115L10.8347 17.7365C10.4593 18.3949 9.47119 18.2509 9.29925 17.5128L7.5006 9.79167ZM7.5006 9.79167L18.8222 3.33333" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

export function CompletedIcon({ className = "w-[18px] h-[15px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.1965 0.14738C6.52934 0.393931 6.5993 0.863624 6.35274 1.19647L3.01941 5.69647C2.78046 6.01905 2.32987 6.09628 1.99714 5.87168L0.330471 4.74668C-0.0128492 4.51494 -0.103302 4.04876 0.128439 3.70544C0.36018 3.36212 0.82636 3.27167 1.16968 3.50341L2.24136 4.22679L5.14741 0.303627C5.39396 -0.0292173 5.86365 -0.0991716 6.1965 0.14738ZM8.00008 3.25005C8.00008 2.83583 8.33586 2.50005 8.75008 2.50005H17.2501C17.6643 2.50005 18.0001 2.83583 18.0001 3.25005C18.0001 3.66426 17.6643 4.00005 17.2501 4.00005H8.75008C8.33586 4.00005 8.00008 3.66426 8.00008 3.25005ZM6.1965 9.14738C6.52934 9.39393 6.5993 9.86362 6.35274 10.1965L3.01941 14.6965C2.78046 15.0191 2.32987 15.0963 1.99714 14.8717L0.330471 13.7467C-0.0128492 13.5149 -0.103302 13.0488 0.128439 12.7054C0.36018 12.3621 0.82636 12.2717 1.16968 12.5034L2.24136 13.2268L5.14741 9.30363C5.39396 8.97078 5.86365 8.90083 6.1965 9.14738ZM8.00008 11.75C8.00008 11.3358 8.33586 11 8.75008 11H17.2501C17.6643 11 18.0001 11.3358 18.0001 11.75C18.0001 12.1643 17.6643 12.5 17.2501 12.5H8.75008C8.33586 12.5 8.00008 12.1643 8.00008 11.75Z" fill="currentColor" />
    </svg>
  );
}

export function ClosedBookIcon({ className = "w-[17px] h-[19px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5.25 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V15.25C0.75 16.9069 2.09315 18.25 3.75 18.25H5.25M5.25 0.75H13.25C14.9069 0.75 16.25 2.09315 16.25 3.75V15.25C16.25 16.9069 14.9069 18.25 13.25 18.25H5.25M5.25 0.75V18.25M9.25 5.25H12.25M9.25 9.25H12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ className = "w-5 h-5", expanded = false }: { className?: string; expanded?: boolean }) {
  return (
    <svg viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
      <path d="M13.9424 19.759C16.5148 18.269 18.6686 16.1521 20.2028 13.6058L20.3714 13.3255C20.5042 13.1051 20.7433 12.9706 21.0007 12.9706C21.258 12.9706 21.4964 13.1052 21.6293 13.3255L21.7979 13.6058C23.332 16.1521 25.486 18.269 28.0583 19.759L27.3225 21.0294C24.7831 19.5585 22.6221 17.5224 21.0007 15.0855C19.3792 17.5224 17.2184 19.5585 14.6789 21.0294L13.9424 19.759Z" fill="currentColor" />
    </svg>
  );
}
