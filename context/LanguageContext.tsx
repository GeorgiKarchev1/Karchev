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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Try to get from localStorage if needed, but simple default is BG
    const [language, setLanguage] = useState<Language>('BG')

    // Optional: Persist to local storage
    useEffect(() => {
        const saved = localStorage.getItem('language')
        if (saved === 'EN' || saved === 'BG') {
            setLanguage(saved)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const t = (key: string) => {
        const keys = key.split('.')
        let current: any = translations[language]
        for (const k of keys) {
            if (current === undefined || current[k] === undefined) {
                console.warn(`Missing translation for key: ${key} in language: ${language}`)
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
