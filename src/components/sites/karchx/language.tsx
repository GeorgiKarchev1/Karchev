"use client";

import React, { useEffect, useState } from "react";

/**
 * EN / BG language switch.
 * The page is written in English. When Bulgarian is chosen, every text node that has an exact
 * entry in BG is swapped for its translation (and swapped back for English). The choice is stored
 * in localStorage and applied again on every load. The hero headline has its own BG variant in markup.
 */
const BG: Record<string, string> = {
 "How it works": "Как работи",
 "Tell me": "Кажете",
 "a little": "малко",
 "about it": "за това",
 "Leave your name and email. You can add a sentence about the task. I will reply personally by the end of the next business day to arrange the call.": "Оставете името и имейла си. Можете да добавите изречение за задачата. Ще ви отговоря лично до края на следващия работен ден, за да уговорим разговора.",
 "Name": "Име",
 "What should I call you?": "Как да се обръщам към вас?",
 "name@example.com": "name@example.com",
 "What would you like to improve? — optional": "Какво бихте искали да подобрите? — по избор",
 "For example: manual tasks take too long; I need a new website; I struggle to publish regularly.": "Например: ръчните задачи отнемат твърде много време; нуждая се от нов уебсайт; трудно ми е да публикувам редовно.",
 "Service — optional": "Услуга — по избор",
 "Select a service": "Изберете услуга",
 "AI training and integration": "Обучение и внедряване на AI",
 "Website, app or automation": "Уебсайт, приложение или автоматизация",
 "Content and branding": "Съдържание и брандинг",
 "SEO": "SEO",
 "Several connected services": "Няколко свързани услуги",
 "I need help choosing where to start": "Нуждая се от помощ да избера откъде да започна",
 "Add a phone number or preferred time": "Добавете телефон или удобно време",
 "Phone — optional": "Телефон — по избор",
 "Include your country code": "Включете кода на държавата",
 "Preferred time for a call — optional": "Удобно време за обаждане — по избор",
 "For example: Tuesday after 14:00, Bulgaria time": "Например: вторник след 14:00, българско време",
 "I will confirm your suggested time personally. This form does not book an appointment automatically.": "Ще потвърдя лично предложеното от вас време. Тази форма не резервира час автоматично.",
 "Sending…": "Изпращане…",
 "Your request has been sent.": "Заявката ви е изпратена.",
 "I will reply personally by the end of the next business day to arrange the call. If you suggested a time, I will confirm it with you. You do not need to send your request again.": "Ще ви отговоря лично до края на следващия работен ден, за да уговорим разговора. Ако сте предложили време, ще го потвърдя с вас. Не е необходимо да изпращате заявката отново.",
 "Think of one task you would like to improve. If useful, have your website link or a short example of how you work ready.": "Помислете за една задача, която бихте искали да подобрите. Ако е полезно, подгответе връзка към уебсайта си или кратък пример как работите.",
 "Please enter your name.": "Моля, въведете името си.",
 "Please enter an email address so I can reply.": "Моля, въведете имейл адрес, за да мога да ви отговоря.",
 "Please check that your email address is written correctly.": "Моля, проверете дали имейл адресът ви е написан правилно.",
 "Your enquiry could not be sent. Please try again or email me at georgikarchev5@gmail.com.": "Запитването ви не можа да бъде изпратено. Опитайте отново или ми пишете на georgikarchev5@gmail.com.",
 "Too many requests have been sent in a short time. Please try again later or contact me directly.": "В кратък период са изпратени твърде много заявки. Опитайте отново по-късно или се свържете директно с мен.",
 "Your mail app should open with the message ready to send.": "Пощенското ви приложение трябва да се отвори със съобщението, готово за изпращане.",
 "Fields marked * are required. I will use your details to respond to your enquiry.": "Полетата, отбелязани с *, са задължителни. Ще използвам данните ви, за да отговоря на запитването ви.",
 "Practical AI support, custom software, content and SEO. From idea to delivery.": "Практическа подкрепа с AI, софтуер по поръчка, съдържание и SEO. От идеята до изпълнението.",
 "+359 895 739 335": "+359 895 739 335",
 "Plovdiv, Bulgaria · Remote work · On-site shoots by arrangement": "Пловдив, България · Дистанционна работа · Снимки на място по договаряне",
 "Privacy Policy": "Политика за поверителност",
 "Terms of Service": "Условия за ползване",
 "Cookies": "Бисквитки",
 "Back to top": "Към началото",
 "Skip to content": "Към съдържанието",
 "AI · Custom software · Content · SEO": "AI · Софтуер по поръчка · Съдържание · SEO",
 "I help people and businesses use AI confidently and make it part of their everyday work. I build custom websites, apps and automations, help with content from filming to publishing, and improve your visibility through professional SEO.": "Помагам на хора и бизнеси да използват AI уверено и да го направят част от ежедневната си работа. Изграждам уебсайтове, приложения и автоматизации по поръчка, помагам със съдържанието — от заснемането до публикуването — и подобрявам видимостта ви чрез професионално SEO.",
 "Up to 30 minutes · Speak directly with me · No obligation to buy": "До 30 минути · Говорите директно с мен · Без ангажимент за покупка",
 "Georgi Karchev, founder of KARCHX. A clear scope and price before paid work begins.": "Георги Карчев, основател на KARCHX. Ясен обхват и цена, преди да започне платената работа.",
  "Request a free call": "Заявете безплатен разговор",
 "Prices": "Цени",
 "FAQ": "Въпроси",
 "Contact": "Контакт",
 "Menu": "Меню",
 "Let's talk": "Да поговорим",
 "The first sentence says who the service is for.": "Първото изречение казва за кого е услугата.",
 "Who it is for": "За кого е",
 "Visitors decide in seconds. I rewrite your first line so the right customer recognises themselves.": "Посетителите решават за секунди. Пренаписвам първия ви ред, за да се разпознае правилният клиент.",
 "Scope and price leave no basic questions.": "Обхватът и цената не оставят основни въпроси.",
 "Website in 3 steps": "Сайт в 3 стъпки",
 "Brief": "Задание",
 "You tell me what the site must do": "Казвате ми какво трябва да прави сайтът",
 "Build": "Изграждане",
 "Pages, text and form in 2 weeks": "Страници, текст и форма за 2 седмици",
 "Launch": "Пускане",
 "Live, tested on phone and PC": "На живо, тестван на телефон и компютър",
 "There is proof you can stand behind.": "Има доказателства, зад които можете да застанете.",
 "Real proof": "Реални доказателства",
 "Named results and real numbers, placed next to your offer, so trust is built before the first call.": "Конкретни резултати и реални числа до вашето предложение, за да се изгради доверие още преди първия разговор.",
 "The main button is in the right place.": "Основният бутон е на правилното място.",
 "above the fold": "в първия екран",
 "visible on phone": "видим на телефон",
 "OK: right place": "ОК: на правилното място",
 "The form works and explains what happened.": "Формата работи и обяснява какво се е случило.",
 "A form that works": "Форма, която работи",
 "Short, tested on phone and PC, with a clear confirmation. Every message reaches your inbox.": "Кратка, тествана на телефон и компютър, с ясно потвърждение. Всяко съобщение стига до пощата ви.",
 "On a phone, everything reads and taps easily.": "На телефон всичко се чете и натиска лесно.",
 "Infrastructure": "Инфраструктура",
 "Domain & hosting": "Домейн и хостинг",
 "Fast and secure": "Бързо и сигурно",
 "Forms to inbox": "Форми към пощата",
 "Every inquiry has an owner": "Всяко запитване има отговорник",
 "Backups": "Резервни копия",
 "Nothing gets lost": "Нищо не се губи",
 "Every new inquiry has an owner.": "Всяко ново запитване има отговорник.",
 "No lost inquiries": "Без изгубени запитвания",
 "Each new inquiry gets a name next to it, so nothing waits for “someone”.": "До всяко ново запитване стои име, така че нищо не чака „някого“.",
 "You know how long the first reply takes.": "Знаете колко време отнема първият отговор.",
 "First reply": "Първи отговор",
 "Inquiry arrives": "Пристига запитване",
 "Alert goes to the owner": "Известие до отговорника",
 "Same day, with a next step": "В същия ден, със следваща стъпка",
 "Follow-up": "Проследяване",
 "Date set before you close it": "Дата, определена преди да приключите",
 "The first reply helps the client move forward.": "Първият отговор помага на клиента да продължи напред.",
 "A reply that moves on": "Отговор, който движи напред",
 "A first answer with the next step and a date, not just “thanks for your message”.": "Първи отговор със следваща стъпка и дата, а не просто „благодарим за съобщението“.",
 "Website": "Уебсайт",
 "A site that turns visits into inquiries.": "Сайт, който превръща посещенията в запитвания.",
 "Clear offer, fast pages and a form that works. Live in 2 weeks.": "Ясно предложение, бързи страници и форма, която работи. На живо за 2 седмици.",
 "Offer & texts": "Предложение и текстове",
 "Say what you do in one clear sentence.": "Кажете какво правите с едно ясно изречение.",
 "Offer, prices and texts written so the next step is obvious.": "Предложение, цени и текстове, написани така, че следващата стъпка да е очевидна.",
 "Automation": "Автоматизация",
 "Stop doing the same task twice.": "Спрете да правите една и съща задача два пъти.",
 "Inquiries, replies and reminders run on their own, each with an owner.": "Запитванията, отговорите и напомнянията се движат сами, всяко с отговорник.",
 "Every open offer has a next-contact date.": "Всяка отворена оферта има дата за следващ контакт.",
 "Always follow up": "Винаги проследявайте",
 "Each open offer gets a next-contact date before you close the conversation.": "Всяка отворена оферта получава дата за следващ контакт, преди да приключите разговора.",
 "You know why conversations stop.": "Знаете защо разговорите спират.",
 "Why talks stop": "Защо спират разговорите",
 "Log the reason": "Запишете причината",
 "Price, timing or trust": "Цена, време или доверие",
 "Spot the pattern": "Открийте модела",
 "Review once a month": "Преглед веднъж месечно",
 "Fix one thing": "Поправете едно нещо",
 "Then measure again": "После измерете отново",
 "You track a few numbers the same way.": "Следите няколко числа по един и същ начин.",
 "Where is your": "Къде вашият",
 "business struggling?": "бизнес среща затруднения?",
 "People do not know why to choose you": "Хората не знаят защо да изберат вас",
 "Clarify who your service is for, what customers receive and why it matters. Rewrite your offer and key messages around concrete benefits and a clear next step.": "Изяснете за кого е вашата услуга, какво получават клиентите и защо има значение. Пренапишете офертата и основните послания около конкретни ползи и ясна следваща стъпка.",
 "Your website gets visits, but few enquiries": "Сайтът ви получава посещения, но малко запитвания",
 "Check the mobile experience, structure, evidence, buttons and form. Fix the obstacles to calling, enquiring or booking.": "Проверете мобилното изживяване, структурата, доказателствата, бутоните и формата. Отстранете пречките да се обадят, запитат или резервират.",
 "Enquiries get lost in messages": "Запитванията се губят в съобщения",
 "Keep contacts and proposals in one place. Give each conversation an owner, a stage and a next action so follow-up is visible.": "Държете контактите и предложенията на едно място. Дайте на всеки разговор отговорник, етап и следващо действие, за да се вижда проследяването.",
 "Content has no clear purpose": "Съдържанието няма ясна цел",
 "Plan topics, messages and calls to action around your services. Create a practical plan and reusable templates for your team.": "Планирайте теми, послания и призиви за действие около вашите услуги. Създайте практичен план и шаблони за многократна употреба за екипа.",
 "Repetitive work slows you down": "Повтарящата се работа ви забавя",
 "Set up relevant notifications, follow-up reminders and summaries. Use AI where it saves work and its output can be checked.": "Настройте подходящи известия, напомняния за проследяване и обобщения. Използвайте ИИ там, където спестява работа и резултатът му може да се провери.",
 "Everything depends on the founder": "Всичко зависи от основателя",
 "Define responsibilities and next steps. Create short instructions, train the team and track a few useful measures.": "Определете отговорности и следващи стъпки. Създайте кратки инструкции, обучете екипа и следете няколко полезни показателя.",
 "KARCHX working...": "KARCHX работи...",
 "Checking the first sentence of your offer": "Проверка на първото изречение от офертата",
 "Testing the main button on mobile": "Тест на основния бутон на мобилен",
 "Giving every inquiry an owner": "Всяко запитване получава отговорник",
 "Up next": "Следва",
 "Offer is clear": "Офертата е ясна",
 "Button works": "Бутонът работи",
 "Owners assigned": "Отговорниците са определени",
 "12 inquiries loaded": "12 запитвания заредени",
 "3 without an owner, now assigned": "3 без отговорник, вече определен",
 "5 follow-ups scheduled": "5 проследявания планирани",
 "Done in 0.4s": "Готово за 0.4 с",
 "2 weeks of work.": "2 седмици работа.",
 "One-time, in advance.": "Еднократно, предплатено.",
 "After two weeks, we continue": "След две седмици продължаваме",
 "for free until the agreed": "безплатно, докато договорените",
 "goals are achieved.": "цели бъдат постигнати.",
 "Before we talk,": "Преди да поговорим,",
 "check it out for yourself.": "проверете сами.",
 "“12 Checkpoints: Where You’re Losing Inquiries” — a short, practical guide to your quote, website, and customer response. Mark the gaps and choose one step for this week.": "„12 проверки: къде губите запитвания“ — кратко практическо ръководство за вашата оферта, сайт и отговор към клиентите. Отбележете пропуските и изберете една стъпка за тази седмица.",
 "Read the checklist": "Прочетете списъка",
 "Download PDF": "Изтеглете PDF",
 "Free · No registration · In Bulgarian": "Безплатно · Без регистрация · На български",
 "checks on the way to the customer": "проверки по пътя към клиента",
 "12 questions with specific actions": "12 въпроса с конкретни действия",
 "Example of first response and subsequent connection": "Пример за първи отговор и последващ контакт",
 "Worksheet for the first improvement": "Работен лист за първото подобрение",
 "I'm not selling a package.": "Не продавам пакет.",
 "I'm selling two weeks.": "Продавам две седмици.",
 "You": "Вие",
 "Georgi": "Георги",
 "One thing. Two weeks.": "Едно нещо. Две седмици.",
 "You pick one thing that's been holding you back the most. We put it in writing before you pay. Then I work on it for two weeks.": "Избирате едно нещо, което ви спира най-много. Записваме го писмено, преди да платите. После работя по него две седмици.",
 "Written scope": "Писмен обхват",
 "Fixed price.": "Фиксирана цена.",
 "Agreed in writing.": "Договорена писмено.",
 "You see exactly what I will do, how far it goes and how we check it's done — before you pay.": "Виждате точно какво ще направя, докъде стига и как проверяваме, че е готово — преди да платите.",
 "Agree scope": "Договорете обхвата",
 "Agreed ✓": "Договорено ✓",
 "Two weeks.": "Две седмици.",
 "From the agreed start date.": "От договорената начална дата.",
 "Nothing starts until the scope is in writing.": "Нищо не започва, докато обхватът не е писмен.",
 "Scope recorded. The two weeks start from the agreed date.": "Обхватът е записан. Двете седмици започват от договорената дата.",
 "Paid in advance": "Платено предварително",
 "Website or page": "Уебсайт или страница",
 "Offer and texts": "Оферта и текстове",
 "Advertising and content": "Реклама и съдържание",
 "Internal process": "Вътрешен процес",
 "Before you request a call.": "Преди да заявите разговор.",
 "Is the call free?": "Безплатен ли е разговорът?",
 "Yes. It is up to 30 minutes by phone, with no obligation to buy. We clarify your task and whether working together makes sense. Detailed audits, training and implementation are separate paid work.": "Да. До 30 минути по телефона, без ангажимент за покупка. Изясняваме задачата ви и дали има смисъл да работим заедно. Подробните одити, обучението и внедряването са отделна платена работа.",
 "A few sentences about what you want to improve. If you have a website, content or a particular workflow, you can describe it. You do not need to understand AI or coding.": "Няколко изречения за това, което искате да подобрите. Ако имате уебсайт, съдържание или конкретен работен процес, можете да го опишете. Не е нужно да разбирате от AI или програмиране.",
 "Can I start with one small task?": "Мога ли да започна с една малка задача?",
 "Yes. I work with independent professionals and businesses. We can start with one specific task in the chosen area. We agree on the scope beforehand.": "Да. Работя със свободни професионалисти и бизнеси. Можем да започнем с една конкретна задача в избраната област. Обхватът се уточнява предварително.",
 "When will I know the price?": "Кога ще науча цената?",
 "Once we have clarified the task and gathered the necessary information, I prepare a specific proposal. Before paid work begins, you know the scope, price, expected timeline and any external tool costs.": "След като изясним задачата и съберем нужната информация, подготвям конкретно предложение. Преди да започне платената работа, знаете обхвата, цената, очаквания срок и евентуалните разходи за външни инструменти.",
 "Does submitting the form book a time?": "Изпращането на формата резервира ли час?",
 "Not automatically. I will contact you to confirm a convenient time. If you leave only an email address, I will email you first to arrange the call.": "Не автоматично. Ще се свържа с вас, за да потвърдим удобен час. Ако оставите само имейл, първо ще ви пиша там, за да уговорим разговора.",
 "Start with what you need.": "Започнете с това, от което имате нужда.",
 "After the first conversation.": "След първия разговор.",
 "After our first conversation and gathering the necessary information, I prepare a proposal based on the task, resources and your priorities.": "След първия ни разговор и събирането на нужната информация подготвям предложение според задачата, ресурсите и вашите приоритети.",
 "One-off work.": "Еднократна работа.",
 "A clearly defined task with agreed delivery and handover.": "Ясно дефинирана задача с договорена доставка и предаване.",
 "Ongoing work.": "Продължителна работа.",
 "Continued delivery, progress reviews and next priorities where the task calls for them.": "Продължаваща работа, прегледи на напредъка и следващи приоритети, когато задачата го изисква.",
 "Before we start, we agree on the price, payment terms and any costs for external tools. You can begin with a single service.": "Преди да започнем, уговаряме цената, условията за плащане и евентуалните разходи за външни инструменти. Можете да започнете с една услуга.",
 "Agree terms": "Уговорете условията",
 "Know who you will work with.": "Знайте с кого ще работите.",
 "I'm Georgi Karchev, founder of KARCHX. I help people and businesses turn specific needs into solutions they can use every day.": "Аз съм Георги Карчев, основател на KARCHX. Помагам на хора и бизнеси да превърнат конкретни нужди в решения, които могат да ползват всеки ден.",
 "You speak with me on the first call. Before paid work begins, you receive a description of the tasks, the price and how we will check the work. We review progress during the project, and you receive the agreed materials and instructions at handover.": "На първия разговор говорите с мен. Преди да започне платената работа, получавате описание на задачите, цената и начина, по който ще проверим работата. По време на проекта преглеждаме напредъка, а при предаването получавате договорените материали и инструкции.",
 "Georgi Karchev · Founder of KARCHX · Plovdiv, Bulgaria": "Георги Карчев · Основател на KARCHX · Пловдив, България",
 "What will we clarify": "Какво ще изясним",
 "in 30 minutes?": "за 30 минути?",
 "We start with your specific task. You tell me what you want to improve, and I help outline a possible approach.": "Започваме с вашата конкретна задача. Казвате ми какво искате да подобрите, а аз помагам да очертаем възможен подход.",
 "What is getting in your way and what you want to achieve.": "Какво ви пречи и какво искате да постигнете.",
 "A sensible first step based on what you have and your priorities.": "Разумна първа стъпка според това, с което разполагате, и вашите приоритети.",
 "Whether I can help and what we need to clarify for a proposal.": "Дали мога да помогна и какво трябва да уточним за предложение.",
 "The call is free, with no obligation to buy. Detailed audits, training and implementation are agreed separately.": "Разговорът е безплатен, без ангажимент за покупка. Подробните одити, обучението и внедряването се уговарят отделно.",
 "minutes, starting with your specific task": "минути, като започваме с вашата конкретна задача",
 "A short description is enough. If available, bring a website link or an example of the task. You do not need a technical brief.": "Достатъчно е кратко описание. Ако имате, донесете линк към сайт или пример за задачата. Не е нужно техническо задание.",
 "A clear task.": "Ясна задача.",
 "Practical delivery.": "Практическа реализация.",
 "Step": "Стъпка",
 "I understand what you want to achieve": "Разбирам какво искате да постигнете",
 "You tell me how you work, what you have tried and where you lose time or opportunities. We identify the most useful improvement to start with.": "Разказвате ми как работите, какво сте пробвали и къде губите време или възможности. Определяме най-полезното подобрение, с което да започнем.",
 "You receive a specific proposal": "Получавате конкретно предложение",
 "I set out the scope, stages, price and expected timeline. You know what you will receive, what I need from you and how we will check the work.": "Описвам обхвата, етапите, цената и очаквания срок. Знаете какво ще получите, какво ми е нужно от вас и как ще проверим работата.",
 "I build it, and we review it together": "Изграждам го и го преглеждаме заедно",
 "I carry out the agreed work, share progress and collect feedback. We check the finished solution using real tasks and content.": "Извършвам договорената работа, споделям напредъка и събирам обратна връзка. Проверяваме готовото решение с реални задачи и съдържание.",
 "You receive the finished work and guidance": "Получавате готовата работа и насоки",
 "I hand over the agreed materials, setup and instructions. Where needed, I train you or your team and clarify the arrangements for ongoing support.": "Предавам договорените материали, настройки и инструкции. Когато е нужно, обучавам вас или екипа ви и уточняваме как ще изглежда текущата поддръжка.",
 "What do you need": "От какво имате нужда",
 "right now?": "в момента?",
 "Choose the area closest to your task. You can request a call even if you are unsure where to start.": "Изберете областта, най-близка до вашата задача. Можете да заявите разговор, дори да не сте сигурни откъде да започнете.",
 "Use AI with a clear purpose.": "Използвайте AI с ясна цел.",
 "I show you how to use AI for your own tasks: writing clear instructions, checking the results and choosing suitable tools. Where it makes sense, I integrate AI into the systems and processes you already use.": "Показвам ви как да използвате AI за собствените си задачи: как да пишете ясни инструкции, да проверявате резултатите и да избирате подходящи инструменти. Където има смисъл, интегрирам AI в системите и процесите, които вече ползвате.",
 "Practical training for you or your team.": "Практическо обучение за вас или екипа ви.",
 "Reusable templates for writing, research, summaries and recurring tasks.": "Шаблони за многократна употреба за писане, проучване, резюмета и повтарящи се задачи.",
 "AI assistants and integrations with clear review steps.": "AI асистенти и интеграции с ясни стъпки за проверка.",
 "I need help with AI": "Нуждая се от помощ с AI",
 "Custom software": "Софтуер по поръчка",
 "Software built around the way you work.": "Софтуер, изграден около начина, по който работите.",
 "I build websites, web apps and automations around a specific need. From a page that explains your service to an internal tool or a connection between systems, the solution should be easy for its users to work with.": "Изграждам уебсайтове, уеб приложения и автоматизации около конкретна нужда. От страница, която обяснява вашата услуга, до вътрешен инструмент или връзка между системи — решението трябва да е лесно за ползване.",
 "Business websites, product pages and landing pages.": "Бизнес сайтове, продуктови страници и лендинг страници.",
 "Web apps, client portals and internal tools.": "Уеб приложения, клиентски портали и вътрешни инструменти.",
 "Automations and integrations that reduce manual data entry between systems.": "Автоматизации и интеграции, които намаляват ръчното въвеждане на данни между системи.",
 "I need custom software": "Нуждая се от софтуер по поръчка",
 "Make more content from every good idea.": "Създавайте повече съдържание от всяка добра идея.",
 "I help with messaging, filming, editing and distribution. With AI support, we turn your source material into more formats for different channels while keeping your voice and a consistent brand identity.": "Помагам със съобщенията, заснемането, монтажа и разпространението. С помощта на AI превръщаме изходния ви материал в повече формати за различни канали, като запазваме вашия глас и последователна идентичност.",
 "Video production, photography and editing.": "Видеопродукция, фотография и монтаж.",
 "Messaging, visual direction and templates for a consistent presence.": "Послания, визуална насока и шаблони за последователно присъствие.",
 "Short videos, posts and articles from shared source material, with a publishing plan.": "Кратки видеа, публикации и статии от общ изходен материал, с план за публикуване.",
 "I need help with content": "Нуждая се от помощ със съдържание",
 "Professional SEO": "Професионално SEO",
 "Get found when people search for what you offer.": "Бъдете намирани, когато хората търсят това, което предлагате.",
 "I work on your website’s technical foundations, structure and content to better address what your customers search for. I set priorities and track which changes lead to relevant visits and enquiries.": "Работя по техническата основа, структурата и съдържанието на сайта ви, за да отговаря по-добре на това, което търсят клиентите ви. Определям приоритети и проследявам кои промени водят до релевантни посещения и запитвания.",
 "SEO audits, search research and competitor analysis.": "SEO одити, проучване на търсенията и анализ на конкурентите.",
 "Technical improvements, page optimisation and content.": "Технически подобрения, оптимизация на страници и съдържание.",
 "Local SEO and tracking of organic visits and enquiries.": "Локално SEO и проследяване на органични посещения и запитвания.",
 "I need help with SEO": "Нуждая се от помощ със SEO",
 "Services": "Услуги",
 "Process": "Процес",
 "AI, software, content and SEO.": "AI, софтуер, съдържание и SEO.",
 "See the four areas I work in and choose the one closest to your task.": "Вижте четирите области, в които работя, и изберете най-близката до вашата задача.",
 "Start with a free 30-minute call.": "Започнете с безплатен 30-минутен разговор.",
 "By phone, with no obligation to buy. We clarify your task and whether we should work together.": "По телефона, без ангажимент за покупка. Изясняваме задачата ви и дали има смисъл да работим заедно.",
 "A clear task. Practical delivery.": "Ясна задача. Практическа реализация.",
 "From the first conversation and a specific proposal to the finished work and handover.": "От първия разговор и конкретното предложение до готовата работа и предаването.",
 "Answers before the decision.": "Отговори преди решението.",
 "What kind of business is it suitable for?": "За какъв бизнес е подходящо?",
 "For a working business with real customers, a service or product, and someone who can participate in the implementation. It is most useful when there are already visits or inquiries, but their processing is fragmented. If you are just looking for something to sell, this startup project is probably not your first step.": "За работещ бизнес с реални клиенти, услуга или продукт и човек, който може да участва в изпълнението. Най-полезно е, когато вече има посещения или запитвания, но обработката им е разпокъсана. Ако просто търсите нещо за продажба, този стартиращ проект вероятно не е първата ви стъпка.",
 "Is the first call free?": "Безплатен ли е първият разговор?",
 "Yes. It is up to 30 minutes, over the phone and without a purchase commitment. We discuss the business and assess whether there is a suitable task. The detailed review and implementation are part of the paid project.": "Да. Продължава до 30 минути, по телефона и без ангажимент за покупка. Обсъждаме бизнеса и преценяваме дали има подходяща задача. Подробният преглед и изпълнението са част от платения проект.",
 "What does the price of €250 include and when is it paid?": "Какво включва цената от €250 и кога се плаща?",
 "The price is for two weeks of work within the described scope and is valid for the first 3 clients. It is paid in full in advance. Before payment, we write down the goals, how we will measure their implementation, the tasks and the start date. Any external costs are agreed separately.": "Цената е за две седмици работа в рамките на описания обхват и важи за първите 3 клиенти. Плаща се изцяло предварително. Преди плащането записваме целите, как ще измерваме изпълнението им, задачите и началната дата. Евентуални външни разходи се договарят отделно.",
 "What happens if the goals are not achieved in two weeks?": "Какво става, ако целите не бъдат постигнати за две седмици?",
 "We continue to work on the previously agreed goals completely free of charge until we achieve them. This commitment is for the goals recorded before the start. New tasks outside of them are discussed separately. The prices of external tools are not a fee for our work and are specified in advance.": "Продължаваме да работим по договорените преди това цели напълно безплатно, докато ги постигнем. Този ангажимент е за целите, записани преди началото. Нови задачи извън тях се обсъждат отделно. Цените на външните инструменти не са такса за нашата работа и се уточняват предварително.",
 "How do we set goals?": "Как поставяме целите?",
 "We start by reviewing the business and the available data. We write down specific goals and how we will measure their achievement: for example, response time, tracking each quote, or improving the path to an inquiry. For a sales goal, we specify the initial metrics and the measurement period before payment.": "Започваме с преглед на бизнеса и наличните данни. Записваме конкретни цели и как ще измерваме постигането им: например време за отговор, проследяване на всяка оферта или подобряване на пътя към запитването. За цел, свързана с продажби, уточняваме началните показатели и периода на измерване преди плащането.",
 "Should we change the site or the team?": "Трябва ли да сменим сайта или екипа?",
 "First, we check what is already working and what can be improved. For the starter project, we use the existing site and available tools when technically possible. A new entire site or migration to another platform is not included in this price.": "Първо проверяваме какво вече работи и какво може да се подобри. За стартовия проект използваме съществуващия сайт и наличните инструменти, когато е технически възможно. Изцяло нов сайт или миграция към друга платформа не са включени в тази цена.",
 "What do CRM, automation and AI mean?": "Какво означават CRM, автоматизация и ИИ?",
 "A CRM is an organized list of contacts, conversations, and offers. Automation performs a repetitive step — like a reminder to call. AI stands for artificial intelligence, and can help with drafts or summaries that a human checks. We choose the tool based on the task.": "CRM е организиран списък с контакти, разговори и оферти. Автоматизацията изпълнява повтарящата се стъпка — например напомняне за обаждане. ИИ означава изкуствен интелект и може да помогне с чернови или обобщения, които човек проверява. Избираме инструмента според задачата.",
 "Are there additional monthly costs?": "Има ли допълнителни месечни разходи?",
 "There is no mandatory subscription to KARCHX after the initial project. Some external tools have their own fees. If they are needed, we clarify which ones they are, how much they cost, and who pays for them before we activate them.": "Няма задължителен абонамент към KARCHX след първоначалния проект. Някои външни инструменти имат собствени такси. Ако са нужни, уточняваме кои са, колко струват и кой ги плаща, преди да ги активираме.",
 "What should I prepare?": "Какво да подготвя?",
 "A link to the business, a brief description of the service, and a few examples of how you receive and process inquiries. To get started, we will specify the necessary accesses and a contact person. Do not send passwords or sensitive customer data through the form.": "Връзка към бизнеса, кратко описание на услугата и няколко примера как получавате и обработвате запитвания. За да започнем, ще уточним необходимите достъпи и лице за контакт. Не изпращайте пароли или чувствителни данни на клиенти през формата.",
 "What happens after the goals are achieved?": "Какво става, след като целите са постигнати?",
 "You receive the agreed implementation, instructions and training. You can continue independently or we can discuss further improvements. There is no mandatory monthly subscription.": "Получавате договореното изпълнение, инструкции и обучение. Можете да продължите самостоятелно или да обсъдим по-нататъшни подобрения. Няма задължителен месечен абонамент.",
 "I am Georgi Karchev,": "Аз съм Георги Карчев,",
 "founder of KARCHX. I combine work on websites, content, marketing and automation. You will work directly with me - from the first conversation to the broadcast. If you already have a designer, marketer or salesperson, we include them with clear tasks and responsibilities.": "основател на KARCHX. Съчетавам работа по уебсайтове, съдържание, маркетинг и автоматизация. Ще работите директно с мен — от първия разговор до пускането. Ако вече имате дизайнер, маркетолог или продавач, включваме ги с ясни задачи и отговорности.",
 "Founder of KARCHX · Plovdiv / online for Bulgaria": "Основател на KARCHX · Пловдив / онлайн за България",
 "Let’s": "Да",
 "Get in": "се",
 "Touch": "свържем",
 "Full name": "Име и фамилия",
 "Email": "Имейл",
 "Phone": "Телефон",
 "Convenient time to call (optional)": "Удобно време за обаждане (по избор)",
 "Inquiry": "Запитване",
 "Plovdiv": "Пловдив",
 "Georgi Karchev": "Георги Карчев",
 "Plovdiv, Bulgaria": "Пловдив, България",
 "Online": "Онлайн",
 "For businesses": "За бизнеси",
 "across Bulgaria": "в цяла България",
 "Websites, content, marketing and automation for small businesses in Bulgaria — with a clear result in the first two weeks.": "Уебсайтове, съдържание, маркетинг и автоматизация за малки бизнеси в България — с ясен резултат през първите две седмици.",
 "Explore": "Разгледайте",
 "Free call": "Безплатен разговор",
 "Resources": "Ресурси",
 "12 checks": "12 проверки",
 "Questions": "Въпроси",
 "Get in touch": "Свържете се",
 "Monday–Friday, 10:00–18:00 · Bulgarian time": "Понеделник–петък, 10:00–18:00 · българско време",
 "KARCHX. All rights reserved.": "KARCHX. Всички права запазени.",
 "Georgi Karchev · Plovdiv / online for Bulgaria": "Георги Карчев · Пловдив / онлайн за България"
};

