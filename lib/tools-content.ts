import type { Metadata } from 'next'
import type { ToolsResourcePageProps } from '@/components/seo/ToolsResourcePage'
import { localizedAlternates } from '@/lib/site'

type ToolsPageDefinition = ToolsResourcePageProps & { metadata: Metadata }

const tools = [
  {
    id: 'rtk',
    name: 'RTK — Rust Token Killer',
    desc: 'A CLI proxy that cuts Claude Code token usage by 60–90% on everyday dev operations. Transparent drop-in: your commands stay the same.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Claude Code',
    status: 'available' as const,
    link: 'https://github.com/GeorgiKarchev1',
  },
  {
    id: 'mcp-pack',
    name: 'Claude MCP Server Pack',
    desc: 'A curated set of MCP servers that turn Claude into a real dev companion — filesystem, browser control, search, and more.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'MCP',
    status: 'coming-soon' as const,
    link: null,
  },
  {
    id: 'content-ai',
    name: 'AI Content Workflow',
    desc: 'The exact prompts and automation setup used for scripting, planning, and repurposing content without wasting hours.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Content',
    status: 'coming-soon' as const,
    link: null,
  },
  {
    id: 'claude-hooks',
    name: 'Claude Code Hooks Library',
    desc: 'Drop-in hooks for Claude Code: lint on edit, smarter commit messages, and test-before-commit guardrails.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Claude Code',
    status: 'coming-soon' as const,
    link: null,
  },
]

export const toolsPages: Record<string, ToolsPageDefinition> = {
  bgTools: {
    locale: 'bg',
    path: '/bg/tools',
    eyebrow: 'Безплатни инструменти и ресурси',
    title: 'Инструменти, които работят',
    highlight: 'толкова здраво, колкото и ти.',
    intro: 'Безплатни MCP сървъри, Claude Code setups и automation ресурси, изградени от реални workflows, не от повърхностни tutorial-и.',
    liveNotice: 'Постепенно добавям още инструменти и setup ресурси',
    tools,
    ctaEyebrow: 'Искаш custom automation?',
    ctaTitle: 'Правя и bespoke AI setups,\nworkflow automation и client-facing системи.',
    ctaLabel: 'Запази безплатен разговор',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    internalLinksTitle: 'Връзка към комерсиалните страници',
    internalLinks: [
      {
        href: '/bg/ai-avtomatizatsii',
        label: 'AI автоматизации',
        description: 'Ако искаш същия тип logic, но приложен към твоя бизнес процес.',
      },
      {
        href: '/bg/landing-stranitsi',
        label: 'Landing страници',
        description: 'За page + automation комбинации, които трябва да събират и обработват lead-ове.',
      },
      {
        href: '/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes',
        label: 'AI статии',
        description: 'Практически content около automation use-case-ите, които реално имат смисъл.',
      },
    ],
    metadata: {
      title: 'Безплатни AI и dev инструменти',
      description: 'Безплатни MCP сървъри, Claude Code setup ресурси и automation инструменти от Karchev.',
      alternates: localizedAlternates('/bg/tools', '/en/tools', 'bg'),
    },
  },
  enTools: {
    locale: 'en',
    path: '/en/tools',
    eyebrow: 'Free Tools & Resources',
    title: 'Tools that work',
    highlight: 'as hard as you do.',
    intro: 'Free MCP servers, Claude Code setups, and automation resources built from real workflows, not surface-level tutorials.',
    liveNotice: 'More tools and workflow assets are rolling out steadily',
    tools,
    ctaEyebrow: 'Want custom AI tooling?',
    ctaTitle: 'I also build bespoke Claude setups,\nautomation systems, and client-facing workflows.',
    ctaLabel: 'Book a free call',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    internalLinksTitle: 'Commercial paths connected to these tools',
    internalLinks: [
      {
        href: '/en/ai-automation',
        label: 'AI automation',
        description: 'When you want the same logic adapted to a real business workflow.',
      },
      {
        href: '/en/landing-pages',
        label: 'Landing pages',
        description: 'For page + automation systems that need to capture and route leads properly.',
      },
      {
        href: '/en/blog/how-ai-automation-saves-time-for-small-businesses',
        label: 'AI articles',
        description: 'Supporting content around practical automation use cases for smaller teams.',
      },
    ],
    metadata: {
      title: 'Free AI and Developer Tools',
      description: 'Free MCP servers, Claude Code setup resources, and automation tools by Karchev.',
      alternates: localizedAlternates('/bg/tools', '/en/tools', 'en'),
    },
  },
}
