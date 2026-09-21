/**
 * The single source of truth for OS navigation.
 *
 * The rail, the command bar, the mobile switcher and the overview grid all read
 * this list. Previously the desktop sidebar and the mobile nav each carried
 * their own copy and had already drifted apart ("Weekly Ideas" vs "Ideas").
 */

export type ModuleKey =
  | 'overview'
  | 'setup'
  | 'pillars'
  | 'ideas'
  | 'hooks'
  | 'repurpose'
  | 'plan'

export interface OSModule {
  key: ModuleKey
  href: string
  /** Full name, used in the rail and page headers. */
  label: string
  /** Compact name for the command bar and mobile switcher. */
  shortLabel: string
  /** One line explaining what the module is for. */
  blurb: string
  /** Identity gradient stops; mirrored as CSS vars in app/os.css. */
  accentA: string
  accentB: string
  /** Modules that only make sense once a bootstrap exists. */
  requiresContent?: boolean
}

export const OS_MODULES: OSModule[] = [
  {
    key: 'overview',
    href: '/os',
    label: 'Overview',
    shortLabel: 'Overview',
    blurb: 'System status and every module at a glance.',
    accentA: '#5b7cfa',
    accentB: '#7c5bfa',
  },
  {
    key: 'setup',
    href: '/os/onboarding',
    label: 'Setup',
    shortLabel: 'Setup',
    blurb: 'Teach the system your business once.',
    accentA: '#2fb6a8',
    accentB: '#38d2a4',
  },
  {
    key: 'pillars',
    href: '/os/pillars',
    label: 'Pillars',
    shortLabel: 'Pillars',
    blurb: 'The few themes everything you publish ladders up to.',
    accentA: '#ef9445',
    accentB: '#f2c14e',
    requiresContent: true,
  },
  {
    key: 'ideas',
    href: '/os/ideas',
    label: 'Ideas',
    shortLabel: 'Ideas',
    blurb: 'A running queue of posts, sorted by pillar and status.',
    accentA: '#e85d9a',
    accentB: '#f281ac',
    requiresContent: true,
  },
  {
    key: 'hooks',
    href: '/os/hooks',
    label: 'Hooks',
    shortLabel: 'Hooks',
    blurb: 'Opening lines that earn the second line.',
    accentA: '#ee5a5a',
    accentB: '#f2803f',
    requiresContent: true,
  },
  {
    key: 'repurpose',
    href: '/os/repurpose',
    label: 'Repurpose',
    shortLabel: 'Repurpose',
    blurb: 'One piece of source copy, five platform-native cuts.',
    accentA: '#3fa9f5',
    accentB: '#4fd1e8',
  },
  {
    key: 'plan',
    href: '/os/plan',
    label: 'Plan',
    shortLabel: 'Plan',
    blurb: 'The week laid out, Monday to Friday.',
    accentA: '#7e6bf2',
    accentB: '#a98bf5',
    requiresContent: true,
  },
]

export const MODULE_BY_KEY = Object.fromEntries(
  OS_MODULES.map((m) => [m.key, m]),
) as Record<ModuleKey, OSModule>

/** Longest-prefix match, so /os/ideas wins over the /os root entry. */
export function moduleForPath(pathname: string): OSModule {
  const match = OS_MODULES.filter(
    (m) => m.href !== '/os' && pathname.startsWith(m.href),
  ).sort((a, b) => b.href.length - a.href.length)[0]
  return match ?? MODULE_BY_KEY.overview
}

export function isModuleActive(module: OSModule, pathname: string): boolean {
  return module.href === '/os'
    ? pathname === '/os'
    : pathname.startsWith(module.href)
}
