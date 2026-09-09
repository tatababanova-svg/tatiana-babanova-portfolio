import Image from "next/image";
import landing from "@/content/landing.json";
import { MobileNavigation } from "@/components/mobile-navigation";
import { MotionController } from "@/components/motion-controller";

function Eyebrow({ children }: { children: string }) {
  return <p className="approved-eyebrow">{children}</p>;
}

function DisplayTitle({ id, lines }: { id: string; lines: string[] }) {
  return (
    <h2 className="approved-display" id={id}>
      {lines.map((line) => <span key={line}>{line}</span>)}
    </h2>
  );
}

function InlineEmphasis({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase || !text.includes(phrase)) return <>{text}</>;
  const [before, after] = text.split(phrase);
  return <>{before}<strong>{phrase}</strong>{after}</>;
}

function SiteHeader() {
  const items = landing.navigation.map((item) => item.label);
  const targets = landing.navigation.map((item) => item.target);

  return (
    <header className="approved-nav">
      <a className="approved-nav-name" href="#top" aria-label="Татьяна Бабанова — к началу страницы">
        <span>Татьяна Бабанова</span>
        <small>Менеджер проектов</small>
      </a>
      <nav className="approved-desktop-nav" aria-label="Основная навигация">
        {landing.navigation.map((item) => (
          <a href={`#${item.target}`} key={item.target}>{item.label}</a>
        ))}
      </nav>
      <MobileNavigation items={items} targets={targets} />
      <span className="approved-progress" aria-hidden="true" />
    </header>
  );
}

