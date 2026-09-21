'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from 'react';
import { useOS } from '@/context/OSContext';
import {
  MODULE_BY_KEY,
  OS_MODULES,
  isModuleActive,
  type ModuleKey,
} from '@/lib/os/modules';
import {
  GlyphArrowRight,
  GlyphClose,
  GlyphCommand,
  GlyphEnter,
  GlyphSearch,
  GlyphSpark,
  GlyphSpinner,
  MODULE_GLYPHS,
} from '@/components/os/icons';

type GlyphComponent = ComponentType<{ className?: string }>;

interface CommandItem {
  id: string;
  label: string;
  blurb: string;
  accentA: string;
  accentB: string;
  Glyph: GlyphComponent;
  run: () => void;
}

/**
 * The four modules people actually live in. The pill is a jump-to cluster, not
 * an app launcher — the other three modules are one keystroke away in the
 * palette, so putting them all on the pill would just rebuild a dock.
 */
const QUICK_KEYS: ModuleKey[] = ['overview', 'ideas', 'hooks', 'plan'];

/**
 * CSS custom properties aren't part of React's CSSProperties. Setting the accent
 * pair per element is what lets `os-accent-fill` / `os-accent-plate` render each
 * module's own identity gradient instead of the page-level accent.
 */
const accentVars = (accentA: string, accentB: string): CSSProperties =>
  ({ '--os-accent-a': accentA, '--os-accent-b': accentB }) as CSSProperties;

const FLOAT_SHADOW: CSSProperties = { boxShadow: 'var(--os-shadow-float)' };

