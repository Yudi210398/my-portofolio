import Image from "next/image";
import { technologyLogos } from "@/data/technology-logos";
import type { CaseStudy, PublishedProject } from "@/types/project";
import styles from "./CatalogCaseStudyIntro.module.css";

type Props = {
  project: PublishedProject;
  showcase: NonNullable<CaseStudy["catalogShowcase"]>;
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

const technologies = [
  { key: "HTML5", label: "HTML5" },
  { key: "CSS3", label: "CSS3" },
  { key: "JavaScript", label: "JavaScript" },
  { key: "Playwright", label: "Playwright", note: "Testing" },
  { key: "Git", label: "Git / GitHub", note: "Version Control" },
];

const testing = [
  "Responsive browser testing",
  "Navigation & anchors",
  "Scrollspy",
  "Keyboard & focus",
  "Reduced-motion support",
  "Preliminary Playwright testing",
];

export function CatalogCaseStudyIntro({ project, showcase }: Props) {
  const statusLabel = {
    "in-progress": "In Progress",
    "pre-release": "Pre-release",
    completed: "Completed",
  }[project.status];
  const overview = [
    ["Project Type", showcase.projectType],
    ["Role", showcase.ownershipRole],
    ["Architecture", showcase.architecture],
    ["Status", statusLabel],
  ];

  return (
    <div className={styles.intro}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Project case study</p>
          <h1>{project.title}</h1>
          <p className={styles.subtitle}>{showcase.subtitle}</p>
          <p className={styles.summary}>{showcase.summary}</p>
          <dl className={styles.heroMeta}>
            <div>
              <dt className="sr-only">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="sr-only">Status</dt>
              <dd className={styles.status}>{statusLabel}</dd>
            </div>
          </dl>
        </div>
        <figure
          className={styles.journey}
          aria-labelledby="catalog-journey-title"
        >
          <figcaption id="catalog-journey-title">
            From catalog to conversation.
          </figcaption>
          <ol aria-label="Catalog to confirmation">
            <li>
              <span className={styles.journeyNumber}>01</span>
              <div>
                <h2>Explore the catalog</h2>
                <p>Discover homemade cakes and the ordering process.</p>
              </div>
            </li>
            <li>
              <span className={styles.journeyNumber}>02</span>
              <div>
                <h2>Contact Mama Dina</h2>
                <p>Share preferences through WhatsApp.</p>
              </div>
            </li>
            <li>
              <span className={styles.journeyNumber}>03</span>
              <div>
                <h2>Confirm together</h2>
                <p>
                  Availability, details, and schedule are confirmed manually.
                </p>
              </div>
            </li>
          </ol>
          <div className={styles.journeyFooter}>
            <span className={styles.status}>{statusLabel}</span>
            <span>Static catalog · Human-led ordering</span>
          </div>
        </figure>
      </header>

      <div className={styles.core}>
        <section aria-labelledby="ordering-flow" className={styles.flow}>
          <h2 id="ordering-flow">The Ordering Flow</h2>
          <p className={styles.flowSubtitle}>
            From discovering products to confirming an order.
          </p>
          <ol aria-label="Manual ordering steps" className={styles.steps}>
            {showcase.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < showcase.steps.length - 1 && (
                  <span className={styles.connector}>
                    <Arrow />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className={styles.manualNote}>
            Orders and availability are confirmed manually through WhatsApp.
          </p>
        </section>

        <aside aria-labelledby="project-overview" className={styles.overview}>
          <h2 id="project-overview">Project at a Glance</h2>
          <dl>
            {overview.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className={styles.strip}>
        <section aria-labelledby="catalog-tech" className={styles.techPanel}>
          <h2 id="catalog-tech">Tech Stack</h2>
          <ul aria-label="Dina Cake technologies">
            {technologies.map((technology) => (
              <li key={technology.key}>
                {technologyLogos[technology.key] ? (
                  <Image
                    src={technologyLogos[technology.key]!}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                  />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3v12a4 4 0 0 0 4 4h4M6 7h8a4 4 0 0 1 4 4v2" />
                    <circle cx="6" cy="3" r="2" />
                    <circle cx="6" cy="15" r="2" />
                    <circle cx="18" cy="15" r="2" />
                  </svg>
                )}
                <span>{technology.label}</span>
                {technology.note && <small>{technology.note}</small>}
              </li>
            ))}
          </ul>
        </section>
        <section
          aria-labelledby="catalog-testing"
          className={styles.testingPanel}
        >
          <div className={styles.testingHeading}>
            <h2 id="catalog-testing">Testing & Status</h2>
            <span className={styles.status}>{statusLabel}</span>
          </div>
          <ul>
            {testing.map((item) => (
              <li key={item}>
                <svg
                  aria-hidden="true"
                  className={styles.check}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 3 3 5-6" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
