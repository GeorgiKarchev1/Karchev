'use client';

import { useState } from 'react';
import { useOS } from '@/context/OSContext';
import EmptyState from '@/components/os/EmptyState';
import { GlyphPlus, GlyphRefresh, GlyphTrash } from '@/components/os/icons';
import {
  OSButton,
  OSCard,
  OSChip,
  OSIconButton,
  OSLabel,
  OSSectionLabel,
} from '@/components/os/ui';
import { MODULE_BY_KEY } from '@/lib/os/modules';
import type { ContentPillar } from '@/lib/os/types';

const PILLARS = MODULE_BY_KEY.pillars;

export default function PillarsBoard() {
  const { bootstrap, profile, updatePillars, regenerate } = useOS();
  const [regenerating, setRegenerating] = useState(false);

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="We build pillars from your offer, audience, and pains. Finish onboarding to unlock this view."
      />
    );
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your first OS bootstrap"
        description="Your profile is saved. Run the generator to build pillars, ideas, hooks and a weekly plan."
        ctaLabel="Generate now"
      />
    );
  }

  const updateField = (id: string, field: keyof ContentPillar, value: string | number) => {
    const next = bootstrap.pillars.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    updatePillars(next);
  };

  const addPillar = () => {
    const id = `pillar-${Date.now()}`;
    updatePillars([
      ...bootstrap.pillars,
      {
        id,
        title: 'New pillar',
        description: 'Describe what this lane is about.',
        weight: 20,
      },
    ]);
  };

  const removePillar = (id: string) => {
    updatePillars(bootstrap.pillars.filter((p) => p.id !== id));
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      await regenerate();
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="space-y-4 px-6 pb-8 md:px-10 md:pb-10">
      {/*
        The board bar sits flush under PageHeader (which the route owns, and
        which carries the h1) so the toolbar reads as part of that band rather
        than as a second strip of chrome.
      */}
      <div className="os-settle flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <OSSectionLabel>{bootstrap.pillars.length} pillars</OSSectionLabel>
          <p className="text-[13px] text-[var(--os-faint)]">
            Weight is the share of the week a lane owns — keep the set near 100%.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <OSButton
            type="button"
            onClick={addPillar}
            icon={<GlyphPlus className="h-4 w-4" />}
          >
            Add pillar
          </OSButton>
          <OSButton
            type="button"
            tone="accent"
            onClick={handleRegenerate}
            busy={regenerating}
            icon={<GlyphRefresh className="h-4 w-4" />}
          >
            Regenerate
          </OSButton>
        </div>
      </div>

      <div className="os-stagger grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {bootstrap.pillars.map((pillar, i) => (
          <OSCard
            key={pillar.id}
            interactive
            accentA={PILLARS.accentA}
            accentB={PILLARS.accentB}
            className="flex flex-col gap-3 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <OSChip tone="accent">Pillar {i + 1}</OSChip>
              <OSIconButton
                danger
                label={`Remove pillar ${i + 1}`}
                onClick={() => removePillar(pillar.id)}
              >
                <GlyphTrash className="h-4 w-4" />
              </OSIconButton>
            </div>

            <input
              value={pillar.title}
              onChange={(e) => updateField(pillar.id, 'title', e.target.value)}
              aria-label={`Pillar ${i + 1} title`}
              className="w-full rounded-[var(--os-r-tile)] border border-transparent bg-transparent px-2 py-1.5 font-heading text-[17px] font-semibold tracking-[-0.01em] text-[var(--os-ink)] outline-none transition-colors duration-[var(--os-fast)] hover:border-[var(--os-line)] focus:border-[var(--os-accent-a)] focus:bg-white"
            />

            <textarea
              value={pillar.description}
              onChange={(e) => updateField(pillar.id, 'description', e.target.value)}
              aria-label={`Pillar ${i + 1} description`}
              className="os-scroll min-h-[84px] w-full resize-y rounded-[var(--os-r-tile)] border border-transparent bg-transparent px-2 py-1.5 text-[13px] leading-6 text-[var(--os-muted)] outline-none transition-colors duration-[var(--os-fast)] hover:border-[var(--os-line)] focus:border-[var(--os-accent-a)] focus:bg-white"
            />

            {/*
              Weight is the only numeric this board edits, so it gets a
              proportion bar as well as the figure — a bare 20 next to a
              slider reads as a setting, a filled bar reads as a share.
            */}
            <label className="mt-auto flex flex-col gap-2 border-t border-[var(--os-line)] pt-3">
              <span className="flex items-center justify-between gap-2">
                <OSLabel>Weight</OSLabel>
                <span className="text-[13px] font-semibold tabular-nums text-[var(--os-ink)]">
                  {pillar.weight}%
                </span>
              </span>
              <input
                type="range"
                min={5}
                max={50}
                value={pillar.weight}
                onChange={(e) => updateField(pillar.id, 'weight', Number(e.target.value))}
                className="w-full"
              />
              <span
                aria-hidden="true"
                className="block h-1 w-full overflow-hidden rounded-full bg-[var(--os-line)]"
              >
                <span
                  className="os-accent-edge block h-full rounded-full transition-[width] duration-[var(--os-base)] ease-[var(--os-ease)]"
                  style={{ width: `${pillar.weight}%` }}
                />
              </span>
            </label>
          </OSCard>
        ))}
      </div>
    </div>
  );
}
