'use client'
import React, { useEffect, useRef, useState, useId } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { FaGithub, FaSlack, FaTwitter } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const STEP_GRADIENT = "bg-gradient-to-b from-black/40 via-black/80 to-black opacity-100";
const STEP_BG = { green: STEP_GRADIENT, indigo: STEP_GRADIENT, amber: STEP_GRADIENT, rose: STEP_GRADIENT } as const;
const STEP_LABEL = { green: "text-white/60", indigo: "text-white/60", amber: "text-white/60", rose: "text-white/60" } as const;

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
    /** Small line under the title on the collapsed card */
    topic?: string
    /** id of the section the card scrolls to when clicked */
    href?: string
}

export interface GridTile {
    icon: React.ComponentType<{ className?: string }>
    /** Small badge next to the icon, e.g. "1" */
    number?: string
    title?: string
    /** Little bullet points under the title */
    points?: string[]
    /** Optional code snippet + its output, shown (typed in) on hover instead of the icon/title */
    snippet?: { code: string[]; output: string[] }
    /** Optional always-visible numbered process on a coloured card */
    steps?: { label: string; text: string }[]
    stepsHeading?: string
    /** Back side of a plain card: it flips on hover and shows this */
    back?: { heading: string; text: string }
    /** Colour of the steps card */
    stepsTone?: 'green' | 'indigo' | 'amber' | 'rose'
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
    /** Optional: custom heading markup (receives splitText so letters still animate); default is the original centred caps text */
    renderCenterText?: (splitText: (text: string) => React.ReactNode) => React.ReactNode
    centerTextClassName?: string
    /** Optional: content for the plain grid tiles, in reading order (replaces the GitHub/Slack/Twitter icons + hover caption) */
    tiles?: GridTile[]
    /** Optional decorative layer rendered behind everything (absolute, non-interactive) */
    background?: React.ReactNode
}

