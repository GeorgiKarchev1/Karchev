'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOS } from '@/context/OSContext';
import {
  GlyphCheck,
  GlyphCopy,
  GlyphRepurpose,
  GlyphSpark,
} from '@/components/os/icons';
import {
  OSButton,
  OSCard,
  OSChip,
  OSLabel,
  OSSectionLabel,
  fieldClass,
} from '@/components/os/ui';
import type { RepurposePlatform, RepurposeVariant } from '@/lib/os/types';

/**
 * Each platform gets its own hue so a wall of five near-identical text cards is
 * scannable without reading the labels. Kept in the same desaturated family as
 * the module gradients so the grid still reads as one system.
 */
const PLATFORM_ACCENT: Record<RepurposePlatform, { a: string; b: string }> = {
  linkedin: { a: '#2f7dd1', b: '#4fa3e3' },
  instagram: { a: '#e0518f', b: '#f281ac' },
  twitter: { a: '#3fa9f5', b: '#4fd1e8' },
  email: { a: '#ef9445', b: '#f2c14e' },
  'short-video': { a: '#7e6bf2', b: '#a98bf5' },
};

const FALLBACK_ACCENT = { a: '#5b7cfa', b: '#7c5bfa' };

export default function RepurposeBoard() {
  const params = useSearchParams();
  const { profile, hydrated } = useOS();
  const initialSource = params.get('source') ?? '';

  const [source, setSource] = useState(initialSource);
  const [variants, setVariants] = useState<RepurposeVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialSource && hydrated) {
      handleGenerate(initialSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const handleGenerate = async (override?: string) => {
    const value = (override ?? source).trim();
    if (value.length < 3) {
      setError('Add at least a sentence to repurpose.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/os/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: value, profile }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setVariants(data.variants);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5 px-6 pb-8 md:px-10 md:pb-10">
      {/* The source box is the whole job of this board, so it gets the hero. */}
      <section className="os-pane os-settle p-5 md:p-6">
        <h2 className="font-heading text-[18px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
          What are we repurposing?
        </h2>

        <label className="mt-4 block">
          <OSLabel>Source</OSLabel>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Paste an idea, a hook, a paragraph from a podcast, or a transcript snippet. We'll expand it into platform-ready variants."
            className={`${fieldClass} os-scroll mt-1.5 min-h-[160px] resize-y leading-6`}
          />
        </label>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] tabular-nums text-[var(--os-faint)]">
            {source.length} characters
          </span>
          <OSButton
            type="button"
            tone="accent"
            onClick={() => handleGenerate()}
            busy={loading}
            icon={<GlyphSpark className="h-4 w-4" />}
          >
            {variants.length ? 'Regenerate variants' : 'Generate variants'}
          </OSButton>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-3 rounded-[var(--os-r-tile)] border border-red-200 bg-red-50 px-3 py-2 text-[13px] font-medium text-red-700"
          >
            {error}
          </p>
        ) : null}

        {!profile ? (
          <p className="mt-3 text-[12px] leading-5 text-[var(--os-faint)]">
            Tip: finish onboarding so variants pull in your audience, tone, and brand voice.
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <OSSectionLabel>Platform variants</OSSectionLabel>

        {variants.length ? (
          <div className="os-stagger grid gap-3 lg:grid-cols-2">
            {variants.map((variant) => {
              const key = variant.platform;
              const copied = copiedKey === key;
              const accent = PLATFORM_ACCENT[variant.platform] ?? FALLBACK_ACCENT;
              return (
                <OSCard
                  key={key}
                  interactive
                  accentA={accent.a}
                  accentB={accent.b}
                  className="flex flex-col overflow-hidden"
                >
                  <div
                    className="flex items-start justify-between gap-3 border-b border-[var(--os-line)] p-4"
                    style={{
                      background: 'color-mix(in srgb, var(--os-accent-a) 12%, white)',
                    }}
                  >
                    <div className="min-w-0">
                      <OSChip tone="accent">{variant.format}</OSChip>
                      <h3 className="mt-2 font-heading text-[16px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
                        {variant.label}
                      </h3>
                    </div>

                    {/*
                      Both states share one grid cell, so the button is sized
                      by the wider label and never reflows mid-click.
                    */}
                    <OSButton
                      type="button"
                      onClick={() => copy(key, variant.copy)}
                      aria-label={`Copy the ${variant.label} variant`}
                      className="shrink-0"
                    >
                      <span className="grid place-items-center">
                        <span
                          className={`col-start-1 row-start-1 inline-flex items-center gap-1.5 transition-opacity duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                            copied ? 'opacity-0' : 'opacity-100'
                          }`}
                        >
                          <GlyphCopy className="h-3.5 w-3.5" />
                          Copy
                        </span>
                        <span
                          aria-hidden="true"
                          className={`col-start-1 row-start-1 inline-flex items-center gap-1.5 transition-opacity duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                            copied ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <GlyphCheck className="h-3.5 w-3.5" />
                          Copied
                        </span>
                      </span>
                    </OSButton>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <pre className="whitespace-pre-wrap break-words font-sans text-[13px] leading-6 text-[var(--os-ink)]">
                      {variant.copy}
                    </pre>

                    <div className="mt-auto rounded-[var(--os-r-tile)] border border-dashed border-[var(--os-line-strong)] bg-[var(--os-surface-sunk)] p-3">
                      <OSLabel>Notes</OSLabel>
                      <p className="mt-1 text-[12px] leading-5 text-[var(--os-muted)]">
                        {variant.notes}
                      </p>
                    </div>
                  </div>
                </OSCard>
              );
            })}
          </div>
        ) : (
          <div className="os-settle flex flex-col items-start gap-3 rounded-[var(--os-r-pane)] border border-dashed border-[var(--os-line-strong)] bg-white/60 p-6">
            <span className="os-accent-plate inline-flex h-10 w-10 items-center justify-center rounded-[14px]">
              <GlyphRepurpose className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-[16px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
              Drop a source above and we'll generate 5 platform variants.
            </h3>
            <p className="max-w-[56ch] text-[13px] leading-6 text-[var(--os-muted)]">
              Each variant follows a different formula — LinkedIn long-form, IG caption,
              X thread, email blurb, short-video script.
            </p>
          </div>
        )}
      </section>

      {/* Copy confirmation is visual only above; announce it for screen readers. */}
      <span aria-live="polite" className="sr-only">
        {copiedKey ? 'Copied to clipboard' : ''}
      </span>
    </div>
  );
}
