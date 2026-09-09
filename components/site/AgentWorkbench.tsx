'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Check, FileText, Mail, Sparkles } from 'lucide-react'

const examples = {
  bg: [
    { name: 'Запитвания', job: 'От първия имейл до следващата стъпка.', description: 'Агентът разбира запитването, намира нужния контекст и подготвя отговор за Вашето одобрение.', source: 'Входящ имейл', request: 'Здравейте! Интересуваме се от услугите Ви. Може ли повече информация и среща следващата седмица?', context: 'Услуги и информация за клиента', action: 'Подготвя отговор', result: 'Чернова за Вашия преглед', response: 'Здравейте! Благодаря за интереса. За да предложим подходящо решение, коя задача отнема най-много време на екипа Ви? Можем да я обсъдим в кратък разговор.', handoff: 'Вие преглеждате и изпращате.' },
    { name: 'Документи', job: 'Знанието на бизнеса. На една заявка разстояние.', description: 'Агентът работи с Вашите документи, намира информацията и я подрежда в ясен отговор с източник.', source: 'Въпрос от екипа', request: 'Какво трябва да подготвим, преди да започнем работа с нов клиент?', context: 'Вътрешен наръчник за работа', action: 'Намира и обобщава', result: 'Кратко резюме', response: 'Според примерния наръчник: уточнете обхвата, определете лице за контакт и съберете нужните материали. След това насрочете начална среща.', handoff: 'Източник: примерен вътрешен наръчник.' },
    { name: 'Процеси', job: 'Инструментите Ви най-после работят заедно.', description: 'Агентът подрежда информацията от заявка и подготвя следващите действия в CRM-а и задачите на екипа.', source: 'Нова заявка от формата', request: 'Искам AI агент за обработка на клиентски запитвания. Използваме CRM и обща служебна поща.', context: 'Вашите правила за нови запитвания', action: 'Подготвя следващи действия', result: 'План за обработка', response: 'Категория: клиентски запитвания. Следваща стъпка: уточняващ разговор. За CRM: нов контакт и описание на нуждата. За екипа: задача за обратна връзка.', handoff: 'Действията следват договорените права и правила.' },
  ],
  en: [
    { name: 'Enquiries', job: 'From the first email to the next step.', description: 'The agent understands the enquiry, finds the right context and prepares a reply for your approval.', source: 'Incoming email', request: 'Hello! We are interested in your services. Could you share more information and arrange a meeting next week?', context: 'Your services and customer context', action: 'Prepares a reply', result: 'Draft for your review', response: 'Hello! Thanks for getting in touch. To suggest the right approach, which task takes the most time in your team? We can explore it together in a short call.', handoff: 'You review and send.' },
    { name: 'Documents', job: 'Your business knowledge. One question away.', description: 'The agent works with your documents, finds relevant information and puts it into a clear answer with a source.', source: 'A question from your team', request: 'What do we need to prepare before starting work with a new client?', context: 'Your internal working guide', action: 'Finds and summarises', result: 'A useful summary', response: 'According to the sample guide: agree the scope, assign a contact and collect the necessary materials. Then schedule the kickoff meeting.', handoff: 'Source: illustrative internal guide.' },
    { name: 'Workflows', job: 'Your tools, finally working together.', description: 'The agent organises an enquiry and prepares the next actions for your CRM and your team.', source: 'New website enquiry', request: 'We need an AI agent to handle customer enquiries. We use a CRM and a shared business inbox.', context: 'Your rules for new enquiries', action: 'Prepares next actions', result: 'An actionable plan', response: 'Category: customer enquiries. Next step: a discovery call. For the CRM: a new contact and a summary of the request. For the team: a follow-up task.', handoff: 'Actions follow the agreed permissions and rules.' },
  ],
}

export function AgentMark({ className }: { className?: string }) {
  return <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true"><path d="M9 9h13a9 9 0 0 1 9 9v13H18a9 9 0 0 1-9-9V9Z" stroke="currentColor" strokeWidth="2.5" /><path d="M15 15h7a3 3 0 0 1 3 3v7h-7a3 3 0 0 1-3-3v-7Z" fill="currentColor" /></svg>
}

export default function AgentWorkbench({ bg }: { bg: boolean }) {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const copy = examples[bg ? 'bg' : 'en']
  const item = copy[selected]

  function moveTab(event: React.KeyboardEvent, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % copy.length : event.key === 'ArrowLeft' ? (index + copy.length - 1) % copy.length : event.key === 'Home' ? 0 : event.key === 'End' ? copy.length - 1 : null
    if (next === null) return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="agent-workbench">
      <div className="workbench-toolbar">
        <span>{bg ? 'Изберете задача' : 'Choose a task'}</span>
        <div className="agent-tabs" role="tablist" aria-label={bg ? 'Задача на агента' : 'Agent task'}><span className="agent-tab-indicator" aria-hidden="true" style={{ transform: `translateX(${selected * 100}%)` }} />{copy.map((example, i) => <button key={example.name} ref={node => { tabs.current[i] = node }} id={'agent-tab-' + i} role="tab" aria-selected={selected === i} aria-controls="agent-example" tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => moveTab(event, i)}>{example.name}</button>)}</div>
      </div>
      <div className="workbench-options">
        <h3>{item.job}</h3><p>{item.description}</p>
        <div className="workbench-process"><span><FileText size={17} />{item.context}</span><ArrowRight size={18} aria-hidden="true" /><span><Sparkles size={17} />{item.action}</span></div>
        <p className="workbench-disclaimer">{bg ? 'Илюстративен пример с измислени данни. Задачите и поведението на Вашия агент се настройват индивидуално.' : 'An illustrative example using fictional data. Your agent’s tasks and behaviour are configured individually.'}</p>
      </div>
      <div className="workbench-panel" id="agent-example" role="tabpanel" aria-labelledby={'agent-tab-' + selected} tabIndex={0}>
        <div className="workbench-panel-bar"><span><AgentMark />{bg ? 'Вашият AI агент' : 'Your AI agent'}</span><span>{bg ? 'Примерен сценарий' : 'Example scenario'}</span></div>
        <div key={selected} className="workbench-example"><div className="workbench-request"><span><Mail size={15} />{item.source}</span><p>{item.request}</p></div><div className="workbench-answer"><span><AgentMark />{item.result}</span><p>{item.response}</p></div><div className="workbench-handoff"><Check size={16} /><span>{item.handoff}</span></div></div>
      </div>
    </div>
  )
}
