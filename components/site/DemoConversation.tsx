'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Turn = { role: 'user' | 'bot'; text: string };

/**
 * A scripted transcript, not a live model call. It shows what talking to a
 * KARCHX integration feels like without costing an API request per visitor —
 * the real assistant sits behind the CTA beside it.
 */
const SCRIPTS: Record<'bg' | 'en', Turn[]> = {
  bg: [
    { role: 'user', text: 'Получаваме 200 имейла на ден. Може ли AI да ги сортира?' },
    {
      role: 'bot',
      text: 'Да. Свързвам пощата ви с модел, който чете, категоризира и маркира спешните. Отговорите остават ваши — AI само подготвя черновата.',
    },
    { role: 'user', text: 'А данните ни къде отиват?' },
    {
      role: 'bot',
      text: 'Никъде. Работя вътре във вашите системи и нищо не се качва за обучение на модели. 🔒',
    },
  ],
  en: [
    { role: 'user', text: 'We get 200 emails a day. Can AI sort them?' },
    {
      role: 'bot',
      text: 'Yes. I connect your inbox to a model that reads, categorises and flags the urgent ones. Replies stay yours — the AI only drafts.',
    },
    { role: 'user', text: 'And where does our data go?' },
    {
      role: 'bot',
      text: 'Nowhere. I work inside your own systems, and nothing is uploaded to train a model. 🔒',
    },
  ],
};

const THINKING_MS = 750;
const TYPE_MS = 18;
const PAUSE_MS = 850;

// useLayoutEffect warns during SSR; the animation only needs to beat first paint
// on the client, so fall back to useEffect on the server.
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function DemoConversation({ bg }: { bg: boolean }) {
  const script = SCRIPTS[bg ? 'bg' : 'en'];

  // Seeded with the whole transcript so the server-rendered markup is complete.
  // If JS never runs, or motion is unwelcome, that is exactly what stays.
  const [shown, setShown] = useState<Turn[]>(script);
  const [typing, setTyping] = useState('');
  const [thinking, setThinking] = useState(false);
  const [animate, setAnimate] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Clear the transcript before the browser paints, but only when we are
  // actually going to replay it.
  useBeforePaint(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown([]);
    setAnimate(true);
  }, []);

  useEffect(() => {
    const node = logRef.current;
    if (!node || !animate) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    async function play() {
      for (const turn of script) {
        if (cancelled) return;

        if (turn.role === 'user') {
          await wait(PAUSE_MS);
          if (cancelled) return;
          setShown((prev) => [...prev, turn]);
          continue;
        }

        setThinking(true);
        await wait(THINKING_MS);
        if (cancelled) return;
        setThinking(false);

        for (let i = 1; i <= turn.text.length; i++) {
          await wait(TYPE_MS);
          if (cancelled) return;
          setTyping(turn.text.slice(0, i));
        }

        setTyping('');
        setShown((prev) => [...prev, turn]);
      }
    }

    // Only start once the panel is on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        void play();
      },
      { threshold: 0.35 }
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, [animate, script]);

  // Keep the newest message in view as the transcript grows.
  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [shown, typing, thinking]);

  const speaker = (role: Turn['role']) =>
    role === 'user' ? (bg ? 'Клиент' : 'Client') : bg ? 'Асистент' : 'Assistant';

  return (
    <div className="studio-demo-window">
      <div className="studio-demo-bar">
        <span className="studio-demo-dot" aria-hidden="true" />
        <span>{bg ? 'KARCHX асистент' : 'KARCHX assistant'}</span>
        <span>{bg ? 'Примерен разговор' : 'Sample exchange'}</span>
      </div>

      {/* The typed-out version is decorative; assistive tech reads the static
          transcript below it instead of a stream of partial words. */}
      <div className="studio-demo-log" ref={logRef} aria-hidden="true">
        {shown.map((turn, index) => (
          <div key={`${turn.role}-${index}`} className={'studio-demo-row is-' + turn.role}>
            <p className="studio-demo-bubble">{turn.text}</p>
          </div>
        ))}

        {thinking && (
          <div className="studio-demo-row is-bot">
            <div className="studio-demo-bubble studio-demo-thinking">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}

        {typing && (
          <div className="studio-demo-row is-bot">
            <p className="studio-demo-bubble">
              {typing}
              <span className="studio-demo-caret" />
            </p>
          </div>
        )}
      </div>

      <div className="sr-only">
        <h4>{bg ? 'Примерен разговор с AI асистент' : 'Sample conversation with an AI assistant'}</h4>
        <dl>
          {script.map((turn, index) => (
            <div key={`sr-${index}`}>
              <dt>{speaker(turn.role)}</dt>
              <dd>{turn.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
