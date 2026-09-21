'use client';

import { useState } from 'react';
import { useOS } from '@/context/OSContext';
import EmptyState from '@/components/os/EmptyState';
import { GlyphPlus, GlyphRefresh, GlyphTrash } from '@/components/os/icons';
import {
  OSButton,
  OSCard,
  OSField,
  OSIconButton,
  OSSectionLabel,
  fieldClass,
} from '@/components/os/ui';
import { MODULE_BY_KEY } from '@/lib/os/modules';
import type { WeeklyPlanDay } from '@/lib/os/types';

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PLAN = MODULE_BY_KEY.plan;

export default function PlanBoard() {
  const { profile, bootstrap, updatePlan, regenerate } = useOS();
  const [regenerating, setRegenerating] = useState(false);

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="Your weekly plan is built from your pillars and ideas. Onboard to unlock this view."
      />
    );
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your weekly plan"
        description="Run the generator to build a Mon–Fri publishing rhythm from your business context."
        ctaLabel="Generate now"
      />
    );
  }

  const updateField = (
    index: number,
    field: keyof WeeklyPlanDay,
    value: string
  ) => {
    const next = bootstrap.weeklyPlan.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    updatePlan(next);
  };

  const addDay = () => {
    const used = bootstrap.weeklyPlan.map((d) => d.day);
    const day = dayOptions.find((d) => !used.includes(d)) ?? 'Saturday';
    updatePlan([
      ...bootstrap.weeklyPlan,
      {
        day,
        pillar: bootstrap.pillars[0]?.title ?? 'Pillar',
        ideaTitle: 'New post',
        format: 'LinkedIn post',
        hook: 'Drop the hook here.',
        cta: 'Reply or DM',
      },
    ]);
  };

  const removeDay = (index: number) => {
    updatePlan(bootstrap.weeklyPlan.filter((_, i) => i !== index));
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      await regenerate();
    } finally {
      setRegenerating(false);
    }
  };

  const pillarOptions = bootstrap.pillars.map((p) => p.title);

  return (
    <div className="space-y-4 px-6 pb-8 md:px-10 md:pb-10">
      {/*
        The board bar sits flush under PageHeader (which the route owns, and
        which carries the h1) so the toolbar reads as part of that band rather
        than as a second strip of chrome.
      */}
      <div className="os-settle flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <OSSectionLabel>{bootstrap.weeklyPlan.length} days locked</OSSectionLabel>
          <p className="text-[13px] text-[var(--os-faint)]">
            Swap any cell, pick the pillar, rewrite the hook.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <OSButton
            type="button"
            onClick={addDay}
            icon={<GlyphPlus className="h-4 w-4" />}
          >
            Add day
          </OSButton>
          <OSButton
            type="button"
            tone="accent"
            onClick={handleRegenerate}
            busy={regenerating}
            icon={<GlyphRefresh className="h-4 w-4" />}
          >
            Regenerate plan
          </OSButton>
        </div>
      </div>

      {/*
        Three columns at xl rather than five: a day card carries six fields,
        and a fifth of the canvas width wrapped every label onto two lines.
      */}
      <div className="os-stagger grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {bootstrap.weeklyPlan.map((row, index) => (
          <OSCard
            key={`${row.day}-${index}`}
            interactive
            accentA={PLAN.accentA}
            accentB={PLAN.accentB}
            className="flex flex-col gap-3 p-4"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--os-line)] pb-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="os-accent-plate inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--os-r-chip)] text-[12px] font-semibold tabular-nums"
                >
                  {index + 1}
                </span>
                <h3 className="truncate font-heading text-[15px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
                  {row.day}
                </h3>
              </div>
              <OSIconButton
                danger
                label={`Remove ${row.day}`}
                onClick={() => removeDay(index)}
              >
                <GlyphTrash className="h-4 w-4" />
              </OSIconButton>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <OSField label="Day">
                <select
                  value={row.day}
                  onChange={(e) => updateField(index, 'day', e.target.value)}
                  className={fieldClass}
                >
                  {dayOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </OSField>

              <OSField label="Pillar">
                <select
                  value={row.pillar}
                  onChange={(e) => updateField(index, 'pillar', e.target.value)}
                  className={fieldClass}
                >
                  {pillarOptions.length === 0 ? (
                    <option value={row.pillar}>{row.pillar}</option>
                  ) : (
                    pillarOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))
                  )}
                </select>
              </OSField>
            </div>

            <OSField label="Idea">
              <input
                value={row.ideaTitle}
                onChange={(e) => updateField(index, 'ideaTitle', e.target.value)}
                className={fieldClass}
              />
            </OSField>

            <OSField label="Hook">
              <textarea
                value={row.hook}
                onChange={(e) => updateField(index, 'hook', e.target.value)}
                className={`${fieldClass} os-scroll min-h-[76px] resize-y leading-6`}
              />
            </OSField>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <OSField label="Format">
                <input
                  value={row.format}
                  onChange={(e) => updateField(index, 'format', e.target.value)}
                  className={fieldClass}
                />
              </OSField>
              <OSField label="CTA">
                <input
                  value={row.cta}
                  onChange={(e) => updateField(index, 'cta', e.target.value)}
                  className={fieldClass}
                />
              </OSField>
            </div>
          </OSCard>
        ))}
      </div>
    </div>
  );
}
