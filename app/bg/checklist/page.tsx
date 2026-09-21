import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { checklistGroups } from '@/lib/checklist'
import { GUIDE_URL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact-info'
import { BASE_URL, withSocialMetadata } from '@/lib/site'

export const metadata: Metadata = withSocialMetadata({
  title: '12 проверки: къде губите запитвания',
  description: 'Безплатно практическо ръководство за офертата, сайта и отговора към клиента. 12 проверки, готови примери и план за първото подобрение. Четете онлайн или свалете PDF.',
  alternates: { canonical: `${BASE_URL}/bg/checklist` },
}, { locale: 'bg', path: '/bg/checklist' })

function Groups({ start, end }: { start: number; end: number }) {
  return <>{checklistGroups.slice(start, end).map((group, groupIndex) => <section className="checklist-group" key={group.title}><h2>{group.title}</h2><ol start={(start + groupIndex) * 3 + 1}>{group.items.map(item => <li key={item.title}><h3>{item.title}</h3><p><strong>Проверете:</strong> {item.test}</p><p><strong>Първа стъпка:</strong> {item.action}</p><p className="checklist-answer">☐ Работи &nbsp; ☐ За подобрение &nbsp; ☐ Не знам</p></li>)}</ol></section>)}</>
}

export default function ChecklistPage() {
  return <div className="agent-site checklist-site">
    <a href="#main-content" className="studio-skip">Към съдържанието</a><Navbar />
    <main id="main-content" className="checklist-main">
      <div className="checklist-screen-actions"><Link href="/bg">← Към KARCHX</Link><a href={GUIDE_URL} download>Свалете PDF ↓</a></div>
      <article>
        <div className="checklist-sheet">
          <header className="checklist-heading"><p className="checklist-brand">KARCHX · Практическо ръководство</p><h1>12 проверки:<br />къде губите запитвания</h1><p>За бизнеси, които вече имат интерес към услугите си, но искат по-ясен път от първия въпрос до решението на клиента.</p><p>Отделете 20–30 минути. Проверете всяко твърдение с реален пример и отбележете отговора. „Не знам“ е задача за проверка, а не автоматично доказателство за проблем.</p></header>
          <Groups start={0} end={2} />
          <p className="checklist-page-note">01 / 04 · Оферта и сайт · karchx.com</p>
        </div>
        <div className="checklist-sheet">
          <header className="checklist-heading"><p className="checklist-brand">KARCHX · От първия въпрос до решение</p><h2>Какво се случва<br />след запитването?</h2><p>Проверете последните реални разговори. Един пропуск е сигнал за преглед; повтарящите се пропуски помагат да изберете откъде да започнете.</p></header>
          <Groups start={2} end={4} />
          <p className="checklist-page-note">02 / 04 · Отговор и проследяване · karchx.com</p>
        </div>
        <div className="checklist-sheet">
          <header className="checklist-heading"><p className="checklist-brand">KARCHX · Примери за адаптиране</p><h2>По-лесна следваща стъпка<br />за Вашия клиент.</h2><p>Следните текстове са примерни. Попълнете скобите с вярна информация и ги съобразете с конкретното запитване.</p></header>
          <section className="checklist-template"><h3>Първи отговор на запитване</h3><blockquote>Здравейте, [име]! Благодаря за въпроса за [услуга]. [Директен отговор за цената, срока или възможността, за която човекът пита.] За да Ви насоча точно, бихте ли уточнили [един необходим въпрос]? След това мога да Ви изпратя [конкретна информация] или да се чуем за [цел на разговора].</blockquote><p>Ако още нямате точен отговор, кажете какво трябва да проверите и кога ще се върнете с информация. Не измисляйте свободни часове или цена.</p></section>
          <section className="checklist-template"><h3>Продължение след изпратена оферта</h3><blockquote>Здравейте, [име]! Пиша във връзка с офертата за [услуга], която обсъдихме. Остана ли нещо неясно по [обхвата / срока / цената]? Ако моментът не е подходящ, кажете ми дали да се свържа с Вас на по-късна дата, или да приключим запитването.</blockquote><p>Използвайте го за започнат разговор, с разумен интервал и съобразно уговорката. Уважавайте отказа и не превръщайте напомнянето в натиск.</p></section>
          <section className="checklist-metrics"><h3>Как да измерите първото подобрение</h3><dl><div><dt>Време за отговор</dt><dd>От получаването до първия съдържателен отговор. Ако броите само работните часове, използвайте това правило и преди, и след промяната.</dd></div><div><dt>Запитвания с оферта</dt><dd>Запитвания, довели до оферта ÷ всички реални запитвания от избрания период. Запишете и самите бройки, не само процента.</dd></div><div><dt>Спечелени клиенти</dt><dd>Колко от същите запитвания са завършили с покупка. Изчакайте обичайния срок за решение; новите отворени разговори още не са загубени.</dd></div></dl><p>При малък брой запитвания промяната в процента не е надеждно доказателство сама по себе си. Запишете и други промени — реклама, сезон, цена — които може да влияят.</p></section>
          <p className="checklist-page-note">03 / 04 · Текстове и измерване · karchx.com</p>
        </div>
        <div className="checklist-sheet">
          <header className="checklist-heading"><p className="checklist-brand">KARCHX · Работен лист</p><h2>Едно подобрение.<br />Ясен план за 7 дни.</h2><p>Изберете конкретен пропуск, който можете да поправите с наличните хора и инструменти. Не е нужно да сменяте всички системи наведнъж.</p></header>
          <div className="checklist-worksheet">{['Пропускът, който видяхме, и реален пример:', 'Какво ще променим тази седмица:', 'Кой отговаря и до коя дата:', 'Начален показател и период на измерване:', 'Как ще проверим, че промяната работи:', 'Дата за преглед на резултата и следваща задача:'].map(label => <div key={label}><h3>{label}</h3><span aria-hidden="true" /></div>)}</div>
          <p className="checklist-plan"><strong>Ден 1:</strong> проверете и изберете пропуска. <strong>Дни 2–3:</strong> подгответе промяната. <strong>Дни 4–5:</strong> внедрете и направете пробно запитване. <strong>Дни 6–7:</strong> прегледайте дали процесът се спазва. За оценка на продажбите може да е нужен по-дълъг период.</p>
          <aside className="checklist-next"><h3>Искате да го подредим заедно?</h3><p>Аз съм Георги Кърчев. В KARCHX помагам с офертата, сайта и обработката на запитванията. В безплатен разговор до 30 минути можем да обсъдим един от пропуските, които сте отбелязали.</p><p><a href={PHONE_HREF}>{PHONE_DISPLAY}</a> · <a href={`${BASE_URL}/bg#contact`}>karchx.com/bg#contact</a></p><p>Примери от работата ми можем да разгледаме в разговора. Ръководството е за самопроверка и не обещава определен брой клиенти или приходи.</p></aside>
          <p className="checklist-page-note">04 / 04 · Георги Кърчев / KARCHX · Септември 2026</p>
        </div>
      </article>
      <div className="checklist-screen-actions"><a href={GUIDE_URL} download>Свалете PDF ↓</a><Link href="/bg#contact">Обсъдете Вашия бизнес →</Link></div>
    </main><Footer />
  </div>
}