const KEY = "karchx-lang";

function translateNode(n: Text, originals: WeakMap<Text, string>) {
  const v = n.nodeValue ?? "";
  const core = v.replace(/\s+/g, " ").trim();
  if (!core) return;
  const bg = BG[core];
  if (!bg) return;
  const lead = v.match(/^\s*/)?.[0] ?? "";
  const trail = v.match(/\s*$/)?.[0] ?? "";
  if (!originals.has(n)) originals.set(n, v);
  n.nodeValue = lead + bg + trail;
}

function translateAttrs(root: Element) {
  const els = [root, ...Array.from(root.querySelectorAll("[placeholder]"))];
  for (const el of els) {
    const ph = el.getAttribute?.("placeholder");
    if (!ph) continue;
    const bg = BG[ph.replace(/\s+/g, " ").trim()];
    if (bg) el.setAttribute("placeholder", bg);
  }
}

function walk(root: Node, fn: (t: Text) => void) {
  if (root.nodeType === Node.TEXT_NODE) {
    const p = root.parentElement;
    if (p && p.tagName !== "SCRIPT" && p.tagName !== "STYLE") fn(root as Text);
    return;
  }
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = w.nextNode())) {
    const p = n.parentElement;
    if (p && p.tagName !== "SCRIPT" && p.tagName !== "STYLE") fn(n as Text);
  }
}

