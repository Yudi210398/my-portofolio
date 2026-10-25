import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getWhatsAppHref, WHATSAPP_NUMBER } from "@/config/public-contact";

type ContactMethod = {
  title: string;
  description: string;
  icon: "email" | "linkedin" | "github" | "whatsapp";
  href?: string;
  status?: string;
};

const contactMethods: readonly ContactMethod[] = [
  {
    title: "Email",
    description: "Direct professional inquiries",
    status: "Pending public approval",
    icon: "email",
  },
  {
    title: "LinkedIn",
    description: "Professional profile",
    status: "Not publicly shared yet",
    icon: "linkedin",
  },
  {
    title: "GitHub",
    description: "Code and repositories",
    href: "https://github.com/Yudi210398",
    icon: "github",
  },
  {
    title: "WhatsApp",
    description: "Direct professional messages",
    href: getWhatsAppHref(WHATSAPP_NUMBER) ?? undefined,
    status: "Number pending public approval",
    icon: "whatsapp",
  },
];

function ContactIcon({
  type,
}: {
  type: (typeof contactMethods)[number]["icon"];
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {type === "email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {type === "linkedin" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7m0-10v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" />
        </>
      )}
      {type === "github" && (
        <>
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
        </>
      )}
      {type === "whatsapp" && (
        <path d="M20 11.5a8 8 0 0 1-8 8 8.3 8.3 0 0 1-3.6-.8L4 20l1.3-4.4a8 8 0 1 1 14.7-4.1Z" />
      )}
    </svg>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-border"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
          <div className="lg:pt-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
              05 / Contact
            </p>
            <h2
              id="contact-title"
              className="mt-7 max-w-[12ch] text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              Let&apos;s build{" "}
              <span className="text-accent-blue">something great.</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m open to backend engineering opportunities, collaboration,
              and technical discussions. Feel free to reach out through the
              available channels below.
            </p>
          </div>
          <ul
            className="grid gap-4 sm:grid-cols-2"
            aria-label="Contact channels and availability"
          >
            {contactMethods.map((method) => (
              <li
                key={method.title}
                className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5 sm:min-h-48 sm:p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                  <ContactIcon type={method.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {method.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {method.description}
                </p>

                {method.href ? (
                  <a
                    href={method.href}
                    target={
                      method.href.startsWith("https://") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("https://")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-5 border-t border-border pt-4 text-sm font-semibold text-accent-blue underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue sm:mt-auto"
                  >
                    {method.icon === "whatsapp"
                      ? "Chat on WhatsApp"
                      : method.icon === "email"
                        ? "Send email"
                        : `Visit ${method.title}`}
                  </a>
                ) : (
                  <p className="mt-5 border-t border-border pt-4 text-xs font-medium tracking-wide text-muted sm:mt-auto">
                    {method.status}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
