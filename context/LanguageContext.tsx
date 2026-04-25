'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/lib/translations'

type Language = 'EN' | 'BG'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
    return match ? decodeURIComponent(match[1]) : undefined
}

function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('BG')

    useEffect(() => {
        // User has manually chosen a language before — respect that
        const userPref = getCookie('user-lang-preference')
        if (userPref === 'EN' || userPref === 'BG') {
            setLanguageState(userPref)
            return
        }

        // Fall back to geo-detected language set by middleware
        const detected = getCookie('detected-country-lang')
        if (detected === 'EN' || detected === 'BG') {
            setLanguageState(detected)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        // Persist manual choice so it overrides geo-detection on next visit
        setCookie('user-lang-preference', lang)
    }

    const t = (key: string) => {
        const keys = key.split('.')
        let current: any = translations[language]
        for (const k of keys) {
            if (current === undefined || current[k] === undefined) {
                return key
            }
            current = current[k]
        }
        return current
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
