import Image from "next/image";
import { technologyLogos } from "@/data/technology-logos";
import type { CaseStudy, PublishedProject } from "@/types/project";
import styles from "./BatikCaseStudyIntro.module.css";

type Showcase = NonNullable<CaseStudy["engineeringShowcase"]>;

const icons = {
  layers: "m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5",
  shield: "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-10 2 2 4-4",
  database: "M20 5c0 1.7-3.6 3-8 3S4 6.7 4 5s3.6-3 8-3 8 1.3 8 3ZM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  cloud: "M7 19a5 5 0 0 1-.9-9.9 6 6 0 0 1 11.7 1.4A4.3 4.3 0 0 1 18 19H7Z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m12-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  calendar: "M8 2v4m8-4v4M3 10h18M3 5h18v16H3z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18",
  box: "m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5m-9 5v10",
  outgoing: "M4 19v-3a6 6 0 0 1 6-6h10m-5-5 5 5-5 5",
  browser: "M3 4h18v16H3zM3 8h18m-15-2h.01m3 0h.01",
  bolt: "m13 2-9 12h7l-1 8 10-12h-7l1-8Z",
  check: "m5 12 4 4L19 6",
  external: "M11 3h10v10m0-10L10 14m-2-9H3v16h16v-5",
  chevron: "m9 6 6 6-6 6",
};

function Icon({ name, className = "size-5" }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
}

type Node = {
  title: string;
  text: string;
  icon: keyof typeof icons;
  technology?: string;
};

const highlights: readonly Node[] = [
  { title: "FIFO & Supplier Traceability", text: "Allocate inventory using FIFO while preserving the ability to trace stock origins by supplier.", icon: "layers" },
  { title: "Authentication & Access Control", text: "Restrict application access using JWT, refresh token rotation, and role-based access control.", icon: "shield" },
  { title: "Transactional Data Integrity", text: "Use database transactions, stock validation, and idempotency to maintain inventory consistency and reduce duplicate transaction risks.", icon: "database" },
  { title: "Automated Testing & Cloud Deployment", text: "Apply unit, integration, end-to-end, and frontend testing, with cloud deployment through Vercel and Neon PostgreSQL.", icon: "cloud" },
];

const stockFlow: readonly Node[] = [
  { title: "Supplier", text: "Provides batik clothing inventory.", icon: "user" },
  { title: "Incoming Stock", text: "Records received inventory and supplier information.", icon: "box" },
  { title: "FIFO Allocation", text: "Allocates older eligible inventory first.", icon: "layers" },
  { title: "Outgoing Stock", text: "Records outgoing inventory according to FIFO allocation.", icon: "outgoing" },
];

const architecture: readonly Node[] = [
  { title: "User", text: "Accesses the application through a desktop or mobile browser.", icon: "user" },
  { title: "Frontend", technology: "Next.js / React", text: "User interface, data display, interaction, and API integration.", icon: "browser" },
  { title: "Backend", technology: "NestJS REST API", text: "Authentication, authorization, inventory rules, supplier traceability, and transaction handling.", icon: "code" },
  { title: "Prisma ORM", text: "Database access and query management.", icon: "layers" },
  { title: "Database", technology: "Neon PostgreSQL", text: "Persistent relational storage for application data.", icon: "database" },
];

const backendResponsibilities: readonly Node[] = [
  { title: "Authentication", text: "JWT and refresh token rotation.", icon: "shield" },
  { title: "Authorization", text: "Role-Based Access Control.", icon: "user" },
  { title: "Transaction Handling", text: "Atomic inventory operations.", icon: "bolt" },
];

const sections = [
  ["business-problem", "Business Problem", "The operational challenges behind Batik App."],
  ["role-responsibilities", "Role & Responsibilities", "Project ownership and engineering responsibilities."],
  ["system-architecture", "System Architecture", "The technology stack and each layer’s role."],
  ["engineering-decisions", "Engineering Decisions & Trade-offs", "Technical decisions, why they were made, and their costs."],
  ["failure-testing", "Failure Handling & Testing", "Safeguards and the reported testing approach."],
  ["current-results", "Current Results", "Implemented capabilities and current operational use."],
] as const;

type ApplicationLink = NonNullable<PublishedProject["links"]>[number];

function ViewApplication({ link }: { link?: ApplicationLink }) {
  if (!link) return null;
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer"
      className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-md border border-accent-blue bg-accent-blue/15 px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent-blue/25">
      {link.label} <Icon name="external" className="size-4" />
    </a>
  );
}

