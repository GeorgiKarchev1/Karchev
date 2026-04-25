import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика за бисквитки | KarchX',
  description: 'Как KarchX използва бисквитки и как можете да ги управлявате.',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#2d232e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-sm font-medium text-[#534b52] hover:underline">
            ← Обратно към начало
          </Link>
          <Link href="/policies/cookies" className="text-sm font-medium text-[#534b52] hover:underline">
            English →
          </Link>
        </div>

        <h1 className="font-heading font-black text-4xl mb-2 tracking-tight">Политика за бисквитки</h1>
        <p className="text-sm text-[#2d232e]/60 mb-12">Последна актуализация: 25 април 2026 г.</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <p>
            Настоящата политика обяснява какво са бисквитките, кои използваме на{' '}
            <strong>https://www.karchx.com</strong> и как можете да ги управлявате.
          </p>

          <Section title="1. Какво са бисквитките">
            <p>
              Бисквитките (cookies) са малки текстови файлове, съхранявани на Вашето устройство при
              посещение на уебсайт. Те позволяват на сайта да запомни предпочитания и да анализира
              трафика.
            </p>
          </Section>

          <Section title="2. Видове бисквитки, които използваме">
            <div className="space-y-4">
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Задължителни (Strictly Necessary)</p>
                <p className="text-sm">
                  Необходими за функционирането на Сайта — запомняне на езикови предпочитания,
                  съгласие с бисквитки. Не изискват Вашето съгласие и не могат да бъдат изключени.
                </p>
              </div>
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Аналитични (Analytics)</p>
                <p className="text-sm">
                  Помагат ни да разберем как посетителите използват Сайта — кои страници са
                  популярни, откъде идва трафикът. Използваме Google Analytics с анонимизиране на IP.
                  Изискват Вашето съгласие.
                </p>
              </div>
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Маркетингови (Marketing)</p>
                <p className="text-sm">
                  Използват се за показване на релевантни реклами в социалните мрежи (Meta Pixel,
                  Google Ads). Изискват Вашето изрично съгласие.
                </p>
              </div>
            </div>
          </Section>

          <Section title="3. Бисквитки на трети страни">
            <p>Някои бисквитки се поставят от трети страни:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Google Analytics</strong> — анализ на трафика (политика: policies.google.com);</li>
              <li><strong>Meta Pixel</strong> — ремаркетинг и измерване на реклами (политика: facebook.com/policy);</li>
              <li><strong>Cal.com</strong> — записване на консултации (политика: cal.com/privacy).</li>
            </ul>
            <p className="mt-3">Не контролираме бисквитките, поставени от тези трети страни.</p>
          </Section>

          <Section title="4. Как да управлявате бисквитките">
            <p className="font-semibold">4.1. Чрез нашия банер:</p>
            <p className="mt-1">
              При първото посещение на Сайта ще видите банер, където можете да приемете или откажете
              незадължителните бисквитки. Можете да промените избора си по всяко време от бутона
              „Бисквитки" в долната лента на страницата.
            </p>
            <p className="font-semibold mt-4">4.2. Чрез настройките на браузъра:</p>
            <p className="mt-1">
              Повечето браузъри позволяват блокиране или изтриване на бисквитки. Имайте предвид, че
              блокирането на задължителните бисквитки може да наруши функционалността на Сайта.
            </p>
            <ul className="list-disc ml-6 space-y-1 mt-2 text-sm">
              <li>Chrome: Настройки → Поверителност → Бисквитки</li>
              <li>Firefox: Настройки → Поверителност и сигурност</li>
              <li>Safari: Настройки → Поверителност</li>
            </ul>
            <p className="font-semibold mt-4">4.3. Отказ от аналитично проследяване:</p>
            <p className="mt-1">
              Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="underline" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>
            </p>
          </Section>

          <Section title="5. Срок на съхранение">
            <ul className="list-disc ml-6 space-y-1">
              <li>Задължителни бисквитки (съгласие): до 12 месеца;</li>
              <li>Аналитични бисквитки: до 26 месеца;</li>
              <li>Маркетингови бисквитки: до 90 дни.</li>
            </ul>
          </Section>

          <Section title="6. Промени в политиката">
            <p>
              Запазваме си правото да актуализираме тази политика. Датата „Последна актуализация"
              отразява текущата версия.
            </p>
          </Section>

          <Section title="7. Контакт">
            <p>Въпроси относно бисквитките: <strong>georgikarchev5@gmail.com</strong></p>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading font-bold text-xl mb-4 text-[#2d232e]">{title}</h2>
      <div className="text-[#2d232e]/80 space-y-3">{children}</div>
    </section>
  )
}
