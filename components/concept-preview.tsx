import Image from "next/image";
import profile from "@/content/profile.json";
import metricsContent from "@/content/metrics.json";
import casesContent from "@/content/cases.json";
import otherProjectsContent from "@/content/other-projects.json";
import experienceContent from "@/content/experience.json";
import tools from "@/content/tools.json";
import educationContent from "@/content/education.json";
import contacts from "@/content/contacts.json";
import { MotionController, type MotionId } from "@/components/motion-controller";
import { MobileNavigation } from "@/components/mobile-navigation";

export type ConceptId = "a" | "b" | "c";
export type PolishId = "a" | "b" | "c";

type CaseVisual = {
  beforeValue: string;
  beforeNote: string;
  beforeContext: string;
  changeLabel: string;
  changeIntro: string;
  afterValue: string;
  afterNote: string;
  afterContext: string;
  steps: string[];
};

type WithVisibility<T> = T & { visible?: boolean };
const isVisible = <T,>(item: WithVisibility<T>) => item.visible !== false;

const metrics = (metricsContent.items as WithVisibility<(typeof metricsContent.items)[number]>[]).filter(isVisible);
const otherProjects = (otherProjectsContent.items as WithVisibility<(typeof otherProjectsContent.items)[number]>[]).filter(isVisible);
const experience = (experienceContent.items as WithVisibility<(typeof experienceContent.items)[number]>[]).filter(isVisible);
const education = (educationContent.items as WithVisibility<(typeof educationContent.items)[number]>[]).filter(isVisible);
type CaseItem = WithVisibility<(typeof casesContent.items)[number]> & { visual?: CaseVisual };
const caseItems = (casesContent.items as CaseItem[]).filter(isVisible);

const navTargets = ["top", "method", "project-logic", "cases", "other-projects", "experience", "details", "contacts", "pdf"];

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label">{children}</div>;
}

function EditorialHook({ index }: { index: number }) {
  const hook = profile.hooks[index];

  return (
    <aside className={`editorial-hook editorial-hook-${index + 1}`} data-motion-section aria-label={hook.label}>
      <div>
        <span>{hook.label}</span>
        <p>{hook.before} <strong>{hook.accent}</strong>{hook.after ? ` ${hook.after}` : ""}</p>
      </div>
    </aside>
  );
}

