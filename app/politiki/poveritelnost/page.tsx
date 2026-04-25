import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика за поверителност | KarchX',
  description: 'Как KarchX събира, използва и защитава личните ви данни.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#2d232e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-sm font-medium text-[#534b52] hover:underline">
            ← Обратно към начало
          </Link>
          <Link href="/policies/privacy-policy" className="text-sm font-medium text-[#534b52] hover:underline">
            English →
          </Link>
        </div>

        <h1 className="font-heading font-black text-4xl mb-2 tracking-tight">Политика за поверителност</h1>
        <p className="text-sm text-[#2d232e]/60 mb-12">Последна актуализация: 25 април 2026 г.</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <p>
            Настоящата Политика за поверителност описва как <strong>KarchX</strong> (Георги Кърчев,{' '}
            <strong>https://www.karchx.com</strong>) събира, използва, съхранява и защитава личните Ви
            данни. Прилагаме Регламент (ЕС) 2016/679 (GDPR) и приложимото българско законодателство.
          </p>

          <Section title="1. Администратор на лични данни">
            <ul className="space-y-1">
              <li><strong>Администратор:</strong> Георги Кърчев</li>
              <li><strong>Търговско наименование:</strong> KarchX</li>
              <li><strong>Уебсайт:</strong> https://www.karchx.com</li>
              <li><strong>Имейл за връзка:</strong> georgikarchev5@gmail.com</li>
            </ul>
          </Section>

          <Section title="2. Какви данни събираме">
            <p className="font-semibold">2.1. Данни, които Вие предоставяте директно:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Имена и фамилия;</li>
              <li>Имейл адрес;</li>
              <li>Телефонен номер (по желание);</li>
              <li>Информация за Вашия проект/бизнес, споделена в запитване или консултация;</li>
              <li>Достъпи до платформи (домейн, хостинг, социални профили) — само когато е необходимо за изпълнение на услугата.</li>
            </ul>
            <p className="font-semibold mt-4">2.2. Данни, събирани автоматично:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>IP адрес и тип браузър;</li>
              <li>Страниците, които посещавате, и времето на престой;</li>
              <li>Данни за устройство (мобилно/десктоп, ОС);</li>
              <li>Бисквитки и подобни технологии (виж{' '}
                <Link href="/politiki/biskvitki" className="underline">Политика за бисквитки</Link>).
              </li>
            </ul>
          </Section>

          <Section title="3. Как използваме данните">
            <ul className="list-disc ml-6 space-y-1">
              <li>За отговор на запитвания и изпращане на оферти;</li>
              <li>За изпълнение на договорени услуги (уеб разработка, контент, автоматизации);</li>
              <li>За изпращане на важна информация, свързана с вашия проект;</li>
              <li>За подобряване на Сайта и Услугите ни;</li>
              <li>За спазване на законови задължения;</li>
              <li>За маркетинг само с Вашето изрично съгласие.</li>
            </ul>
          </Section>

          <Section title="4. Правно основание за обработка">
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Изпълнение на договор</strong> — обработка, необходима за предоставяне на услугата;</li>
              <li><strong>Легитимен интерес</strong> — анализ и подобряване на Сайта, защита от злоупотреби;</li>
              <li><strong>Съгласие</strong> — маркетингови съобщения и незадължителни бисквитки;</li>
              <li><strong>Законово задължение</strong> — когато законът изисква обработка.</li>
            </ul>
          </Section>

          <Section title="5. Споделяне на данни с трети страни">
            <p>Не продаваме личните Ви данни. Можем да споделяме данни само с:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Доставчици на хостинг и инфраструктура</strong> — за функционирането на Сайта;</li>
              <li><strong>Аналитични инструменти</strong> (напр. Google Analytics) — с анонимизирани данни за трафика;</li>
              <li><strong>Платежни оператори</strong> — при извършване на плащания; те имат собствени политики за поверителност;</li>
              <li><strong>Компетентни органи</strong> — при законово задължение.</li>
            </ul>
          </Section>

          <Section title="6. Международен трансфер на данни">
            <p>
              Някои инструменти (Google, Meta и др.) могат да обработват данни извън ЕС. В тези
              случаи разчитаме на стандартни договорни клаузи, одобрени от ЕК, или на решения за
              адекватност.
            </p>
          </Section>

          <Section title="7. Колко дълго съхраняваме данните">
            <ul className="list-disc ml-6 space-y-1">
              <li>Данни от запитвания без сключен договор: до 12 месеца;</li>
              <li>Данни, свързани с изпълнен договор: до 5 години (счетоводни задължения);</li>
              <li>Данни с маркетингово съгласие: до оттегляне на съгласието;</li>
              <li>Аналитични/бисквитки данни: съгласно Политиката за бисквитки.</li>
            </ul>
          </Section>

          <Section title="8. Вашите права">
            <p>Имате право да:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Достъп</strong> — да получите копие от данните, които обработваме;</li>
              <li><strong>Коригиране</strong> — да поискате корекция на неточни данни;</li>
              <li><strong>Изтриване</strong> — „правото да бъдете забравени" при наличие на основание;</li>
              <li><strong>Ограничаване</strong> — да ограничите обработката при спор;</li>
              <li><strong>Преносимост</strong> — да получите данните в машинно-четим формат;</li>
              <li><strong>Оттегляне на съгласие</strong> — по всяко време, без да засяга законността на предишна обработка;</li>
              <li><strong>Жалба</strong> — до Комисия за защита на личните данни (www.cpdp.bg).</li>
            </ul>
            <p className="mt-3">
              За упражняване на права: <strong>georgikarchev5@gmail.com</strong>. Ще отговорим в
              рамките на 30 дни.
            </p>
          </Section>

          <Section title="9. Бисквитки">
            <p>
              Използваме бисквитки и подобни технологии. Подробности в нашата{' '}
              <Link href="/politiki/biskvitki" className="underline font-medium">Политика за бисквитки</Link>.
            </p>
          </Section>

          <Section title="10. Сигурност">
            <p>
              Прилагаме технически и организационни мерки за защита на данните (криптирана връзка
              HTTPS, ограничен достъп, сигурно съхранение). При нарушение на сигурността ще Ви
              уведомим съгласно приложимото законодателство.
            </p>
          </Section>

          <Section title="11. Промени в политиката">
            <p>
              Запазваме си правото да актуализираме тази политика. При съществени промени ще поставим
              видимо известие на Сайта. Датата „Последна актуализация" отразява текущата версия.
            </p>
          </Section>

          <Section title="12. Контакт">
            <ul className="space-y-1">
              <li><strong>Имейл:</strong> georgikarchev5@gmail.com</li>
              <li><strong>Сайт:</strong> https://www.karchx.com</li>
            </ul>
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
