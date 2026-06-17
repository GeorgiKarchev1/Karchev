import DOMPurify from 'isomorphic-dompurify'

// Allowlist-based HTML sanitizer for blog post bodies. Blog content is HTML
// produced by the AI generator / admin editor and rendered into every public
// visitor's DOM via dangerouslySetInnerHTML, so it MUST be sanitized to strip
// <script>, on* handlers, javascript: URLs, etc. before it can be stored or shown.
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'hr', 'span', 'div',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
      'blockquote', 'code', 'pre',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'figure', 'figcaption',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class'],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick'],
  })
}