function DecisionRunway() {
  return (
    <div className="logic-visual logic-runway" aria-label={profile.logic.ariaLabel}>
      <div className="logic-inputs">
        <span className="logic-caption">{profile.logic.inputLabel}</span>
        <div className="logic-input-list">
          {profile.hero.sourceLabels.map((label, index) => (
            <span key={label}><i>{String(index + 1).padStart(2, "0")}</i>{label}</span>
          ))}
        </div>
      </div>
      <div className="runway-axis" aria-hidden="true"><span /></div>
      <ol className="logic-stages">
        {profile.hero.flow.map((stage, index) => (
          <li key={stage}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EditorialSequence({ polish }: { polish?: PolishId }) {
  return (
    <div className={`logic-visual logic-sequence ${polish ? `logic-polish-${polish}` : ""}`} aria-label={profile.logic.ariaLabel}>
      <div className="sequence-head">
        <span>{profile.logic.sequenceLabel}</span>
        <strong>{profile.logic.sequenceValue}</strong>
      </div>
      <ol className="sequence-track">
        {profile.hero.flow.map((stage, index) => (
          <li key={stage}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
      <div className="sequence-inputs">
        {profile.hero.sourceLabels.map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function ControlField() {
  return (
    <div className="logic-visual logic-field" aria-label={profile.logic.ariaLabel}>
      <svg className="field-lines" viewBox="0 0 1000 310" role="img" aria-label={profile.logic.diagramAlt}>
        <path d="M92 66 C250 66 260 155 430 155" />
        <path d="M92 155 C260 155 268 155 430 155" />
        <path d="M92 244 C250 244 260 155 430 155" />
        <path d="M570 155 C700 155 712 66 908 66" />
        <path d="M570 155 C720 155 728 155 908 155" />
        <path d="M570 155 C700 155 712 244 908 244" />
        <circle cx="500" cy="155" r="68" />
      </svg>
      <div className="field-node field-node-a"><small>01</small><span>{profile.hero.sourceLabels[0]}</span></div>
      <div className="field-node field-node-b"><small>02</small><span>{profile.hero.sourceLabels[3]}</span></div>
      <div className="field-node field-node-c"><small>03</small><span>{profile.hero.sourceLabels[4]}</span></div>
      <div className="field-core"><small>{profile.logic.coreLabel}</small><strong>{profile.logic.coreValue}</strong></div>
      <div className="field-node field-node-d"><small>04</small><span>{profile.hero.flow[2]}</span></div>
      <div className="field-node field-node-e"><small>05</small><span>{profile.hero.flow[3]}</span></div>
      <div className="field-node field-node-f"><small>06</small><span>{profile.hero.flow[4]}</span></div>
    </div>
  );
}

function ProjectLogic({ concept, polish }: { concept: ConceptId; polish?: PolishId }) {
  if (concept === "a") return <DecisionRunway />;
  if (concept === "b") return <EditorialSequence polish={polish} />;
  return <ControlField />;
}

function ProjectFlowSection({ polish }: { polish?: PolishId }) {
  return (
    <section className="project-flow-section" id="project-logic" aria-labelledby="project-flow-title" data-motion-section>
      <div className="project-flow-heading">
        <SectionLabel>РАБОЧИЙ КОНТУР</SectionLabel>
        <h2 id="project-flow-title">СНАЧАЛА — КРИТЕРИИ. ПОТОМ — ИСПОЛНЕНИЕ</h2>
        <p>До начала работ фиксирую ожидаемое изменение, владельца решения, неизменяемые ограничения и способ приёмки. Так у каждого этапа появляется проверяемый выход.</p>
      </div>
      <EditorialSequence polish={polish} />
    </section>
  );
}

function CaseMeta({ item }: { item: CaseItem }) {
  return (
    <dl>
      <div><dt>Роль</dt><dd>{item.role}</dd></div>
      <div><dt>Подход</dt><dd>{item.tools}</dd></div>
      <div><dt>Масштаб</dt><dd>{item.scale}</dd></div>
    </dl>
  );
}

function BeforeAfterDiagram({ item, polish }: { item: CaseItem; polish: PolishId }) {
  if (!item.visual) return null;

  return (
    <div className={`case-diagram case-diagram-${polish}`} aria-label={`До и после проекта: ${item.title}`}>
      <div className="case-diagram-before">
        <small>До изменения</small>
        <div className="case-diagram-result">
          <strong>{item.visual.beforeValue}</strong>
          <span>{item.visual.beforeNote}</span>
        </div>
        <p>{item.visual.beforeContext}</p>
      </div>
      <div className="case-diagram-change">
        <header>
          <small>{item.visual.changeLabel}</small>
          <p>{item.visual.changeIntro}</p>
        </header>
        <ol>
          {item.visual.steps.map((step, index) => (
            <li key={step}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="case-diagram-after">
        <small>После изменения</small>
        <div className="case-diagram-result">
          <strong>{item.visual.afterValue}</strong>
          <span>{item.visual.afterNote}</span>
        </div>
        <p>{item.visual.afterContext}</p>
      </div>
    </div>
  );
}

function CaseStudy({ item, polish }: { item: CaseItem; polish: PolishId }) {
  const decisionCards = [
    ["Управленческое решение", item.managementDecision],
    ["Моё влияние и границы", `${item.influence} ${item.authorityBoundary}`],
    ["Риск и стоимость ошибки", `${item.riskRemoved} ${item.costOfError}`],
    ["Что изменилось системно", item.systemChange],
  ];

  return (
    <section className={`case-feature ${item.visual ? "case-feature-lead" : ""}`} id={item.id} aria-labelledby={`case-${item.id}-title`} data-motion-section>
      <SectionLabel>РАЗБОР ПРОЕКТА</SectionLabel>
      <header className="case-feature-head">
        <div>
          <p>КЕЙС {item.number} · {item.label}</p>
          <h2 id={`case-${item.id}-title`}>{item.title}</h2>
        </div>
        <CaseMeta item={item} />
      </header>
      <div className="case-brief">
        <p><span>Задача</span>{item.context}</p>
        <p><span>Результат</span>{item.result}</p>
      </div>

      <blockquote className="case-principle">
        <span>Ключевой принцип</span>
        <p>{item.managementPrinciple}</p>
      </blockquote>

      <details className="case-disclosure">
        <summary><span>Открыть полный разбор решения</span><b aria-hidden="true">+</b></summary>
        <div className="case-disclosure-body">
          {item.visual ? <BeforeAfterDiagram item={item} polish={polish} /> : (
            <div className="case-context-grid">
              <article><h3>До вмешательства</h3><p>{item.before}</p></article>
              <article><h3>Что показала диагностика</h3><p>{item.diagnosis}</p></article>
            </div>
          )}

          <div className="case-feature-grid">
            {decisionCards.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="case-process">
            <header>
              <span>ЧТО НЕ ВЫБРАНО</span>
              <p>{item.rejectedOrNotChosen}</p>
            </header>
            <h3>Как решение было реализовано</h3>
            <ol>
              {item.implementation.map((step, index) => (
                <li key={step}><small>{String(index + 1).padStart(2, "0")}</small><span>{step}</span></li>
              ))}
            </ol>
          </div>

          <div className="case-outcome">
            <article><span>ПОЧЕМУ ЭТО РЕШЕНИЕ</span><p>{item.decisionRationale}</p></article>
            <article className="case-outcome-result"><span>КАК ПРИНИМАЛИ РЕЗУЛЬТАТ</span><p>{item.acceptance}</p></article>
            <article><span>ЕСЛИ БЫ МЕХАНИЗМ НЕ ИЗМЕНИЛИ</span><p>{item.counterfactual}</p></article>
          </div>

          <div className="proof-tags" aria-label="Подтверждаемые компетенции">
            {item.proofTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </details>
    </section>
  );
}

function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait-frame">
        <Image
          src={profile.hero.portraitSrc}
          alt={profile.hero.portraitAlt}
          fill
          priority
          sizes="(max-width: 720px) 70vw, (max-width: 1024px) 38vw, 31vw"
        />
      </div>
      <figcaption>
        <span>{profile.hero.portraitCaption}</span>
      </figcaption>
    </figure>
  );
}

function MethodSection() {
  return (
    <section className="method" id="method" aria-labelledby="method-title" data-motion-section>
      <SectionLabel>{profile.sectionLabels.method}</SectionLabel>
      <div className="section-heading">
        <h2 id="method-title">{profile.method.title}</h2>
        <p>{profile.method.intro}</p>
      </div>
      <div className="scenario-list">
        {profile.method.scenarios.map((item) => (
          <article key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <h3 className="method-subtitle">Шесть вопросов до старта работ</h3>
      <div className="question-grid">
        {profile.method.questions.map((item) => (
          <article className="question" key={item.question}>
            <h3>{item.question}</h3>
            <p>→ {item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OtherProjectsSection() {
  return (
    <section className="other-projects" id="other-projects" aria-labelledby="other-projects-title" data-motion-section>
      <SectionLabel>{profile.sectionLabels.otherProjects}</SectionLabel>
      <div className="section-heading">
        <h2 id="other-projects-title">ЕЩЁ ВОСЕМЬ ПОДТВЕРЖДЁННЫХ РЕЗУЛЬТАТОВ</h2>
        <p>Короткие разборы показывают масштаб, принятое решение и риск, который нельзя было оставить без управления.</p>
      </div>
      <div className="other-project-list">
        {otherProjects.map((item) => (
          <details id={item.id} key={item.id}>
            <summary>
              <span className="other-project-title"><small>{item.label}</small><strong>{item.title}</strong></span>
              <span className="other-project-result">{item.result}</span>
              <span className="other-project-toggle" aria-hidden="true">+</span>
            </summary>
            <div className="other-project-body">
              <article><span>РЕШЕНИЕ</span><p>{item.decision}</p></article>
              <article><span>РИСК / СТОИМОСТЬ ОШИБКИ</span><p>{item.risk}</p></article>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-title" data-motion-section>
      <SectionLabel>{profile.sectionLabels.experience}</SectionLabel>
      <div className="section-heading">
        <h2 id="experience-title">КАК РОСЛИ МАСШТАБ И СЛОЖНОСТЬ ЗАДАЧ</h2>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <article key={item.company}>
            <span className="experience-period">{item.period}</span>
            <div>
              <h3>{item.company}</h3>
              <strong>{item.role}</strong>
            </div>
            <div>
              <p className="experience-focus">{item.focus}</p>
              <p>{item.scope}</p>
            </div>
            <div className="experience-links">
              {item.caseTargets.map((target) => <a href={`#${target}`} key={target}>Кейс ↗</a>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="details-section" id="details" aria-labelledby="details-title" data-motion-section>
      <SectionLabel>{profile.sectionLabels.details}</SectionLabel>
      <div className="section-heading">
        <h2 id="details-title">ЧЕМ ПОДКРЕПЛЯЮ УПРАВЛЕНЧЕСКИЕ РЕШЕНИЯ</h2>
        <p>Использую инструменты для прозрачности потока, анализа вариантов, планирования зависимостей и проверки результата — а не как самоцель.</p>
      </div>
      <div className="details-grid">
        <article className="tools-panel">
          <h3>{tools.title}</h3>
          {tools.groups.map((group) => (
            <div key={group.label}>
              <span>{group.label}</span>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
          <p className="ai-note">{tools.aiNote}</p>
        </article>
        <article className="education-panel">
          <h3>Образование</h3>
          {education.map((item) => (
            <div key={`${item.year}-${item.institution}`}>
              <span>{item.year}</span>
              <p><strong>{item.institution}</strong><br />{item.program}</p>
            </div>
          ))}
          <div><span>Языки</span><p>Русский — родной · Английский — B2</p></div>
        </article>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer className="contact-section" id="contacts" aria-labelledby="contacts-title" data-motion-section>
      <SectionLabel>{profile.sectionLabels.contacts}</SectionLabel>
      <div className="contact-copy">
        <h2 id="contacts-title">{contacts.title}</h2>
        <p>{contacts.text}</p>
        <span>{contacts.format}</span>
      </div>
      <div className="contact-links">
        <a className="contact-link contact-link-primary" href={contacts.telegramHref} data-analytics-event="contact_telegram"><span>Telegram</span><strong>{contacts.telegram}</strong><b aria-hidden="true">↗</b></a>
        <a className="contact-link" href={contacts.emailHref} data-analytics-event="contact_email"><span>Почта</span><strong>{contacts.email}</strong><b aria-hidden="true">↗</b></a>
        <a className="contact-link" href={contacts.phoneHref} data-analytics-event="contact_phone"><span>Телефон</span><strong>{contacts.phone}</strong><b aria-hidden="true">↗</b></a>
        <a className="contact-link contact-link-resume" id="pdf" href={contacts.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf"><span>Резюме</span><strong>Открыть PDF</strong><b aria-hidden="true">↓</b></a>
      </div>
    </footer>
  );
}

export function ConceptPreview({ concept, polish, motion, release = false }: { concept: ConceptId; polish?: PolishId; motion?: MotionId; release?: boolean }) {
  const conceptMeta = release ? profile.release : polish ? profile.polish[polish] : profile.concepts[concept];

  return (
    <div
      className={`concept concept-${concept} ${polish ? `polish polish-${polish}` : ""} ${motion ? `motion motion-${motion}` : ""} ${release ? "release" : ""}`}
      data-motion={motion}
    >
      {motion ? <MotionController motion={motion} /> : null}
      <header className="site-nav">
        <nav className="desktop-nav" aria-label="Основная навигация">
          {profile.navigation.slice(1).map((item, index) => (
            <a key={item} href={`#${navTargets[index + 1]}`}>{item}</a>
          ))}
        </nav>
        <MobileNavigation items={profile.navigation.slice(1)} targets={navTargets.slice(1)} />
        <span className="site-progress" aria-hidden="true" />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          {!release ? <div className="concept-mark" aria-label={`Концепция ${concept.toUpperCase()}`}>
            <span>{release ? "PM" : `0${concept === "a" ? 1 : concept === "b" ? 2 : 3}`}</span>
            <span>{conceptMeta.label}</span>
          </div> : null}

          <div className="hero-copy">
            <p className="hero-name">{profile.hero.name}</p>
            <h1 id="hero-title" aria-label={profile.hero.role}>
              <span>{profile.hero.roleLine1}</span>
              <span>{profile.hero.roleLine2}</span>
            </h1>
            {!release ? <p className="hero-kicker">{profile.hero.kicker}</p> : null}
            {!release ? <p className="hero-intro">{profile.hero.intro}</p> : null}
            <p className="hero-promise">{profile.hero.promise}</p>
            {!release ? <p className="hero-support">{profile.hero.support}</p> : null}

            {release ? <div className="hero-proofs" aria-label="Масштаб проектов">
              {profile.hero.proofs.map((proof) => <span key={proof.label}><strong>{proof.value}</strong><small>{proof.label}</small></span>)}
            </div> : <div className="hero-meta" aria-label="Опыт и формат работы">
              <span>{profile.hero.context}</span>
              <span>{profile.hero.format}</span>
            </div>}
            <div className="hero-actions">
              <a className="button button-primary" href="#cases" data-analytics-event="hero_cases"><span>{profile.hero.primaryCta}</span><b aria-hidden="true">↘</b></a>
              <a className={release ? "hero-resume-link" : "button button-secondary"} href={contacts.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf"><span>{profile.hero.secondaryCta}</span><b aria-hidden="true">↓</b></a>
            </div>
          </div>

          <Portrait />
          {!release ? <ProjectLogic concept={concept} polish={polish} /> : null}

          <div className="hero-folio" aria-hidden="true">
            <span>PM / 2026</span>
            <span>{conceptMeta.code}</span>
          </div>
        </section>

        {release ? <ProjectFlowSection polish={polish} /> : null}
        <MethodSection />
        {release ? <EditorialHook index={0} /> : null}

        <section className="case-index" id="cases" aria-labelledby="cases-title" data-motion-section>
          <SectionLabel>{profile.sectionLabels.cases}</SectionLabel>
          <div className="section-heading">
            <h2 id="cases-title">{profile.caseIndex.title}</h2>
            <p>{profile.caseIndex.intro}</p>
          </div>
          <div className="metric-grid">
            {metrics.map((item) => (
              <a className="metric" href={`#${item.target}`} key={item.value} data-analytics-event={`case_${item.target}`}>
                <strong>{item.value}</strong>
                <span className="metric-meta">{item.meta}</span>
                <span className="metric-link">{item.link} →</span>
              </a>
            ))}
          </div>
        </section>

        {polish ? caseItems.map((item) => <CaseStudy item={item} polish={polish} key={item.id} />) : null}
        {release ? <EditorialHook index={1} /> : null}
        <OtherProjectsSection />
        <ExperienceSection />
        <DetailsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export function EditorialPolishPreview({ polish }: { polish: PolishId }) {
  return <ConceptPreview concept="b" polish={polish} />;
}

export function EditorialMotionPreview({ motion, release = false }: { motion: MotionId; release?: boolean }) {
  return <ConceptPreview concept="b" polish="b" motion={motion} release={release} />;
}
