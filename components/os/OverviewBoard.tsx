'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import {
  GlyphArrowRight,
  GlyphCheckRing,
  GlyphChevronRight,
  GlyphDot,
  GlyphRefresh,
  GlyphSpark,
  MODULE_GLYPHS,
} from '@/components/os/icons';
import { OSButton, OSCard, OSChip, OSLabel, OSSectionLabel } from '@/components/os/ui';
import { useOS } from '@/context/OSContext';
import { OS_MODULES, type ModuleKey } from '@/lib/os/modules';

/**
 * The overview is the only board that speaks about the system rather than about
 * one module's data, so it leads with a status hero instead of a data table.
 * The hero, the progress ribbon and the module grid all read the same two flags
 * (`profile`, `hasContent`) — there is deliberately no fourth source of truth
 * about "where the user is", because that is what used to drift.
 */

/* -------------------------------------------------------------------------- */
/* Setup journey                                                               */
/* -------------------------------------------------------------------------- */

const JOURNEY_STEPS = [
  'Describe the business',
  'Generate the system',
  'Ship the week',
] as const;

/**
 * The hero CTA navigates, so it has to be an anchor — `OSButton` renders a
 * `<button>` and nesting one inside a link is invalid and unusable by keyboard.
 * This mirrors the accent button's geometry so the two read as one control.
 */
const HERO_LINK_CLASS =
  'os-accent-fill inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[var(--os-r-pill)] px-3.5 text-[13px] font-semibold text-white shadow-[var(--os-shadow-rest)] transition-transform duration-[var(--os-fast)] ease-[var(--os-ease)] hover:-translate-y-px active:translate-y-0';

/**
 * Hairlines between metrics. The row is a 2-up grid below `sm` and a single
 * 4-up band above it, so the column rule and the row rule swap places.
 */
const metricDividerClass = (index: number): string =>
  `border-[var(--os-line)] ${index % 2 === 1 ? 'border-l' : ''} ${
    index >= 2 ? 'border-t sm:border-t-0' : ''
  } ${index === 2 ? 'sm:border-l' : ''}`;

