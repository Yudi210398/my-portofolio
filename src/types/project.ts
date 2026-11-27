export type ProjectVisibility = "candidate" | "draft" | "published";

export type ProjectStatus = "in-progress" | "pre-release" | "completed";

export type ProjectMilestone = {
  title: string;
  status: "completed" | "pending";
  statusLabel?: string;
  detail: string;
};

export type CaseStudy = {
  sourceNote?: string;
  engineeringShowcase?: {
    subtitle: string;
    summary: string;
    role: string;
    lifecycle: string;
    repository: string;
    closingSummary: string;
  };
  catalogShowcase?: {
    subtitle: string;
    summary: string;
    projectType: string;
    ownershipRole: string;
    architecture: string;
    steps: readonly { title: string; description: string }[];
  };
  architectureFlow?: readonly string[];
  results?: readonly string[];
  remainingWork?: readonly string[];
  businessProblem: string;
  responsibilities: readonly string[];
  architecture: readonly string[];
  decisions: readonly {
    title: string;
    detail: string;
  }[];
  failureAndTesting: readonly string[];
};

export type CaseStudyArticle = {
  subtitle: string;
  projectType: string;
  statusLabel: string;
  stack: readonly string[];
  sourceNote: string;
  sections: readonly {
    id: string;
    title: string;
    blocks: readonly {
      title?: string;
      paragraphs?: readonly string[];
      points?: readonly string[];
    }[];
  }[];
};

type ProjectBase = {
  slug: string;
  title: string;
  thumbnail?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links?: readonly {
    label: string;
    href: string;
  }[];
};

export type PublishedProject = ProjectBase & {
  visibility: "published";
  role: string;
  summary: string;
  progress?: string;
  closureNote?: string;
  milestones?: readonly ProjectMilestone[];
  stack: readonly string[];
  status: ProjectStatus;
  caseStudy?: CaseStudy | CaseStudyArticle;
};

export type UnpublishedProject = ProjectBase & {
  visibility: Exclude<ProjectVisibility, "published">;
  role?: string;
  summary?: string;
  progress?: string;
  stack?: readonly string[];
  status?: ProjectStatus;
};

export type Project = PublishedProject | UnpublishedProject;
