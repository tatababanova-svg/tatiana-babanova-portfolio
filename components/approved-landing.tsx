import Image from "next/image";
import landing from "@/content/landing.json";
import { MobileNavigation } from "@/components/mobile-navigation";
import { MotionController } from "@/components/motion-controller";

function withoutTrailingPeriod(text: string) {
  return text.replace(/\.$/, "");
}

function Eyebrow({ children }: { children: string }) {
  return <p className="approved-eyebrow">{children}</p>;
}

function DisplayTitle({ id, lines }: { id: string; lines: string[] }) {
  return (
    <h2 className="approved-display" id={id}>
      {lines.map((line) => <span key={line}>{withoutTrailingPeriod(line)}</span>)}
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
      <nav className="approved-desktop-nav" aria-label="Основная навигация">
        {landing.navigation.map((item) => (
          <a href={`#${item.target}`} data-nav-target={item.target} key={item.target}>{item.label}</a>
        ))}
      </nav>
      <MobileNavigation items={items} targets={targets} />
      <span className="approved-progress" aria-hidden="true" />
    </header>
  );
}

function HeroSection() {
  const { hero } = landing;
  const [firstName, lastName] = hero.name.split(" ");

  return (
    <section className="approved-hero" id="top" aria-labelledby="approved-hero-title">
      <div className="approved-hero-shell">
        <p className="approved-hero-signature" data-hero-motion>
          <span>{firstName}</span>
          <span>{lastName}</span>
          <i aria-hidden="true">Портфолио · 2026</i>
        </p>

        <div className="approved-hero-copy">
          <p className="approved-hero-role-label" data-hero-motion>{hero.role}</p>
          <h1 id="approved-hero-title" data-hero-motion>{withoutTrailingPeriod(hero.title)}</h1>
          <p className="approved-hero-lead" data-hero-motion>{hero.lead}</p>
          <p className="approved-hero-statement" data-hero-motion>{hero.statement}</p>
          <div className="approved-hero-actions" data-hero-motion>
            <a className="approved-button approved-button-primary" href="#cases" data-analytics-event="hero_cases">
              {hero.primaryCta}
            </a>
            <a className="approved-button approved-button-secondary" href={landing.contact.resumeHref} target="_blank" rel="noreferrer" data-analytics-event="resume_pdf">
              {hero.secondaryCta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <figure className="approved-portrait" data-hero-motion>
          <div className="approved-portrait-frame">
            <Image
              src={hero.portraitSrc}
              alt={hero.portraitAlt}
              fill
              priority
              sizes="(max-width: 820px) 92vw, (max-width: 1180px) 44vw, 40vw"
            />
          </div>
        </figure>
      </div>

      <div className="approved-hero-proof" data-reveal>
        <p>{hero.domains}</p>
        <p>{hero.stakeholders}</p>
      </div>

      <div className="approved-hero-stats" aria-label="Ключевые показатели">
        {hero.stats.map((stat) => (
          <article data-reveal key={stat.value}>
            <strong className="approved-numeric">{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="approved-hero-ticker" aria-hidden="true">
        <div>
          <span>СРОКИ</span><i />
          <span>БЮДЖЕТ</span><i />
          <span>РИСКИ</span><i />
          <span>ЗАВИСИМОСТИ</span><i />
          <span>КАЧЕСТВО</span><i />
          <span>ПРИЁМКА</span>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const { results } = landing;

  return (
    <section className="approved-section approved-results" id="results" aria-labelledby="approved-results-title" data-motion-section>
      <div className="approved-section-head" data-reveal>
        <Eyebrow>{results.label}</Eyebrow>
        <DisplayTitle id="approved-results-title" lines={results.titleLines} />
      </div>

      <div className="approved-results-grid">
        {results.items.map((item, index) => (
          <article className={`approved-result approved-result-${index + 1}`} data-reveal key={item.accent}>
            <div className="approved-result-copy">
              <strong className={`approved-result-accent${/\d/.test(item.accent) ? " approved-numeric" : ""}`}>{item.accent}</strong>
              <h3>{item.title}</h3>
              {item.intro ? <p>{item.intro}</p> : null}
              {item.primary ? <p className="approved-result-primary">{item.primary}</p> : null}
              {item.secondary ? <p className="approved-result-secondary">{item.secondary}</p> : null}
            </div>
          </article>
        ))}
      </div>

      <aside className="approved-scale" data-reveal>
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
      <div className="approved-section-head approved-section-head-split" data-reveal>
        <div>
          <Eyebrow>{method.label}</Eyebrow>
          <DisplayTitle id="approved-method-title" lines={method.titleLines} />
        </div>
        <div className="approved-section-intro">
          <strong>{method.strongZone}</strong>
          <p>{method.intro}</p>
        </div>
      </div>

      <div className="approved-method-route" aria-hidden="true"><span /></div>
      <ol className="approved-method-steps">
        {method.steps.map((step) => (
          <li data-reveal key={step.number}>
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

      <div className="approved-business-value" data-reveal>
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
      <div className="approved-section-head" data-reveal>
        <Eyebrow>{cases.label}</Eyebrow>
        <DisplayTitle id="approved-cases-title" lines={cases.titleLines} />
      </div>

      <div className="approved-case-list">
        {cases.items.map((item) => (
          <article className="approved-case" data-reveal key={item.number}>
            <div className="approved-case-visual" aria-hidden="true">
              <div className="approved-case-highlight">
                {item.headline.map((line) => <strong key={line}>{line}</strong>)}
                {item.project ? <p>{item.project}</p> : null}
              </div>
            </div>

            <div className="approved-case-content">
              <header className="approved-case-head">
                <span className="approved-case-number approved-numeric">{item.number}</span>
                <div>
                  <p className="approved-case-tags">{item.tags}</p>
                  <h3>{item.title}</h3>
                </div>
              </header>

              <div className="approved-case-sections">
                {item.sections.map((section) => (
                  <div key={section.label}>
                    <h4>{section.label}</h4>
                    <p>{section.text}</p>
                  </div>
                ))}
              </div>
              <div className="approved-case-result">
                <h4>Результат</h4>
                <div className="approved-case-result-content">
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
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="approved-vendors" data-reveal>
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
      <div className="approved-section-head" data-reveal>
        <Eyebrow>{experience.label}</Eyebrow>
        <DisplayTitle id="approved-experience-title" lines={experience.titleLines} />
        <p className="approved-career-path">{experience.path}</p>
      </div>

      <div className="approved-experience-list">
        {experience.items.map((item) => (
          <article data-reveal key={item.period}>
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
      <div className="approved-section-head" data-reveal>
        <Eyebrow>{details.label}</Eyebrow>
        <DisplayTitle id="approved-details-title" lines={details.titleLines} />
      </div>

      <div className="approved-details-grid">
        <article className="approved-toolbox" data-reveal>
          {details.tools.map((tool) => (
            <div key={tool.label}>
              <h3>{tool.label}</h3>
              <div>
                <strong>{tool.value}</strong>
                <p>{tool.purpose}</p>
              </div>
            </div>
          ))}
          <div className="approved-ai-copy">
            <h3>{details.aiIntro}</h3>
            <strong>{details.aiUses}</strong>
            <p>{details.aiText}</p>
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
      <div className="approved-contact-head" data-reveal>
        <Eyebrow>{contact.label}</Eyebrow>
        <DisplayTitle id="approved-contact-title" lines={contact.titleLines} />
      </div>

      <div className="approved-contact-copy" data-reveal>
        <p><InlineEmphasis text={contact.text} phrase={contact.textEmphasis} /></p>
        <p><InlineEmphasis text={contact.role} phrase={contact.roleEmphasis} /></p>
      </div>

      <div className="approved-contact-action" data-reveal>
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

      <address className="approved-contact-details" data-reveal>
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

      <div className="approved-footer-end">
        <span>© 2026</span>
        <a href="#top">Наверх <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

export function ApprovedLanding() {
  return (
    <div className="approved-site approved-modern" data-motion="c">
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
