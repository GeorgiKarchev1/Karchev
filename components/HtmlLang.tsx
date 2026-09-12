'use client'

/**
 * Corrects <html lang> for a route subtree.
 *
 * Next.js App Router renders <html> only in the single root layout, and that
 * layout has to stay free of request-time APIs (headers(), cookies()) or every
 * route in the app falls back to dynamic rendering. So the root ships
 * lang="bg" and the English subtrees patch the attribute here instead.
 *
 * The script is inlined into the prerendered HTML and runs while the document
 * is still parsing, so assistive tech reads the page with the right language.
 * Language targeting for search engines rides on the hreflang alternates in
 * each page's metadata, not on this attribute.
 */
export default function HtmlLang({ lang }: { lang: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)}`,
      }}
    />
  )
}