function HeroSection() {
  const { hero } = landing;

  return (
    <section className="approved-hero" id="top" aria-labelledby="approved-hero-title">
      <svg className="approved-hero-route" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
        <path d="M24 488C172 424 201 123 426 155C659 188 628 520 846 477C997 448 1017 207 1170 128" />
        <circle cx="24" cy="488" r="9" />
        <circle cx="426" cy="155" r="9" />
        <circle cx="846" cy="477" r="9" />
        <path className="approved-hero-route-arrow" d="m1140 111 30 17-25 24" />
      </svg>
      <div className="approved-hero-grid">
        <div className="approved-hero-role">
          <p className="approved-hero-name">{hero.name}</p>
          <h1 id="approved-hero-title" aria-label="Профиль Project Manager">
            <span>PROJECT</span>
            <span>MANAGER</span>
          </h1>
          <p className="approved-hero-specialization">{hero.specialization}</p>
          <p className="approved-hero-domains">{hero.domains}</p>
          <p className="approved-hero-experience">{hero.experience}</p>
        </div>

        <figure className="approved-portrait">
          <span className="approved-portrait-spark" aria-hidden="true" />
          <div className="approved-portrait-frame">
            <Image
              src={hero.portraitSrc}
              alt={hero.portraitAlt}
              fill
              priority
              sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 38vw"
            />
          </div>
        </figure>
      </div>

      <div className="approved-hero-promise">
        <span className="approved-orbit" aria-hidden="true" />
        <h2>{hero.title}</h2>
        <div>
          <p className="approved-hero-lead">{hero.lead}</p>
          <p className="approved-hero-statement">{hero.statement}</p>
          <p className="approved-hero-stakeholders">{hero.stakeholders}</p>
        </div>
      </div>

      <div className="approved-hero-stats" aria-label="Ключевые показатели">
        {hero.stats.map((stat) => (
          <article key={stat.value}>
            <strong className="approved-numeric">{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="approved-hero-actions">
        <a className="approved-button approved-button-primary" href="#cases" data-analytics-event="hero_cases">
          {hero.primaryCta}
        </a>
        <a className="approved-text-link" href={landing.contact.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf">
          {hero.secondaryCta} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function ResultsSection() {
  const { results } = landing;

  return (
    <section className="approved-section approved-results" id="results" aria-labelledby="approved-results-title" data-motion-section>
      <div className="approved-section-head">
        <Eyebrow>{results.label}</Eyebrow>
        <DisplayTitle id="approved-results-title" lines={results.titleLines} />
      </div>

      <div className="approved-results-grid">
        {results.items.map((item, index) => (
          <article className={`approved-result approved-result-${index + 1}`} key={item.accent}>
            <span className="approved-result-index">0{index + 1}</span>
            <strong className={`approved-result-accent${/\d/.test(item.accent) ? " approved-numeric" : ""}`}>{item.accent}</strong>
            <h3>{item.title}</h3>
            {item.intro ? <p>{item.intro}</p> : null}
            {"detailsBeforePrimary" in item && item.detailsBeforePrimary ? item.details?.map((detail) => <p key={detail}>{detail}</p>) : null}
            {item.primary ? <p className="approved-result-primary">{item.primary}</p> : null}
            {!("detailsBeforePrimary" in item && item.detailsBeforePrimary) ? item.details?.map((detail) => <p key={detail}>{detail}</p>) : null}
            {item.secondary ? <p className="approved-result-secondary">{item.secondary}</p> : null}
          </article>
        ))}
      </div>

      <aside className="approved-scale">
        <h3>{results.scale.title}</h3>
        <div>
          {results.scale.items.map((item) => (
            <p key={item.value}><strong className="approved-numeric">{item.value}</strong><span>{item.label}</span></p>
          ))}
        </div>
      </aside>
    </section>
  );
}

function MethodSection() {
  const { method } = landing;

  return (
    <section className="approved-section approved-method" id="method" aria-labelledby="approved-method-title" data-motion-section>
      <div className="approved-section-head approved-section-head-split">
        <div>
          <Eyebrow>{method.label}</Eyebrow>
          <DisplayTitle id="approved-method-title" lines={method.titleLines} />
        </div>
        <div className="approved-section-intro">
          <strong>{method.strongZone}</strong>
          <p>{method.intro}</p>
        </div>
      </div>

      <ol className="approved-method-steps">
        {method.steps.map((step) => (
          <li key={step.number}>
            <div className="approved-step-number">
              <span aria-hidden="true">→</span>
              <span className="approved-step-sr">Этап {step.number}</span>
            </div>
            <h3>{step.title}</h3>
            <p><InlineEmphasis text={step.text} phrase={"emphasis" in step ? step.emphasis : undefined} /></p>
            {step.note ? <strong>{step.note}</strong> : null}
          </li>
        ))}
      </ol>

      <div className="approved-business-value">
        <h3>{method.businessValueTitle}</h3>
        <div className="approved-business-grid">
          {method.businessValues.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <blockquote>{method.executiveNote}</blockquote>
        <p className="approved-personal-note">{method.personalNote}</p>
      </div>
    </section>
  );
}

function CasesSection() {
  const { cases } = landing;

  return (
    <section className="approved-section approved-cases" id="cases" aria-labelledby="approved-cases-title" data-motion-section>
      <div className="approved-section-head">
        <Eyebrow>{cases.label}</Eyebrow>
        <DisplayTitle id="approved-cases-title" lines={cases.titleLines} />
      </div>

      <div className="approved-case-list">
        {cases.items.map((item) => (
          <article className="approved-case" key={item.number}>
            <header className="approved-case-head">
              <span className="approved-case-number approved-numeric">{item.number}</span>
              <div>
                <p className="approved-case-tags">{item.tags}</p>
                <h3>{item.title}</h3>
              </div>
            </header>

            <div className="approved-case-body">
              <div className="approved-case-highlight">
                {item.headline.map((line) => <strong key={line}>{line}</strong>)}
                {item.project ? <p>{item.project}</p> : null}
              </div>
              <div className="approved-case-sections">
                {item.sections.map((section) => (
                  <div key={section.label}>
                    <h4>{section.label}</h4>
                    <p>{section.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="approved-case-result">
              <h4>Результат</h4>
              {item.resultFacts && !("metricsFirst" in item && item.metricsFirst) ? (
                <div className="approved-case-facts">
                  {item.resultFacts.map((fact) => <strong key={fact}>{fact}</strong>)}
                </div>
              ) : null}
              {item.results.length ? (
                <div className="approved-case-metrics">
                  {item.results.map((result) => (
                    <p key={result.value}><strong className={/\d/.test(result.value) ? "approved-numeric" : undefined}>{result.value}</strong>{"label" in result && result.label ? <span>{result.label}</span> : null}</p>
                  ))}
                </div>
              ) : null}
              {item.resultFacts && "metricsFirst" in item && item.metricsFirst ? (
                <div className="approved-case-facts">
                  {item.resultFacts.map((fact) => <strong key={fact}>{fact}</strong>)}
                </div>
              ) : null}
              {item.resultNotes ? (
                <div className="approved-case-notes">
                  {item.resultNotes.map((note) => <p key={note}>{note}</p>)}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <aside className="approved-vendors">
        <p>{cases.vendors.title}</p>
        <strong>{cases.vendors.metric}</strong>
        <div>
          <p>{cases.vendors.text}</p>
          <b>{cases.vendors.statement}</b>
        </div>
      </aside>
    </section>
  );
}

function ExperienceSection() {
  const { experience } = landing;

  return (
    <section className="approved-section approved-experience" id="experience" aria-labelledby="approved-experience-title" data-motion-section>
      <div className="approved-section-head">
        <Eyebrow>{experience.label}</Eyebrow>
        <DisplayTitle id="approved-experience-title" lines={experience.titleLines} />
        <p className="approved-career-path">{experience.path}</p>
      </div>

      <div className="approved-experience-list">
        {experience.items.map((item) => (
          <article key={item.period}>
            <p className="approved-experience-period">{item.period}</p>
            <div className="approved-experience-role">
              <h3>{item.company}</h3>
              <strong>{item.role}</strong>
            </div>
            <div className="approved-experience-copy">
              <p>{item.focus}</p>
              {item.proof && "proofBeforeText" in item && item.proofBeforeText ? <strong>{item.proof}</strong> : null}
              {item.text ? <p>{item.text}</p> : null}
              {item.proof && !("proofBeforeText" in item && item.proofBeforeText) ? <strong>{item.proof}</strong> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DetailsSection() {
  const { details } = landing;

  return (
    <section className="approved-section approved-details" id="details" aria-labelledby="approved-details-title" data-motion-section>
      <div className="approved-section-head">
        <Eyebrow>{details.label}</Eyebrow>
        <DisplayTitle id="approved-details-title" lines={details.titleLines} />
      </div>

      <div className="approved-details-grid">
        <article className="approved-toolbox">
          {details.tools.map((tool) => (
            <div key={tool.label}>
              <h3>{tool.label}</h3>
              <p>{tool.value}</p>
            </div>
          ))}
          <div className="approved-ai-copy">
            <h3>{details.aiIntro}</h3>
            <strong>{details.aiUses}</strong>
            <p>{details.aiText}</p>
          </div>
        </article>

        <article className="approved-credentials">
          <div>
            <h3>ОБРАЗОВАНИЕ</h3>
            {details.education.map((item) => (
              <section key={item.institution}>
                <strong>{item.institution}</strong>
                <p>{item.program}</p>
              </section>
            ))}
          </div>
          <div>
            <h3>ЯЗЫКИ</h3>
            {details.languages.map((language) => <p key={language}>{language}</p>)}
          </div>
        </article>
      </div>
    </section>
  );
}

function ContactSection() {
  const { contact } = landing;

  return (
    <footer className="approved-contact" id="contacts" aria-labelledby="approved-contact-title" data-motion-section>
      <div className="approved-contact-head">
        <Eyebrow>{contact.label}</Eyebrow>
        <DisplayTitle id="approved-contact-title" lines={contact.titleLines} />
      </div>

      <div className="approved-contact-copy">
        <p><InlineEmphasis text={contact.text} phrase={contact.textEmphasis} /></p>
        <p><InlineEmphasis text={contact.role} phrase={contact.roleEmphasis} /></p>
      </div>

      <div className="approved-contact-action">
        <div>
          <span className="approved-contact-kicker">Открыта к новым проектам</span>
          <h3>{contact.ctaTitle}</h3>
        </div>
        <a
          className="approved-button approved-button-light"
          href={contact.telegramHref}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="contact_telegram"
        >
          {contact.cta} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <address className="approved-contact-details">
        <div>
          <span>Телефон</span>
          <a href={contact.phoneHref} data-analytics-event="contact_phone">{contact.phone}</a>
        </div>
        <div>
          <span>Почта</span>
          <a href={contact.emailHref} data-analytics-event="contact_email">{contact.email}</a>
        </div>
        <div>
          <span>Формат работы</span>
          <p>{contact.location}</p>
        </div>
        <a className="approved-contact-resume" id="pdf" href={contact.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf">{contact.resumeCta} <span aria-hidden="true">↗</span></a>
      </address>

      <div className="approved-footer-signature">
        <div>
          <strong>Татьяна Бабанова</strong>
          <span>Менеджер проектов · Москва</span>
        </div>
        <a href="#top">Наверх <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

export function ApprovedLanding() {
  return (
    <div className="approved-site motion motion-c" data-motion="c">
      <div className="approved-ambient-grid" aria-hidden="true" />
      <MotionController motion="c" />
      <SiteHeader />
      <main>
        <HeroSection />
        <ResultsSection />
        <MethodSection />
        <CasesSection />
        <ExperienceSection />
        <DetailsSection />
        <ContactSection />
      </main>
    </div>
  );
}