export default function OSCommandBar() {
  const pathname = usePathname() ?? '/os';
  const router = useRouter();
  const { hydrated, profile, hasContent, regenerate } = useOS();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef(false);

  const baseId = useId();
  const listId = `${baseId}-list`;
  const rowId = useCallback((index: number) => `${baseId}-row-${index}`, [baseId]);

  const closePalette = useCallback(() => {
    // The trigger doesn't exist while the palette is up, so focus can only be
    // handed back once the collapsed pill has rendered again — see the effect.
    restoreFocusRef.current = true;
    setOpen(false);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (busy) return;
    setError(null);
    // No profile means there is nothing to regenerate from — send them to setup
    // rather than firing a request that the context would silently drop.
    if (!hasContent || !profile) {
      router.push('/os/onboarding');
      return;
    }
    setBusy(true);
    try {
      await regenerate();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Could not regenerate right now. Try again.',
      );
    } finally {
      setBusy(false);
    }
  }, [busy, hasContent, profile, regenerate, router]);

  const allItems = useMemo<CommandItem[]>(() => {
    const moduleItems: CommandItem[] = OS_MODULES.map((module) => ({
      id: `module-${module.key}`,
      label: module.label,
      blurb: module.blurb,
      accentA: module.accentA,
      accentB: module.accentB,
      Glyph: MODULE_GLYPHS[module.key],
      run: () => router.push(module.href),
    }));

    const actionItems: CommandItem[] = [
      {
        id: 'action-regenerate',
        label: 'Regenerate everything',
        blurb: 'Rebuild pillars, ideas, hooks and the weekly plan from your profile.',
        accentA: MODULE_BY_KEY.setup.accentA,
        accentB: MODULE_BY_KEY.setup.accentB,
        Glyph: GlyphSpark,
        run: () => {
          void handleGenerate();
        },
      },
      {
        id: 'action-repurpose',
        label: 'Start a repurpose',
        blurb: 'Turn one piece of source copy into five platform-native cuts.',
        accentA: MODULE_BY_KEY.repurpose.accentA,
        accentB: MODULE_BY_KEY.repurpose.accentB,
        Glyph: GlyphArrowRight,
        run: () => router.push(MODULE_BY_KEY.repurpose.href),
      },
    ];

    return moduleItems.concat(actionItems);
  }, [handleGenerate, router]);

  const items = useMemo<CommandItem[]>(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return allItems;
    return allItems.filter((item) =>
      `${item.label} ${item.blurb}`.toLowerCase().includes(needle),
    );
  }, [allItems, query]);

  const activate = useCallback((item: CommandItem) => {
    setOpen(false);
    item.run();
  }, []);

  // ⌘K / Ctrl+K toggles from anywhere; preventDefault keeps the browser's own
  // find-in-page (Firefox) and link search out of the way.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        closePalette();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closePalette, open]);

  // The top bar's search affordance lives in the dark frame and has no shared
  // state with this component, so it asks for the palette by broadcasting an
  // event rather than lifting `open` up into a provider. Always open (never
  // toggle): the outside-click handler has already run by the time the click
  // lands, so a toggle here would immediately re-close it.
  useEffect(() => {
    const onRequest = () => setOpen(true);
    window.addEventListener('os:command-palette', onRequest);
    return () => window.removeEventListener('os:command-palette', onRequest);
  }, []);

  // Every opening starts from a clean slate, with the caret already in place;
  // a deliberate close (Escape, the close button) hands focus back to the pill.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      inputRef.current?.focus();
      return;
    }
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  // A narrowing query can strand the highlight past the end of the list.
  useEffect(() => {
    setActiveIndex((current) =>
      current > items.length - 1 ? Math.max(items.length - 1, 0) : current,
    );
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(rowId(activeIndex))?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open, rowId]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && containerRef.current?.contains(target)) return;
      // No focus return here: the user's attention has already moved elsewhere.
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(null), 5000);
    return () => window.clearTimeout(timer);
  }, [error]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (items.length === 0) return;
    // The list renders bottom-up (index 0 sits against the input), so ArrowUp
    // walks *forward* through the array to reach the top of the visual list.
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % items.length);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + items.length) % items.length);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[activeIndex];
      if (item) activate(item);
    }
  };

  const generateLabel = hasContent ? 'Generate' : 'Finish setup';

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 flex-col items-center justify-end md:flex"
    >
      {error ? (
        <p
          role="status"
          className="os-settle mb-2 max-w-[520px] rounded-full border border-[var(--os-line)] bg-[var(--os-surface)] px-4 py-1.5 text-xs font-medium text-[var(--os-hooks-a)]"
          style={FLOAT_SHADOW}
        >
          {error}
        </p>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="os-settle flex w-[520px] flex-col overflow-hidden rounded-[24px] border border-[var(--os-line)] bg-[var(--os-surface)]/95 backdrop-blur-xl"
          style={FLOAT_SHADOW}
        >
          {/* flex-col-reverse renders the array bottom-up: the most relevant row
              lands against the input, exactly where the pill's text used to be. */}
          <div
            id={listId}
            role="listbox"
            aria-label="Commands"
            className="os-scroll flex max-h-[320px] flex-col-reverse gap-0.5 overflow-y-auto p-2"
          >
            {items.map((item, index) => {
              const selected = index === activeIndex;
              const { Glyph } = item;
              return (
                <div
                  key={item.id}
                  id={rowId(index)}
                  role="option"
                  aria-selected={selected}
                  onClick={() => activate(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`os-settle flex cursor-pointer items-center gap-3 rounded-[14px] px-2 py-2 transition-colors duration-150 ${
                    selected ? 'bg-[var(--os-surface-sunk)]' : 'bg-transparent'
                  }`}
                  style={{ animationDelay: `${index * 22}ms` }}
                >
                  <span
                    className="os-accent-plate flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={accentVars(item.accentA, item.accentB)}
                  >
                    <Glyph className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--os-ink)]">
                      {item.label}
                    </span>
                    <span className="block truncate text-xs text-[var(--os-muted)]">
                      {item.blurb}
                    </span>
                  </span>
                  {selected ? (
                    <GlyphEnter className="h-4 w-4 shrink-0 text-[var(--os-faint)]" />
                  ) : null}
                </div>
              );
            })}
          </div>

          {items.length === 0 ? (
            <p role="status" className="px-5 pb-3 pt-1 text-xs text-[var(--os-muted)]">
              Nothing matches “{query.trim()}”.
            </p>
          ) : null}

          {/* The input keeps the pill's 52px row geometry — same height, same
              left glyph, same circular button at the right end — so the panel
              reads as the pill grown upward rather than a new surface. */}
          <div className="flex h-[52px] shrink-0 items-center gap-2 border-t border-[var(--os-line)] px-2">
            <GlyphSearch className="ml-2 h-4 w-4 shrink-0 text-[var(--os-faint)]" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={
                items.length > 0 ? rowId(activeIndex) : undefined
              }
              aria-label="Ask or jump to"
              placeholder="Ask or jump to…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              className="h-9 min-w-0 flex-1 bg-transparent text-sm text-[var(--os-ink)] outline-none placeholder:text-[var(--os-faint)]"
            />
            <button
              type="button"
              onClick={closePalette}
              aria-label="Close command palette"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--os-surface-sunk)] text-[var(--os-muted)] transition-colors duration-150 hover:text-[var(--os-ink)]"
            >
              <GlyphClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex h-[52px] w-[520px] items-center gap-2 rounded-full border border-[var(--os-line)] bg-[var(--os-surface)]/90 px-2 backdrop-blur-xl"
          style={FLOAT_SHADOW}
        >
          <div className="flex shrink-0 items-center gap-1">
            {QUICK_KEYS.map((key) => {
              const module = MODULE_BY_KEY[key];
              const active = isModuleActive(module, pathname);
              const Glyph = MODULE_GLYPHS[key];
              return (
                <Link
                  key={key}
                  href={module.href}
                  aria-label={module.label}
                  aria-current={active ? 'page' : undefined}
                  title={module.label}
                  className={`flex h-8 w-8 items-center justify-center rounded-[11px] transition-transform duration-150 hover:-translate-y-[1px] ${
                    active ? 'os-accent-fill text-white' : 'os-accent-plate'
                  }`}
                  style={accentVars(module.accentA, module.accentB)}
                >
                  <Glyph className="h-4 w-4" />
                </Link>
              );
            })}
          </div>

          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[var(--os-line)]" />

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={false}
            aria-keyshortcuts="Meta+K Control+K"
            className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full px-2 text-left transition-colors duration-150 hover:bg-[var(--os-surface-sunk)]"
          >
            <GlyphSearch className="h-4 w-4 shrink-0 text-[var(--os-faint)]" />
            <span className="min-w-0 flex-1 truncate text-sm text-[var(--os-muted)]">
              Ask or jump to…
            </span>
            <kbd className="flex shrink-0 items-center gap-0.5 rounded-md border border-[var(--os-line)] bg-[var(--os-surface-sunk)] px-1.5 py-0.5 font-sans text-[10px] font-semibold text-[var(--os-faint)]">
              <GlyphCommand className="h-3 w-3" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => void handleGenerate()}
            disabled={!hydrated || busy}
            aria-label={generateLabel}
            aria-busy={busy}
            title={generateLabel}
            className="os-accent-fill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-150 hover:scale-[1.04] disabled:opacity-60 disabled:hover:scale-100"
          >
            {busy ? (
              <GlyphSpinner className="h-4 w-4 animate-spin" />
            ) : (
              <GlyphSpark className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