export default function OverviewBoard() {
  const { profile, bootstrap, hasContent, regenerate } = useOS();
  const [regenerating, setRegenerating] = useState(false);

  const stats = useMemo(() => {
    return [
      {
        label: 'Pillars',
        value: bootstrap?.pillars.length ?? 0,
        qualifier: 'themes',
        href: '/os/pillars',
      },
      {
        label: 'Weekly ideas',
        value: bootstrap?.ideas.length ?? 0,
        qualifier: 'queued',
        href: '/os/ideas',
      },
      {
        label: 'Hook templates',
        value: bootstrap?.hooks.length ?? 0,
        qualifier: 'openers',
        href: '/os/hooks',
      },
      {
        label: 'Plan days',
        value: bootstrap?.weeklyPlan.length ?? 0,
        qualifier: 'scheduled',
        href: '/os/plan',
      },
    ];
  }, [bootstrap]);

  /**
   * Which module has something worth opening. Repurpose is the one tool that
   * works off pasted copy rather than the bootstrap, so it is never "setup".
   */
  const moduleReady = useCallback(
    (key: ModuleKey): boolean => {
      switch (key) {
        case 'setup':
          return Boolean(profile);
        case 'pillars':
          return (bootstrap?.pillars.length ?? 0) > 0;
        case 'ideas':
          return (bootstrap?.ideas.length ?? 0) > 0;
        case 'hooks':
          return (bootstrap?.hooks.length ?? 0) > 0;
        case 'plan':
          return (bootstrap?.weeklyPlan.length ?? 0) > 0;
        case 'repurpose':
          return true;
        case 'overview':
          return true;
      }
    },
    [profile, bootstrap],
  );

  /* The three states, unchanged: no profile → profile only → bootstrap live. */
  const currentStep = !profile ? 0 : !hasContent ? 1 : 2;

  const handleRegenerate = useCallback(async () => {
    setRegenerating(true);
    try {
      await regenerate();
    } catch {
      // Swallowed as before — the module boards surface generation failures.
    } finally {
      setRegenerating(false);
    }
  }, [regenerate]);

  return (
    <div className="space-y-6 px-6 pb-8 md:px-10 md:pb-10">
      {/* ------------------------------------------------------------------ */}
      {/* Status hero                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="os-settle rounded-[var(--os-r-pane)] border border-[var(--os-line)] p-6 shadow-[var(--os-shadow-rest)] md:p-7"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--os-accent-a) 8%, white), white)',
        }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="os-accent-plate inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px]">
                <GlyphSpark className="h-[15px] w-[15px]" />
              </span>
              <OSSectionLabel>
                {!profile ? 'Start here' : !hasContent ? 'Profile saved' : 'System live'}
              </OSSectionLabel>
            </div>

            {/*
              Not a heading element: PageHeader owns the page's only h1 and the
              eyebrow above is already this section's h2.
            */}
            <p className="mt-3 font-heading text-[22px] font-semibold tracking-[-0.02em] text-[var(--os-ink)] md:text-[26px]">
              {!profile
                ? 'Build your business context first.'
                : !hasContent
                  ? 'Generate your first OS bootstrap.'
                  : 'Your content OS is ready.'}
            </p>

            <p className="mt-2 max-w-[62ch] text-[14px] leading-6 text-[var(--os-muted)]">
              {!profile
                ? 'We need your offer, audience, pains, FAQs, and goals to generate pillars, ideas, hooks and a weekly plan that actually sounds like you.'
                : !hasContent
                  ? "We'll turn your context into pillars, weekly ideas, hooks and a 5-day plan."
                  : 'Open any module to edit, regenerate, or repurpose. Everything is tied back to your business context.'}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {!profile ? (
              <Link href="/os/onboarding" className={HERO_LINK_CLASS}>
                Open onboarding
                <GlyphArrowRight className="h-4 w-4" />
              </Link>
            ) : !hasContent ? (
              <Link href="/os/onboarding" className={HERO_LINK_CLASS}>
                Generate now
                <GlyphArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link href="/os/plan" className={HERO_LINK_CLASS}>
                  View weekly plan
                  <GlyphArrowRight className="h-4 w-4" />
                </Link>
                <OSButton
                  tone="quiet"
                  busy={regenerating}
                  icon={<GlyphRefresh className="h-4 w-4" />}
                  onClick={handleRegenerate}
                >
                  Regenerate everything
                </OSButton>
              </>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Progress ribbon                                                   */}
        {/* ---------------------------------------------------------------- */}
        <ol
          aria-label="Setup progress"
          className="mt-6 flex flex-col gap-3 border-t border-[var(--os-line)] pt-5 sm:flex-row sm:items-center sm:gap-0"
        >
          {JOURNEY_STEPS.map((step, index) => {
            const done = index < currentStep;
            const current = index === currentStep;
            const isLast = index === JOURNEY_STEPS.length - 1;

            return (
              <li
                key={step}
                aria-current={current ? 'step' : undefined}
                className={`flex items-center gap-2.5 ${isLast ? 'sm:flex-none' : 'sm:flex-1'}`}
              >
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                  {done ? (
                    <GlyphCheckRing className="h-4 w-4 text-[var(--os-accent-a)]" />
                  ) : current ? (
                    <span className="os-accent-fill h-2.5 w-2.5 rounded-full" />
                  ) : (
                    <GlyphDot className="h-4 w-4 text-[var(--os-faint)]" />
                  )}
                </span>

                <span
                  className={`whitespace-nowrap text-[13px] font-medium ${
                    done || current ? 'text-[var(--os-ink)]' : 'text-[var(--os-muted)]'
                  }`}
                >
                  {step}
                  <span className="sr-only">
                    {done ? ' — done' : current ? ' — in progress' : ' — not started'}
                  </span>
                </span>

                {/* The connector carries the accent only once the step behind it is done. */}
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className={`hidden h-px flex-1 sm:mx-3 sm:block ${
                      done ? 'os-accent-fill' : 'bg-[var(--os-line)]'
                    }`}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Metric band — one pane, four figures, not four cards.               */}
      {/* ------------------------------------------------------------------ */}
      <div className="os-settle os-pane grid grid-cols-2 overflow-hidden sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`px-5 py-4 transition-colors duration-[var(--os-fast)] ease-[var(--os-ease)] hover:bg-[var(--os-surface-sunk)] ${metricDividerClass(index)}`}
          >
            <OSLabel>{stat.label}</OSLabel>
            <p className="mt-1.5 font-heading text-[26px] font-semibold tabular-nums leading-none text-[var(--os-ink)]">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[12px] text-[var(--os-muted)]">{stat.qualifier}</p>
          </Link>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Module grid                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div className="mb-3">
          <OSSectionLabel>The 6 modules</OSSectionLabel>
          <p className="mt-1 font-heading text-[18px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
            Your weekly content workflow
          </p>
        </div>

        <div className="os-stagger grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {OS_MODULES.filter((m) => m.key !== 'overview').map((m) => {
            const Glyph = MODULE_GLYPHS[m.key];
            const ready = moduleReady(m.key);

            return (
              <OSCard key={m.key} interactive accentA={m.accentA} accentB={m.accentB}>
                <Link href={m.href} className="group flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="os-accent-plate inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[11px]">
                      <Glyph className="h-[17px] w-[17px]" />
                    </span>
                    {ready ? (
                      <GlyphCheckRing className="h-[18px] w-[18px] shrink-0 text-[var(--os-accent-a)]" />
                    ) : (
                      <OSChip>setup</OSChip>
                    )}
                  </div>

                  <h3 className="mt-4 text-[15px] font-semibold text-[var(--os-ink)]">
                    {m.label}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-5 text-[var(--os-muted)]">
                    {m.blurb}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--os-accent-a)]">
                    Open
                    <GlyphChevronRight className="h-3.5 w-3.5 transition-transform duration-[var(--os-fast)] ease-[var(--os-ease)] group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </OSCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
