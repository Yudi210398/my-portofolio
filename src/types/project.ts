export type ProjectVisibility = "candidate" | "draft" | "published";

export type ProjectStatus = "in-progress" | "completed";

export type ProjectMilestone = {
  title: string;
  status: "completed" | "pending";
  detail: string;
};

export type CaseStudy = {
  businessProblem: string;
  responsibilities: readonly string[];
  architecture: readonly string[];
  decisions: readonly {
    title: string;
    detail: string;
  }[];
  failureAndTesting: readonly string[];
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
  milestones?: readonly ProjectMilestone[];
  stack: readonly string[];
  status: ProjectStatus;
  caseStudy?: CaseStudy;
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
