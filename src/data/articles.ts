/**
 * Article registry for /articles.
 *
 * Add entries only when original content is ready to publish.
 * Topics are grounded in delivered StudioJadu / Scenarix work
 * (contributed as jeet-scenarix-ai) and framed for public technical writing.
 */

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  datePublished: string;
  dateModified?: string;
  category: string;
  draft?: boolean;
};

export type ArticleTopicIdea = {
  title: string;
  why: string;
  repos: readonly string[];
  /** Colorful flat infographic icon under /articles/icons */
  icon: string;
};

export const articles: ArticleMeta[] = [];

/**
 * Research agenda ordered by depth of shipped systems work.
 * Titles and abstracts follow research paper register.
 */
export const articleTopicIdeas: readonly ArticleTopicIdea[] = [
  {
    icon: "/articles/icons/layers.svg",
    title:
      "Conflict safe persistence for interactive AI storyboard editors under concurrent scene mutation",
    why: "We formalize confirmation, draft, and recovery invariants for AIDA 2.0 scene and shot state such that dialogue binding and contentful edits remain consistent across client and service boundaries without silent loss.",
    repos: ["studio-frontend", "studio-backend"],
  },
  {
    icon: "/articles/icons/fingerprint.svg",
    title:
      "Causal invalidation of image to video identity conditioning under mutable character biographies",
    why: "We study how biographical edits must recompute sheet analysis and refresh I2V conditioning, including variant clone synchronization that prevents cleared attributes from persisting in derived character state.",
    repos: ["studio-backend"],
  },
  {
    icon: "/articles/icons/sparkles.svg",
    title:
      "Partial failure semantics for sketch to shot generation with deferred analysis completeness",
    why: "We present retry, crop persistence, and keyframe surfacing strategies that keep generation operable when plan or analysis stages are incomplete, replacing hard pre generation barriers with deferred correctness checks.",
    repos: ["studio-frontend", "studio-backend"],
  },
  {
    icon: "/articles/icons/clapperboard.svg",
    title:
      "Timeline faithful MP4 synthesis via ordered track composition and audio stream introspection",
    why: "We describe a deterministic FFmpeg based compositing model for JaduCut that places clips by start offset, preserves track z order, and probes audio streams so rendered output matches the editor timeline specification.",
    repos: ["python-backend"],
  },
  {
    icon: "/articles/icons/shield.svg",
    title:
      "Client side durability mechanisms for multi hour generative workbench sessions",
    why: "We characterize failure modes induced by browser idle suspension and transient network loss, then evaluate recovery protocols that restore workbench continuity without discarding in flight creative state.",
    repos: ["studio-frontend"],
  },
  {
    icon: "/articles/icons/radio.svg",
    title:
      "Bounded history messaging over Centrifugo for low latency collaborative media tools",
    why: "We design a dual transport SDK covering WebSocket and HTTP paths with explicit history cardinality tradeoffs that balance realtime fanout against replay cost in studio collaboration surfaces.",
    repos: ["jaduspine"],
  },
  {
    icon: "/articles/icons/key.svg",
    title:
      "Principal preserving impersonation under role based access control for production admin tooling",
    why: "We specify token and storage semantics that retain the original authenticated principal during elevated impersonation so authorization decisions remain attributable and elevated context cannot leak after session teardown.",
    repos: ["jadu-auth"],
  },
  {
    icon: "/articles/icons/gauge.svg",
    title:
      "Quota constrained generation: credit request, allocation, and enforcement in AI media platforms",
    why: "We model project level credit as a hard product constraint and implement request, admin allocation, and client gating paths that enforce capacity before expensive generative workloads execute.",
    repos: ["studio-frontend", "studio-backend"],
  },
  {
    icon: "/articles/icons/audio.svg",
    title:
      "Speakability constraints for dialogue text to speech with intentional non lexical cues",
    why: "We define validation rules for ElevenLabs and custom voice pipelines that reject empty or non speakable dialogue while admitting punctuation only utterances such as ellipses as deliberate silence markers.",
    repos: ["studio-backend"],
  },
  {
    icon: "/articles/icons/activity.svg",
    title:
      "High signal observability for long running generative media pipelines",
    why: "We integrate structured application logs with Sentry issue creation and PostHog telemetry so asynchronous AI jobs remain diagnosable under production load without saturating operators with low value noise.",
    repos: ["studio-frontend", "studio-backend"],
  },
] as const;

export function publishedArticles() {
  return articles.filter((article) => !article.draft);
}