export function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },
    className,
    showFooter = true,
    scroller,
    renderCenterText,
    centerTextClassName,
    tiles,
    background
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    // The cards stay hidden until their scroll animation is set up, so they never flash in the wrong place on load
    const [animReady, setAnimReady] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const mobileRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Safety net: never wait more than 4s for images before starting the animations
        const failsafe = window.setTimeout(handleLoad, 4000)

        // Wait for background images to load
        // Note: we target both regular images and bento images if possible
        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        return () => {
            window.clearTimeout(failsafe)
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            // The headline is shown normally on load. While scrolling down, a few random letters drop and fade out.
            const letters = Array.from(textRef.current.querySelectorAll<HTMLElement>('.char')).filter(
                (c) => c.tagName !== 'A' && !c.querySelector('svg') && !c.closest('a') && (c.textContent ?? '').trim().length === 1 && c.offsetParent !== null
            )
            const picked = gsap.utils.shuffle([...letters]).slice(0, Math.max(4, Math.round(letters.length * 0.3)))
            gsap.timeline({
                scrollTrigger: {
                    trigger: document.documentElement,
                    scroller: scroller || undefined,
                    start: 'top top',
                    end: '+=450',
                    scrub: 1,
                }
            })
                .to(picked, {
                    ease: 'sine.in',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.08,
                        from: 'random'
                    }
                })
        }

        const isSmall = window.matchMedia('(max-width: 1023px)').matches

        // Phones and tablets: cards rise one by one while scrolling
        if (isSmall && mobileRef.current) {
            mobileRef.current.querySelectorAll('.m-card').forEach((card) => {
                gsap.from(card, {
                    yPercent: 35,
                    autoAlpha: 0,
                    ease: 'sine.out',
                    scrollTrigger: {
                        trigger: card,
                        scroller: scroller || undefined,
                        start: 'top 98%',
                        end: 'top 72%',
                        scrub: 1,
                    },
                })
            })
        }

        // Animate Full Grid
        if (!isSmall && gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item: any) => {
                const colAttr = item.getAttribute('data-col');
                // Use data-col if available, fallback to a safe index calculation
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container')

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                // Animate Bento Container to move down and scale
                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.1, // Move down relative to grid
                    scale: 1.5, // Scale up the whole group
                    zIndex: 1000,
                    ease: 'power2.out', // Smooth easing
                    duration: 1,
                    force3D: true // Force hardware acceleration
                }, 0)
            }
        }
        setAnimReady(true)
    }, [isLoaded])

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    // This perfectly balances the 3rd row with 2 cards on each side of the bento container.
    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => images[i % images.length]);

    // Replace the slot where we want the bento group
    // Position at index 16 = Row 3 (middle row), spanning columns 3-5 (center)
    mixedGridItems[16] = 'BENTO_GROUP';

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            {background}
            <section className="grid place-items-center w-full relative z-[40] mt-[10vh] max-lg:mt-0 max-lg:min-h-[72svh]">
                <div ref={textRef} className={centerTextClassName ?? "text font-alt uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-neutral-900 dark:text-white"}>
                    {renderCenterText ? renderCenterText(splitText) : splitText(centerText)}
                </div>
            </section>

            <section style={{ visibility: animReady ? undefined : "hidden" }} className="grid place-items-center w-full relative max-lg:hidden">
                <div ref={gridFullRef} style={{ marginBottom: "calc(24vh - 41.4vw + 10px)" }} className="grid--full relative w-full mt-[4vh] h-auto aspect-[1.45] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            // Render the HoverExpand Group using passed bentoItems
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={2} className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform">
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        return (
                                            <div
                                                key={bentoItem.id}
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                    isActive
                                                        ? "bg-zinc-900/10 shadow-2xl"
                                                        : "bg-transparent"
                                                )}
                                                style={{ width: isActive ? "60%" : "20%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => { setActiveBento(index); if (bentoItem.href) document.getElementById(bentoItem.href)?.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                                            >
                                                {/* Border Overlay - Fixes edge artifacts by sitting on top */}
                                                <div className={cn(
                                                    "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                                                    isActive
                                                        ? "border-zinc-500/50"
                                                        : "border-zinc-800/50 group-hover:border-zinc-700"
                                                )} />

                                                {/* Image - always visible, the card only expands on hover */}
                                                <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0 group/img">
                                                    {bentoItem.image && (
                                                        <>
                                                            <img
                                                                src={bentoItem.image}
                                                                alt={bentoItem.title}
                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                                                            />
                                                            {/* Text Protection Gradient - only while expanded */}
                                                            <div className={cn("absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")} />
                                                        </>
                                                    )}
                                                </div>

                                                {/* Content Container */}
                                                <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                    {/* Active State Content */}
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                    )}>
                                                        {/* Footer: topic, headline and context */}
                                                        <div className="absolute bottom-0 left-0 w-full flex items-end justify-between gap-3 px-5 pb-4 pt-10 z-20">
                                                            <div className="relative z-10 flex min-w-0 flex-col gap-1">
                                                                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">{bentoItem.title}</span>
                                                                <h3 className="text-[15px] font-semibold leading-[1.15] tracking-tight text-white drop-shadow-md xl:text-[17px]">{bentoItem.subtitle}</h3>
                                                                <p className="text-[11px] leading-[1.35] text-white/75 xl:text-xs">{bentoItem.description}</p>
                                                            </div>
                                                            <div className="relative z-10 shrink-0 text-white/90 drop-shadow-md">
                                                                {bentoItem.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                        // Skip rendering for the slots that the group takes up
                        // Group starts at 16, takes 17, 18.
                        if (i === 17 || i === 18) return null;

                        // Middle row (slots 7-13) removed
                        if (i >= 7 && i <= 13) return null;

                        if (typeof item === 'string') {
                            const Icon = i % 3 === 0 ? FaGithub : i % 3 === 1 ? FaSlack : FaTwitter;
                            const label = i % 3 === 0 ? "Github" : i % 3 === 1 ? "Slack" : "Twitter";
                            // Tile order skips the 3 bento slots (16-18)
                            const tile = tiles?.[[0, 1, 2, 3, 4, 5, 6, 14, 15, 19, 20].indexOf(i)];

                            return (
                                <figure key={`img-${i}`} data-col={i % 7} className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-300 bg-zinc-100 dark:bg-gradient-to-b dark:from-white dark:to-zinc-200 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent">

                                        {/* Gradient Overlay for Hover */}
                                        <div className={`absolute inset-0 backdrop-blur-[2px] transition-opacity duration-500 z-0 ${tile?.steps ? STEP_BG[tile.stepsTone ?? "green"] : "bg-gradient-to-b from-black/40 via-black/80 to-black"} ${tile?.back ? "hidden" : tile?.snippet || tile?.steps ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                                        {tile?.back ? (
                                            <div className="relative z-10 h-full w-full [perspective:800px]">
                                                <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)]">
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center [backface-visibility:hidden] lg:gap-3 lg:p-3">
                                                        <tile.icon className="h-8 w-8 shrink-0 text-black lg:h-12 lg:w-12 xl:h-14 xl:w-14" />
                                                        {tile.title && <h4 className="hidden text-[11px] font-semibold leading-[1.2] tracking-tight text-black lg:block xl:text-[13px]">{tile.title}</h4>}
                                                    </div>
                                                    <div className="absolute inset-0 hidden flex-col justify-center gap-1.5 bg-gradient-to-b from-zinc-600 via-zinc-900 to-black p-3 text-left [backface-visibility:hidden] [transform:rotateY(180deg)] lg:flex xl:p-4">
                                                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/60 xl:text-[9px]">{tile.back.heading}</span>
                                                        <p className="text-[10px] leading-[1.35] text-white xl:text-[11.5px]">{tile.back.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : tile ? (
                                            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center lg:gap-3 lg:p-3">
                                                <tile.icon className={`h-8 w-8 shrink-0 text-black transition-colors duration-300 group-hover:text-white lg:h-12 lg:w-12 xl:h-14 xl:w-14 ${tile.snippet || tile.steps ? "!text-white lg:opacity-0" : ""}`} />
                                                {tile.title && (
                                                    <h4 className={`hidden text-[11px] font-semibold leading-[1.2] tracking-tight text-black transition-colors duration-300 group-hover:text-white lg:block xl:text-[13px] ${tile.snippet || tile.steps ? "lg:opacity-0" : ""}`}>{tile.title}</h4>
                                                )}
                                                {tile.steps && (
                                                    <div className="pointer-events-none absolute inset-0 hidden flex-col justify-center gap-2.5 p-3 text-left lg:flex xl:p-4">
                                                        <div className={`snip-line font-mono text-[8px] uppercase tracking-[0.18em] ${STEP_LABEL[tile.stepsTone ?? "green"]} xl:text-[9px]`} style={{ ["--d" as string]: "0s" } as React.CSSProperties}>{tile.stepsHeading ?? "Website in 3 steps"}</div>
                                                        {tile.steps.map((st, k) => (
                                                            <div key={k} className="snip-line flex items-start gap-2" style={{ ["--d" as string]: `${(k + 1) * 0.5}s` } as React.CSSProperties}>
                                                                <span className="mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/90 text-[9px] font-bold text-[#0f2a25]">{k + 1}</span>
                                                                <span className="text-[10px] leading-[1.25] text-white xl:text-[11px]"><b className="font-semibold">{st.label}</b><br /><span className="text-white/65">{st.text}</span></span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {tile.snippet && (
                                                    <div className="pointer-events-none absolute inset-0 hidden flex-col justify-center gap-2 p-3 text-left font-mono text-[8px] leading-[1.5] lg:flex xl:p-3 xl:text-[9px]">
                                                        <div className="space-y-0.5">
                                                            {tile.snippet.code.map((l, k) => (
                                                                <div key={k} className="snip-line whitespace-pre text-[#7cb7ff]" style={{ ["--d" as string]: `${k * 0.45}s` } as React.CSSProperties}>
                                                                    <span className="text-white/40">&gt;&gt; </span><span className="text-white/90">{l}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="space-y-0.5 border-t border-white/15 pt-2">
                                                            {tile.snippet.output.map((l, k) => (
                                                                <div key={k} className="snip-line whitespace-pre text-[#8fd694]" style={{ ["--d" as string]: `${(tile.snippet!.code.length + 1) * 0.45 + k * 0.4}s` } as React.CSSProperties}>{l}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                                {/* Icon */}
                                                <Icon className="w-8 h-8 text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
    
                                                {/* Text Reveal */}
                                                <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                    <span className="block text-[10px] font-medium text-white/90 uppercase tracking-wider mb-0.5">Build with</span>
                                                    <span className="block text-sm font-bold text-white tracking-tight">{label}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section >


            {/* Phones and tablets: the same cards, shown with their text */}
            <section ref={mobileRef} style={{ visibility: animReady ? undefined : "hidden" }} className="relative z-10 mx-auto w-full max-w-[640px] px-2 pb-6 pt-2 lg:hidden">
                {/* Small cards: one slow, endless carousel drifting left to right (the list is repeated so it loops seamlessly) */}
                <div className="overflow-hidden">
                <div className="m-marquee flex w-max">
                {[0, 1].map((copy) => (
                <div key={`copy-${copy}`} className="flex gap-2 pr-2" aria-hidden={copy === 1 ? true : undefined}>
                    {(tiles ?? []).filter((t) => t.title || t.steps || t.snippet).map((t, n) => {
                        const dark = !!(t.steps || t.snippet)
                        return (
                            <div
                                key={`m-${copy}-${n}`}
                                className={cn(
                                    "relative flex h-[150px] w-[150px] shrink-0 flex-col gap-1.5 overflow-hidden rounded-xl border p-2.5",
                                    dark
                                        ? "border-zinc-800/50 bg-gradient-to-b from-zinc-600 via-zinc-900 to-black text-white"
                                        : "border-zinc-200 bg-zinc-100 text-black dark:border-zinc-300 dark:bg-gradient-to-b dark:from-white dark:to-zinc-200"
                                )}
                            >
                                {!dark && t.back ? (
                                    <>
                                        {/* Front: icon + sentence, then the back side fades in (like the flip on desktop) */}
                                        <div className="m-front absolute inset-0 flex flex-col gap-1.5 p-2.5" style={{ animationDelay: `-${(n % 4) * 1.6}s` }}>
                                            <t.icon className="h-6 w-6 shrink-0 text-black" />
                                            {t.title && <h4 className="text-[11px] font-semibold leading-[1.2] tracking-tight text-black">{t.title}</h4>}
                                        </div>
                                        <div className="m-back absolute inset-0 flex flex-col justify-center gap-1 bg-gradient-to-b from-zinc-600 via-zinc-900 to-black p-2.5 text-left text-white" style={{ animationDelay: `-${(n % 4) * 1.6}s` }}>
                                            <span className="font-mono text-[6.5px] uppercase tracking-[0.14em] text-white/60">{t.back.heading}</span>
                                            <p className="text-[8.5px] leading-[1.35] text-white">{t.back.text}</p>
                                        </div>
                                    </>
                                ) : !dark ? (
                                    <>
                                        <t.icon className="h-6 w-6 shrink-0 text-black" />
                                        {t.title && <h4 className="text-[11px] font-semibold leading-[1.2] tracking-tight text-black">{t.title}</h4>}
                                    </>
                                ) : null}
                                {t.steps && (
                                    <div className="flex flex-1 flex-col justify-center gap-2">
                                        <div className="snip-line font-mono text-[6.5px] uppercase tracking-[0.14em] text-white/60" style={{ ["--d" as string]: "0s" } as React.CSSProperties}>{t.stepsHeading ?? "Website in 3 steps"}</div>
                                        {t.steps.map((st, k) => (
                                            <div key={k} className="snip-line flex items-start gap-1.5" style={{ ["--d" as string]: `${(k + 1) * 0.5}s` } as React.CSSProperties}>
                                                <span className="mt-[1px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white/90 text-[8px] font-bold text-[#0f2a25]">{k + 1}</span>
                                                <span className="text-[8.5px] leading-[1.25] text-white"><b className="font-semibold">{st.label}</b><br /><span className="text-white/65">{st.text}</span></span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {t.snippet && (
                                    <div className="flex flex-1 flex-col justify-center gap-2 font-mono text-[7px] leading-[1.45]">
                                        <div className="space-y-0.5">
                                            {t.snippet.code.map((l, k) => (
                                                <div key={k} className="snip-line whitespace-pre-wrap break-words text-[#7cb7ff]" style={{ ["--d" as string]: `${k * 0.45}s` } as React.CSSProperties}>
                                                    <span className="text-white/40">&gt;&gt; </span><span className="text-white/90">{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-0.5 border-t border-white/15 pt-2">
                                            {t.snippet.output.map((l, k) => (
                                                <div key={k} className="snip-line whitespace-pre-wrap text-[#8fd694]" style={{ ["--d" as string]: `${(t.snippet!.code.length + 1) * 0.45 + k * 0.4}s` } as React.CSSProperties}>{l}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                ))}
                </div>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                    {(bentoItems ?? []).map((b) => (
                        <div
                            key={`mb-${b.id}`}
                            role={b.href ? "link" : undefined}
                            tabIndex={b.href ? 0 : undefined}
                            onClick={() => { if (b.href) document.getElementById(b.href)?.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                            onKeyDown={(e) => { if (b.href && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); document.getElementById(b.href)?.scrollIntoView({ behavior: "smooth", block: "start" }) } }}
                            className="m-card relative min-h-[210px] cursor-pointer overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950">
                            {b.image && <img src={b.image} alt={b.title} className="absolute inset-0 h-full w-full object-cover opacity-90" />}
                            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/70 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4">
                                <div className="flex min-w-0 flex-col gap-1">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">{b.title}</span>
                                    <h3 className="text-[17px] font-semibold leading-[1.15] tracking-tight text-white">{b.subtitle}</h3>
                                    <p className="text-xs leading-[1.35] text-white/75">{b.description}</p>
                                </div>
                                <div className="shrink-0 text-white/90">{b.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider">
                    <span className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</span>
                    <span className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</span>
                </footer>
            )}
        </div >
    )
}

export default StaggeredGrid