function Diagram({ label, nodes, flow = false }: { label: string; nodes: readonly Node[]; flow?: boolean }) {
  return (
    <ol aria-label={label} className={`${styles.diagram} ${flow ? styles.stockFlow : styles.architecture}`}>
      {nodes.map((node) => (
        <li key={node.title} className={`${styles.node} ${node.title === "FIFO Allocation" ? styles.highlighted : ""}`}>
          <Icon name={node.icon} className="size-6 shrink-0 text-indigo-300" />
          <div>
            <h3>{node.title}</h3>
            {node.technology && <p className={styles.nodeTechnology}>{node.technology}</p>}
            <p>{node.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function BatikCaseStudyIntro({ project, showcase, applicationLink }: {
  project: PublishedProject;
  showcase: Showcase;
  applicationLink?: ApplicationLink;
}) {
  const overview = [
    { label: "Role", value: showcase.role, icon: "user" },
    { label: "Status", value: <span className={styles.completed}>Completed</span>, icon: "layers" },
    { label: "Lifecycle", value: showcase.lifecycle, icon: "calendar" },
    { label: "Repository", value: showcase.repository, icon: "code" },
  ] as const;

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.identity}>
          <p className="text-xs font-semibold tracking-wider text-indigo-200 uppercase">Project case study</p>
          <h1>{project.title}</h1>
          <p className={styles.subtitle}>{showcase.subtitle}</p>
          <p className={styles.summary}>{showcase.summary}</p>
          <div className={styles.projectStatus}>
            <span className={styles.completed}><Icon name="check" className="size-4" /> Completed</span>
            <span>Deployed &amp; In Operational Use</span>
          </div>
          <ViewApplication link={applicationLink} />
        </div>
        <dl aria-label="Project overview" className={styles.overview}>
          {overview.map(({ label, value, icon }) => (
            <div key={label}>
              <dt><Icon name={icon} className="size-5 shrink-0 text-indigo-300" />{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className={styles.stack}>
        <p>Tech Stack</p>
        <ul aria-label="Technology stack">
          {project.stack.map((technology) => {
            const logo = technologyLogos[technology];
            return (
              <li key={technology}>
                {logo && <Image src={logo} alt="" width={22} height={22} unoptimized />}
                {technology}
              </li>
            );
          })}
        </ul>
      </div>

      <section className={styles.section} aria-labelledby="engineering-highlights">
        <h2 id="engineering-highlights">Core Engineering Highlights</h2>
        <p>Key engineering areas designed to address inventory business rules, security, transactional integrity, and application delivery.</p>
        <ul className={styles.highlights}>
          {highlights.map(({ title, text, icon }) => (
            <li key={title}>
              <span className={styles.iconTile}><Icon name={icon} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="fifo-traceability">
        <h2 id="fifo-traceability">FIFO &amp; Supplier Traceability</h2>
        <p>How inventory flows from supplier to outgoing stock using FIFO while keeping the stock origin traceable.</p>
        <figure>
          <Diagram label="FIFO inventory flow" nodes={stockFlow} flow />
          <figcaption className={styles.trace}>
            <div className={styles.traceTrack}><span>Supplier Traceability</span></div>
            <p>Outgoing inventory can be traced back to its originating supplier through inventory and transaction records.</p>
          </figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="architecture-overview">
        <h2 id="architecture-overview">System Architecture</h2>
        <p>A high-level architecture of Batik App and the responsibilities of each layer.</p>
        <Diagram label="Architecture layers" nodes={architecture} />
        <p className={styles.backendLabel}>NestJS backend responsibilities</p>
        <ul className={styles.backendResponsibilities} aria-label="NestJS backend responsibilities">
          {backendResponsibilities.map(({ title, text, icon }) => (
            <li key={title}>
              <span className={styles.iconTile}><Icon name={icon} className="size-4" /></span>
              <div><strong>{title}</strong><p>{text}</p></div>
            </li>
          ))}
        </ul>
        <dl className={styles.deployment}>
          <div>
            <dt><Icon name="cloud" /> Deployment</dt>
            <dd>Frontend and Backend — Vercel<br />Database — Neon PostgreSQL</dd>
          </div>
          <div>
            <dt><Icon name="database" /> Database Access</dt>
            <dd>Separate migration and runtime database privileges follow the principle of least privilege.</dd>
          </div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="case-study-index">
        <h2 id="case-study-index">Case Study</h2>
        <p>A deeper look at the problem, my role, the technical approach, and the results.</p>
        <nav aria-label="Case study sections">
          <ol className={styles.sectionLinks}>
            {sections.map(([id, title, description], index) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span className={styles.sectionNumber} aria-hidden="true">0{index + 1}</span>
                  <span><strong>{title}</strong><span>{description}</span></span>
                  <Icon name="chevron" className="ml-auto size-5 shrink-0 text-indigo-200" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </>
  );
}

export function BatikClosingPanel({ summary, applicationLink }: {
  summary: string;
  applicationLink?: ApplicationLink;
}) {
  return (
    <section aria-labelledby="batik-closing-title" className={styles.closing}>
      <h2 id="batik-closing-title">
        <span className={styles.completed}><Icon name="check" className="size-4" /></span> Current Results
      </h2>
      <p>{summary}</p>
      <ViewApplication link={applicationLink} />
    </section>
  );
}
