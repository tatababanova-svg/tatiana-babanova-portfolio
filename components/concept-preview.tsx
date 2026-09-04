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

const navTargets = ["top", "cases", "method", "experience", "contacts", "pdf"];

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
    <div id="project-logic" className={`logic-visual logic-sequence ${polish ? `logic-polish-${polish}` : ""}`} aria-label={profile.logic.ariaLabel}>
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

function CaseMeta({ item }: { item: CaseItem }) {
  return (
    <dl>
      <div><dt>Роль</dt><dd>{item.role}</dd></div>
      <div><dt>Инструменты</dt><dd>{item.tools}</dd></div>
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
      <div className="section-number">04.{item.number} / РАЗБОР ПРОЕКТА</div>
      <header className="case-feature-head">
        <div>
          <p>CASE {item.number} · {item.label}</p>
          <h2 id={`case-${item.id}-title`}>{item.title}</h2>
        </div>
        <CaseMeta item={item} />
      </header>

      {item.visual ? <BeforeAfterDiagram item={item} polish={polish} /> : (
        <div className="case-context-grid">
          <article><span>01</span><h3>Контекст</h3><p>{item.context}</p></article>
          <article><span>02</span><h3>Что было до</h3><p>{item.before}</p></article>
          <article><span>03</span><h3>Диагностика</h3><p>{item.diagnosis}</p></article>
        </div>
      )}

      <div className="case-feature-grid">
        {decisionCards.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="case-process">
        <header>
          <span>МЕХАНИЗМ РЕАЛИЗАЦИИ</span>
          <p>{item.rejectedOrNotChosen}</p>
        </header>
        <ol>
          {item.implementation.map((step, index) => (
            <li key={step}><small>{String(index + 1).padStart(2, "0")}</small><span>{step}</span></li>
          ))}
        </ol>
      </div>

      <div className="case-outcome">
        <article><span>ПРИЁМКА</span><p>{item.acceptance}</p></article>
        <article className="case-outcome-result"><span>РЕЗУЛЬТАТ</span><p>{item.result}</p></article>
        <article><span>ПРИНЦИП УПРАВЛЕНИЯ</span><p>{item.managementPrinciple}</p></article>
      </div>

      <div className="proof-tags" aria-label="Подтверждаемые компетенции">
        {item.proofTags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
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
        <span aria-hidden="true">↗</span>
      </figcaption>
    </figure>
  );
}

function MethodSection() {
  return (
    <section className="method" id="method" aria-labelledby="method-title" data-motion-section>
      <div className="section-number">03 / {profile.sectionLabels.method}</div>
      <div className="section-heading">
        <h2 id="method-title">{profile.method.title}</h2>
        <p>{profile.method.intro}</p>
      </div>
      <div className="question-grid">
        {profile.method.questions.map((item, index) => (
          <article className="question" key={item.question}>
            <span className="question-index" aria-hidden="true">0{index + 1}</span>
            <h3>{item.question}</h3>
            <p>→ {item.answer}</p>
          </article>
        ))}
      </div>
      <div className="scenario-list">
        {profile.method.scenarios.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SummaryBand() {
  return (
    <section className="summary-band" aria-labelledby="summary-title" data-motion-section>
      <div className="section-number">05 / МАСШТАБ</div>
      <div className="section-heading">
        <h2 id="summary-title">{profile.summary.title}</h2>
        <p>{profile.summary.text}</p>
      </div>
      <div className="summary-metrics">
        {profile.summary.items.map((item) => (
          <article key={item.value}>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OtherProjectsSection() {
  return (
    <section className="other-projects" id="other-projects" aria-labelledby="other-projects-title" data-motion-section>
      <div className="section-number">06 / {profile.sectionLabels.otherProjects}</div>
      <div className="section-heading">
        <h2 id="other-projects-title">ЕЩЁ ВОСЕМЬ ПРОЕКТНЫХ РАЗВИЛОК</h2>
        <p>В закрытом состоянии — результат. В раскрытии — управленческое решение и риск, который нужно было удержать.</p>
      </div>
      <div className="other-project-list">
        {otherProjects.map((item, index) => (
          <details id={item.id} key={item.id}>
            <summary>
              <span className="other-project-index">{String(index + 1).padStart(2, "0")}</span>
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
      <div className="section-number">07 / {profile.sectionLabels.experience}</div>
      <div className="section-heading">
        <h2 id="experience-title">КАРЬЕРНАЯ ИСТОРИЯ</h2>
        <p>Коротко о контуре роли. Подробности, решения и результаты раскрыты в кейсах выше.</p>
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
    <section className="details-section" aria-labelledby="details-title" data-motion-section>
      <div className="section-number">08 / {profile.sectionLabels.details}</div>
      <div className="section-heading">
        <h2 id="details-title">ПРОФЕССИОНАЛЬНЫЙ КОНТУР</h2>
        <p>Инструменты показаны внутри кейсов; здесь — полный справочный список из обновлённого резюме.</p>
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
      <div className="section-number">09 / {profile.sectionLabels.contacts}</div>
      <div className="contact-copy">
        <h2 id="contacts-title">{contacts.title}</h2>
        <p>{contacts.text}</p>
        <span>{contacts.format}</span>
      </div>
      <div className="contact-links">
        <a className="button button-primary" href={contacts.telegramHref} data-analytics-event="contact_telegram">Написать в Telegram <b aria-hidden="true">↗</b></a>
        <a className="button button-secondary" href={contacts.emailHref} data-analytics-event="contact_email">Написать на email <b aria-hidden="true">↗</b></a>
        <a className="button button-secondary" id="pdf" href={contacts.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf">PDF-резюме <b aria-hidden="true">↓</b></a>
      </div>
      <address>
        <strong>{contacts.name}</strong>
        <a href={contacts.phoneHref} data-analytics-event="contact_phone">{contacts.phone}</a>
        <a href={contacts.emailHref} data-analytics-event="contact_email">{contacts.email}</a>
        <a href={contacts.telegramHref} data-analytics-event="contact_telegram">{contacts.telegram}</a>
      </address>
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
        <a className="site-name" href="#top">{profile.navigation[0]}</a>
        <span className="nav-status"><i />{profile.navigationStatus}</span>
        <nav aria-label="Основная навигация">
          {profile.navigation.slice(1).map((item, index) => (
            <a key={item} href={`#${navTargets[index + 1]}`}>{item}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="concept-mark" aria-label={release ? "Профиль Project Manager" : `Концепция ${concept.toUpperCase()}`}>
            <span>{release ? "PM" : `0${concept === "a" ? 1 : concept === "b" ? 2 : 3}`}</span>
            <span>{conceptMeta.label}</span>
          </div>

          <div className="hero-copy">
            <p className="hero-name">{profile.hero.name}</p>
            <h1 id="hero-title" aria-label={profile.hero.role}>
              <span>{profile.hero.roleLine1}</span>
              <span>{profile.hero.roleLine2}</span>
            </h1>
            <p className="hero-kicker">{profile.hero.kicker}</p>
            <p className="hero-intro">{profile.hero.intro}</p>
            <p className="hero-promise">{profile.hero.promise}</p>
            <p className="hero-support">{profile.hero.support}</p>

            <div className="hero-meta" aria-label="Опыт и формат работы">
              <span>{profile.hero.context}</span>
              <span>{profile.hero.format}</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#cases" data-analytics-event="hero_cases"><span>{profile.hero.primaryCta}</span><b aria-hidden="true">↘</b></a>
              <a className="button button-secondary" href={contacts.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf"><span>{profile.hero.secondaryCta}</span><b aria-hidden="true">↓</b></a>
            </div>
          </div>

          <Portrait />
          <ProjectLogic concept={concept} polish={polish} />

          <div className="hero-folio" aria-hidden="true">
            <span>PM / 2026</span>
            <span>{conceptMeta.code}</span>
          </div>
        </section>

        <section className="case-index" id="cases" aria-labelledby="cases-title" data-motion-section>
          <div className="section-number">02 / {profile.sectionLabels.cases}</div>
          <div className="section-heading">
            <h2 id="cases-title">{profile.caseIndex.title}</h2>
            <p>{profile.caseIndex.intro}</p>
          </div>
          <div className="metric-grid">
            {metrics.map((item, index) => (
              <a className="metric" href={`#${item.target}`} key={item.value} data-analytics-event={`case_${item.target}`}>
                <span className="metric-index" aria-hidden="true">0{index + 1}</span>
                <strong>{item.value}</strong>
                <span className="metric-meta">{item.meta}</span>
                <span className="metric-link">{item.link} →</span>
              </a>
            ))}
          </div>
        </section>

        <MethodSection />
        {polish ? caseItems.map((item) => <CaseStudy item={item} polish={polish} key={item.id} />) : null}
        <SummaryBand />
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
