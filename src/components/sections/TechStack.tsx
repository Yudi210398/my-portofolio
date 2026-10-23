import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const primaryStack = [
  {
    name: "NestJS",
    role: "Backend Framework",
    logo: "/images/tech/nestjs.svg",
  },
  {
    name: "TypeScript",
    role: "Primary Language",
    logo: "/images/tech/typescript-official.svg",
  },
  {
    name: "Node.js",
    role: "JavaScript Runtime",
    logo: "/images/tech/nodedotjs.svg",
  },
] as const;

const otherTechnologies = [
  {
    category: "Backend",
    items: [{ name: "Express.js", logo: "/images/tech/express.svg" }],
  },
  {
    category: "Database & data access",
    items: [
      { name: "PostgreSQL", logo: "/images/tech/postgresql.svg" },
      { name: "MySQL", logo: "/images/tech/mysql.svg" },
      { name: "MongoDB", logo: "/images/tech/mongodb.svg" },
      { name: "Prisma", logo: "/images/tech/prisma.svg" },
      { name: "Mongoose", logo: "/images/tech/mongoose.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React.js", logo: "/images/tech/react.svg" },
      { name: "Next.js", logo: "/images/tech/nextdotjs.svg" },
      { name: "JavaScript", logo: "/images/tech/javascript.svg" },
    ],
  },
  {
    category: "Tools & integrations",
    items: [
      { name: "Docker", logo: "/images/tech/docker.svg" },
      { name: "Tailwind CSS v4", logo: "/images/tech/tailwindcss.svg" },
    ],
  },
  {
    category: "Authentication standards",
    items: [
      { name: "JWT", logo: "/images/tech/jsonwebtokens.svg" },
      { name: "OAuth2", logo: "/images/tech/auth0.svg" },
    ],
  },
] as const;

export function TechStack() {
  return (
    <Section aria-labelledby="stack-title" className="border-t border-border">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
            03 / Tech stack
          </p>
          <h2
            id="stack-title"
            className="mt-7 text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Core tools for{" "}
            <span className="text-accent-blue">backend development.</span>
          </h2>
          <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-muted sm:text-lg">
            Technologies I work with across backend development, data, and web
            applications.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {primaryStack.map((technology) => (
            <li
              key={technology.name}
              className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-8 text-center"
            >
              <Image
                src={technology.logo}
                alt=""
                width={64}
                height={64}
                unoptimized
                className="h-16 w-16 object-contain"
              />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                {technology.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{technology.role}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-foreground">
            Other technologies
          </h3>
          <div className="mt-6">
            {otherTechnologies.map((group) => (
              <div
                key={group.category}
                className="grid gap-4 border-t border-border py-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8"
              >
                <h4 className="pt-1 text-sm font-semibold text-muted">
                  {group.category}
                </h4>
                <ul className="grid min-w-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((technology) => (
                    <li
                      key={technology.name}
                      className="flex min-h-16 min-w-0 items-center gap-2 rounded-lg border border-border bg-surface/60 px-2.5 py-3 sm:gap-3 sm:px-3"
                    >
                      {"logo" in technology && (
                        <Image
                          src={technology.logo}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                          className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
                        />
                      )}
                      <span className="min-w-0 text-sm font-medium leading-snug text-foreground">
                        {technology.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