/** Mounted once in the layout: applies Bulgarian text when that language is stored. */
export function LanguageApplier() {
  useEffect(() => {
    let lang = "en";
    try {
      lang = localStorage.getItem(KEY) === "bg" ? "bg" : "en";
    } catch {}
    if (lang !== "bg") return;
    document.documentElement.lang = "bg";
    const originals = new WeakMap<Text, string>();
    walk(document.body, (t) => translateNode(t, originals));
    translateAttrs(document.body);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "characterData") walk(r.target, (t) => translateNode(t, originals));
        r.addedNodes.forEach((n) => {
          walk(n, (t) => translateNode(t, originals));
          if (n.nodeType === Node.ELEMENT_NODE) translateAttrs(n as Element);
        });
      }
    });
    mo.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}

/** Small EN | BG switch for the top right corner. Reloads so the animated hero headline restarts cleanly. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<"en" | "bg">("en");

  useEffect(() => {
    setLang(document.documentElement.classList.contains("lang-bg") ? "bg" : "en");
  }, []);

  const choose = (next: "en" | "bg") => {
    if (next === lang) return;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.location.reload();
  };

  const btn = (code: "en" | "bg", label: string) => (
    <button
      type="button"
      onClick={() => choose(code)}
      aria-pressed={lang === code}
      aria-label={code === "en" ? "Switch to English" : "Switch to Bulgarian"}
      className={`rounded-full px-2.5 py-1 text-[12px] font-semibold tracking-wide transition-colors ${
        lang === code ? "max-sm:hidden bg-[#070503] text-white" : "text-[#070503]/70 hover:text-[#070503]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`lang-toggle pointer-events-auto flex items-center rounded-full border border-[#070503]/10 bg-[#f9f8f5]/90 p-0.5 shadow-sm backdrop-blur-md ${className}`}>
      {btn("en", "EN")}
      {btn("bg", "BG")}
    </div>
  );
}
