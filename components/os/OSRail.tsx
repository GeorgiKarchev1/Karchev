'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { GlyphArrowLeft, GlyphLock, MODULE_GLYPHS } from '@/components/os/icons';
import { useOS } from '@/context/OSContext';
import { OS_MODULES, isModuleActive, type OSModule } from '@/lib/os/modules';

/**
 * The accent utilities in os.css (os-accent-fill, os-accent-edge) read
 * --os-accent-a/b from the nearest ancestor that declares them. Re-declaring
 * the pair on each row lets every module paint itself in its own identity
 * gradient without a bespoke class — or a colour literal — per module.
 */
const accentVars = (module: OSModule): CSSProperties =>
  ({
    ['--os-accent-a' as string]: module.accentA,
    ['--os-accent-b' as string]: module.accentB,
  }) as CSSProperties;

interface RailStatus {
  dotClass: string;
  label: string;
  detail: string;
}

const STATUS_LOADING: RailStatus = {
  dotClass: 'bg-white/30',
  label: 'Loading',
  detail: 'Restoring your workspace.',
};

const STATUS_SETUP: RailStatus = {
  dotClass: 'bg-amber-400',
  label: 'Setup needed',
  detail: 'Teach the system your business first.',
};

const STATUS_READY: RailStatus = {
  dotClass: 'bg-sky-400',
  label: 'Ready to generate',
  detail: 'Run the first bootstrap to fill the OS.',
};

const STATUS_LIVE: RailStatus = {
  dotClass: 'bg-emerald-400',
  label: 'System live',
  detail: 'Edit, regenerate, ship.',
};

/** ~160ms settle on colour only — no transform, so the rail never magnifies. */
const HOVER_TRANSITION =
  'transition-[background-color,color] duration-[160ms] ease-[var(--os-ease)]';

export default function OSRail() {
  const pathname = usePathname();
  const { hydrated, profile, hasContent } = useOS();

  /*
   * Profile and bootstrap only exist after localStorage is read in an effect,
   * so before hydration the server and the first client paint must agree on the
   * neutral variant — otherwise the status block flashes a wrong state.
   */
  const status: RailStatus = !hydrated
    ? STATUS_LOADING
    : !profile
      ? STATUS_SETUP
      : !hasContent
        ? STATUS_READY
        : STATUS_LIVE;

  return (
    <aside
      className="hidden h-full w-[68px] shrink-0 flex-col px-2 py-4 md:flex lg:w-[232px] lg:px-4"
      style={{ color: 'var(--os-frame-ink)' }}
      aria-label="Content OS navigation"
    >
      <Link
        href="/bg"
        className={`flex items-center gap-2 rounded-[10px] px-2 py-1 text-[11px] font-medium hover:text-[var(--os-frame-ink)] ${HOVER_TRANSITION}`}
        style={{ color: 'var(--os-frame-muted)' }}
      >
        <GlyphArrowLeft className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden lg:inline">Back to KarchX</span>
      </Link>

      <div className="mt-5 px-2">
        <p className="font-heading text-[15px] font-bold leading-none tracking-[0.04em]">
          <span className="lg:hidden">KX</span>
          <span className="hidden lg:inline">KARCHX</span>
        </p>
        <p
          className="mt-1.5 hidden text-[9px] font-semibold uppercase tracking-[0.18em] lg:block"
          style={{ color: 'var(--os-frame-muted)' }}
        >
          content os
        </p>
        {profile?.businessName ? (
          <p className="mt-3 hidden truncate text-[12px] font-medium lg:block">
            {profile.businessName}
          </p>
        ) : (
          <p
            className="mt-3 hidden text-[12px] lg:block"
            style={{ color: 'var(--os-frame-muted)' }}
          >
            No profile yet
          </p>
        )}
      </div>

      <nav className="os-scroll mt-6 flex-1 space-y-0.5 overflow-y-auto pb-4">
        {OS_MODULES.map((module) => {
          const Glyph = MODULE_GLYPHS[module.key];
          const active = isModuleActive(module, pathname);
          const locked = Boolean(module.requiresContent) && !hasContent;

          return (
            <Link
              key={module.key}
              href={module.href}
              aria-current={active ? 'page' : undefined}
              /* Locked modules stay navigable — the destination owns its own
                 empty state, which explains the gap better than a dead link. */
              title={locked ? 'Finish setup to unlock' : undefined}
              style={accentVars(module)}
              className={`relative flex items-center gap-3 rounded-[12px] px-2.5 py-2 ${HOVER_TRANSITION} ${
                active ? 'bg-white/[0.07]' : 'hover:bg-white/[0.05]'
              }`}
            >
              {active ? (
                <span
                  aria-hidden="true"
                  className="os-accent-edge absolute inset-y-2 left-0 w-[3px] rounded-full"
                />
              ) : null}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] ${HOVER_TRANSITION} ${
                  active ? 'os-accent-fill' : 'bg-white/[0.06]'
                }`}
                style={{ color: active ? '#ffffff' : 'var(--os-frame-muted)' }}
              >
                <Glyph className="h-[15px] w-[15px]" />
              </span>
              <span className="hidden truncate text-[13px] font-medium lg:inline">
                {module.label}
              </span>
              {locked ? (
                <span
                  className="ml-auto hidden shrink-0 lg:block"
                  style={{ color: 'var(--os-frame-muted)' }}
                >
                  <GlyphLock className="h-3.5 w-3.5" />
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[12px] bg-white/[0.05] p-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.dotClass}`}
            aria-hidden="true"
          />
          <span className="hidden text-[11px] font-medium lg:inline">
            {status.label}
          </span>
        </div>
        <p
          className="mt-1.5 hidden text-[10px] leading-4 lg:block"
          style={{ color: 'var(--os-frame-muted)' }}
        >
          {status.detail}
        </p>
        {/* The collapsed rail shows only the dot, so keep the state readable. */}
        <span className="sr-only lg:hidden">{status.label}</span>
      </div>
    </aside>
  );
}
