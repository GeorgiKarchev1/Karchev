'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { GlyphSearch, MODULE_GLYPHS } from '@/components/os/icons';
import { useOS } from '@/context/OSContext';
import { moduleForPath } from '@/lib/os/modules';

const FALLBACK_INITIALS = 'KX';

/** First letters of up to two words — "Karchev Studio" reads as "KS". */
const initialsOf = (name: string | undefined): string => {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (words.length === 0) return FALLBACK_INITIALS;
  return words.map((word) => word.charAt(0)).join('').toUpperCase();
};

export default function OSTopBar() {
  const pathname = usePathname();
  const { profile } = useOS();
  const module = moduleForPath(pathname);
  const ModuleGlyph = MODULE_GLYPHS[module.key];

  /*
   * The palette owns its own open state and its own keyboard shortcut. Firing a
   * window event instead of lifting that state keeps this bar free of any
   * import of the command bar, so either can be mounted without the other.
   */
  const openCommandPalette = useCallback(() => {
    window.dispatchEvent(new CustomEvent('os:command-palette'));
  }, []);

  return (
    <header className="flex h-[52px] items-center gap-4 px-4">
      <div className="flex flex-1 items-center gap-3">
        <span className="hidden items-center gap-[6px] sm:flex" aria-hidden="true">
          <span
            className="h-[11px] w-[11px] rounded-full"
            style={{ background: 'var(--os-frame-line)' }}
          />
          <span
            className="h-[11px] w-[11px] rounded-full"
            style={{ background: 'var(--os-frame-line)' }}
          />
          <span
            className="h-[11px] w-[11px] rounded-full"
            style={{ background: 'var(--os-frame-line)' }}
          />
        </span>

        <span className="flex min-w-0 items-center gap-2">
          <span
            className="flex shrink-0 items-center"
            style={{ color: module.accentA }}
            aria-hidden="true"
          >
            <ModuleGlyph className="h-4 w-4" />
          </span>
          <span
            className="truncate text-[13px] font-medium"
            style={{ color: 'var(--os-frame-ink)' }}
          >
            {module.label}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={openCommandPalette}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K"
        className="mx-auto flex h-9 w-full max-w-[420px] items-center gap-2 rounded-full bg-white/[0.06] px-3.5 transition-[background-color] duration-[160ms] ease-[var(--os-ease)] hover:bg-white/[0.09]"
      >
        <span
          className="flex shrink-0 items-center"
          style={{ color: 'var(--os-frame-muted)' }}
          aria-hidden="true"
        >
          <GlyphSearch className="h-4 w-4" />
        </span>
        <span
          className="truncate text-[12px]"
          style={{ color: 'var(--os-frame-muted)' }}
        >
          Search the OS
        </span>
        <span
          className="ml-auto shrink-0 rounded-[6px] border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[10px]"
          style={{ color: 'var(--os-frame-muted)' }}
          aria-hidden="true"
        >
          ⌘K
        </span>
      </button>

      <div className="flex flex-1 items-center justify-end">
        <span
          className="os-accent-fill flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-semibold text-white"
          title={profile?.businessName ?? 'KarchX Content OS'}
        >
          {initialsOf(profile?.businessName)}
        </span>
      </div>
    </header>
  );
}
