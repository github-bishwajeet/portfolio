"use client";

import { useId } from "react";
import { useReducedMotion } from "motion/react";

type IconKind =
  | "vue"
  | "react"
  | "next"
  | "pwa"
  | "tailwind"
  | "flutter"
  | "api"
  | "ts"
  | "js"
  | "laravel"
  | "node"
  | "spring"
  | "php"
  | "java"
  | "redis"
  | "filecache"
  | "dbcache"
  | "queue"
  | "webhook"
  | "microservice"
  | "event"
  | "distributed"
  | "mysql"
  | "mongodb"
  | "sql"
  | "aws"
  | "gcp"
  | "azure";

type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  icon: IconKind;
};

type DiagramEdge = {
  id: string;
  d: string;
  /** Brand color for flow dots on this edge (source node icon). */
  color: string;
  delay?: number;
  duration?: number;
};

const iconColor: Record<IconKind, string> = {
  vue: "#41B883",
  react: "#61DAFB",
  next: "#111111",
  pwa: "#5A0FC8",
  tailwind: "#38BDF8",
  flutter: "#0175C2",
  api: "#0071e3",
  ts: "#3178C6",
  js: "#E6C200",
  laravel: "#FF2D20",
  node: "#68A063",
  spring: "#6DB33F",
  php: "#777BB4",
  java: "#EA2D2E",
  redis: "#D82C20",
  filecache: "#8E8E93",
  dbcache: "#FF6B35",
  queue: "#F5A623",
  webhook: "#FF9500",
  microservice: "#007AFF",
  event: "#AF52DE",
  distributed: "#0071e3",
  mysql: "#00758F",
  mongodb: "#00ED64",
  sql: "#336791",
  aws: "#FF9900",
  gcp: "#4285F4",
  azure: "#0078D4",
};

const VB = { w: 1200, h: 1020 };

const nodes: DiagramNode[] = [
  // Clients
  { id: "vue", label: "Vue.js", x: 56, y: 56, icon: "vue" },
  { id: "react", label: "React", x: 220, y: 56, icon: "react" },
  { id: "next", label: "Next.js", x: 384, y: 56, icon: "next" },
  { id: "tailwind", label: "Tailwind", x: 96, y: 210, icon: "tailwind" },
  { id: "pwa", label: "PWA", x: 260, y: 210, icon: "pwa" },
  { id: "flutter", label: "Flutter", x: 424, y: 210, icon: "flutter" },
  // Edge
  { id: "api", label: "REST APIs", x: 620, y: 140, w: 130, icon: "api" },
  { id: "ts", label: "TypeScript", x: 780, y: 56, icon: "ts" },
  { id: "js", label: "JavaScript", x: 960, y: 56, icon: "js" },
  // Services
  { id: "laravel", label: "Laravel", x: 460, y: 380, icon: "laravel" },
  { id: "node", label: "Node.js", x: 640, y: 380, icon: "node" },
  { id: "spring", label: "Spring Boot", x: 820, y: 380, w: 130, icon: "spring" },
  { id: "php", label: "PHP", x: 460, y: 540, icon: "php" },
  { id: "java", label: "Java", x: 820, y: 540, icon: "java" },
  // Fabric
  { id: "redis", label: "Redis", x: 40, y: 400, icon: "redis" },
  { id: "filecache", label: "File cache", x: 200, y: 400, w: 118, icon: "filecache" },
  { id: "dbcache", label: "DB cache", x: 200, y: 540, w: 118, icon: "dbcache" },
  { id: "queue", label: "Job queues", x: 40, y: 560, w: 130, icon: "queue" },
  { id: "webhook", label: "Webhooks", x: 120, y: 700, icon: "webhook" },
  { id: "micro", label: "Microservices", x: 1020, y: 380, w: 140, icon: "microservice" },
  { id: "event", label: "Event driven", x: 1020, y: 540, w: 140, icon: "event" },
  { id: "dist", label: "Distributed", x: 1020, y: 700, w: 140, icon: "distributed" },
  // Store
  { id: "mysql", label: "MySQL", x: 400, y: 740, icon: "mysql" },
  { id: "sql", label: "SQL", x: 530, y: 740, icon: "sql" },
  { id: "mongodb", label: "MongoDB", x: 660, y: 740, icon: "mongodb" },
  { id: "aws", label: "AWS", x: 800, y: 740, icon: "aws" },
  { id: "gcp", label: "GCP", x: 500, y: 860, icon: "gcp" },
  { id: "azure", label: "Azure", x: 680, y: 860, icon: "azure" },
];

/** Edge anchors use node center-ish contact points with room between stages. */
const edges: DiagramEdge[] = [
  { id: "e1", d: "M110 152 C110 220 600 120 620 160", color: iconColor.vue, delay: 0 },
  { id: "e2", d: "M274 152 C320 210 640 120 685 160", color: iconColor.react, delay: 0.3 },
  { id: "e3", d: "M438 152 C500 200 660 130 685 160", color: iconColor.next, delay: 0.6 },
  { id: "e4", d: "M150 306 C280 330 580 220 685 210", color: iconColor.tailwind, delay: 0.2 },
  { id: "e5", d: "M314 306 C420 330 620 230 685 210", color: iconColor.pwa, delay: 0.5 },
  { id: "e5b", d: "M478 306 C540 320 640 240 685 210", color: iconColor.flutter, delay: 0.35 },
  { id: "e6", d: "M750 180 C780 160 820 110 834 104", color: iconColor.ts, delay: 0.1 },
  { id: "e7", d: "M750 190 C820 180 920 120 960 104", color: iconColor.js, delay: 0.4 },
  { id: "e8", d: "M685 236 C685 300 514 340 514 380", color: iconColor.laravel, delay: 0.15, duration: 1.8 },
  { id: "e9", d: "M685 236 C690 300 694 340 694 380", color: iconColor.node, delay: 0.45, duration: 1.8 },
  { id: "e10", d: "M710 236 C780 300 885 340 885 380", color: iconColor.spring, delay: 0.75, duration: 1.8 },
  { id: "e11", d: "M148 448 C280 420 420 410 460 428", color: iconColor.redis, delay: 0.2 },
  { id: "e11b", d: "M259 448 C340 420 420 400 514 428", color: iconColor.filecache, delay: 0.35 },
  { id: "e11c", d: "M259 588 C340 560 420 540 514 568", color: iconColor.dbcache, delay: 0.5 },
  { id: "e12", d: "M148 608 C280 600 400 560 514 540", color: iconColor.queue, delay: 0.55 },
  { id: "e13", d: "M174 748 C300 720 400 600 460 568", color: iconColor.webhook, delay: 0.4 },
  { id: "e14", d: "M514 476 C514 500 514 520 514 540", color: iconColor.php, delay: 0.1, duration: 1.4 },
  { id: "e15", d: "M874 476 C874 500 874 520 874 540", color: iconColor.java, delay: 0.3, duration: 1.4 },
  { id: "e16", d: "M1020 428 C960 428 920 428 885 428", color: iconColor.microservice, delay: 0.25 },
  { id: "e17", d: "M1020 588 C960 580 920 560 874 568", color: iconColor.event, delay: 0.55 },
  { id: "e18", d: "M514 636 C500 680 470 710 454 740", color: iconColor.mysql, delay: 0.2, duration: 2 },
  { id: "e19", d: "M694 476 C680 560 600 680 584 740", color: iconColor.sql, delay: 0.5, duration: 2.2 },
  { id: "e19b", d: "M694 476 C720 560 740 680 714 740", color: iconColor.mongodb, delay: 0.65, duration: 2 },
  { id: "e20", d: "M874 636 C860 680 840 710 854 740", color: iconColor.aws, delay: 0.8, duration: 2 },
  { id: "e21", d: "M1020 748 C940 780 880 800 854 808", color: iconColor.distributed, delay: 0.4 },
  { id: "e22", d: "M174 796 C300 820 380 800 454 788", color: iconColor.queue, delay: 0.65 },
  { id: "e23", d: "M454 836 C480 850 520 860 554 860", color: iconColor.gcp, delay: 0.3, duration: 1.6 },
  { id: "e24", d: "M854 836 C800 850 740 860 734 860", color: iconColor.azure, delay: 0.55, duration: 1.6 },
  { id: "e25", d: "M584 836 C560 850 540 860 554 860", color: iconColor.sql, delay: 0.4, duration: 1.5 },
  { id: "e26", d: "M714 836 C710 850 700 860 734 860", color: iconColor.mongodb, delay: 0.45, duration: 1.5 },
];

function NodeIcon({ kind }: { kind: IconKind }) {
  switch (kind) {
    case "vue":
      return (
        <g>
          <path d="M8 52 L32 8 L56 52 Z" fill="#41B883" />
          <path d="M20 52 L32 28 L44 52 Z" fill="#35495E" />
        </g>
      );
    case "react":
      return (
        <g>
          <circle cx="32" cy="32" r="7" fill="#61DAFB" />
          <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(0 32 32)" />
          <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 32 32)" />
        </g>
      );
    case "next":
      return (
        <g>
          <rect x="8" y="10" width="48" height="44" rx="8" fill="#111" />
          <text x="32" y="38" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="system-ui">
            N
          </text>
        </g>
      );
    case "pwa":
      return (
        <g>
          <rect x="12" y="8" width="40" height="48" rx="6" fill="#5A0FC8" />
          <rect x="18" y="14" width="28" height="30" rx="2" fill="#fff" />
          <circle cx="32" cy="50" r="2.5" fill="#fff" />
        </g>
      );
    case "tailwind":
      return (
        <g>
          <path
            d="M16 34c4-10 8-14 16-14 6 0 9 3 12 6 2 2 4 4 8 4 5 0 8-3 8-3-4 10-8 14-16 14-6 0-9-3-12-6-2-2-4-4-8-4-5 0-8 3-8 3z"
            fill="#38BDF8"
          />
          <path
            d="M12 42c3-7 6-10 12-10 4 0 7 2 9 4 2 2 3 3 6 3 4 0 6-2 6-2-3 7-6 10-12 10-4 0-7-2-9-4-2-2-3-3-6-3-4 0-6 2-6 2z"
            fill="#0EA5E9"
            opacity="0.85"
          />
        </g>
      );
    case "flutter":
      return (
        <g>
          <path d="M14 36 L36 14 H50 L28 36 Z" fill="#54C5F8" />
          <path d="M28 36 L40 48 L28 60 L16 48 Z" fill="#01579B" />
          <path d="M28 36 L50 58 H36 L22 44 Z" fill="#0175C2" />
          <path d="M28 36 L40 48 L50 38 L38 26 Z" fill="#54C5F8" opacity="0.9" />
        </g>
      );
    case "api":
      return (
        <g>
          <rect x="10" y="14" width="44" height="36" rx="6" fill="#0071e3" />
          <path d="M22 26h20M22 32h14M22 38h17" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "ts":
      return (
        <g>
          <rect x="8" y="10" width="48" height="44" rx="6" fill="#3178C6" />
          <text x="32" y="39" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="system-ui">
            TS
          </text>
        </g>
      );
    case "js":
      return (
        <g>
          <rect x="8" y="10" width="48" height="44" rx="6" fill="#F7DF1E" />
          <text x="34" y="42" textAnchor="middle" fill="#111" fontSize="18" fontWeight="800" fontFamily="system-ui">
            JS
          </text>
        </g>
      );
    case "laravel":
      return (
        <g>
          <rect x="14" y="8" width="36" height="48" rx="4" fill="#FF2D20" />
          <rect x="20" y="14" width="24" height="5" rx="1" fill="#fff" opacity="0.9" />
          <rect x="20" y="24" width="24" height="5" rx="1" fill="#fff" opacity="0.7" />
          <rect x="20" y="34" width="24" height="5" rx="1" fill="#fff" opacity="0.55" />
          <rect x="20" y="44" width="12" height="5" rx="1" fill="#fff" opacity="0.4" />
        </g>
      );
    case "node":
      return (
        <g>
          <path d="M32 6 L54 18 V46 L32 58 L10 46 V18 Z" fill="#68A063" />
          <text x="32" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="system-ui">
            JS
          </text>
        </g>
      );
    case "spring":
      return (
        <g>
          <circle cx="32" cy="32" r="24" fill="#6DB33F" />
          <path
            d="M22 38c8 8 22 6 26-6 2-6-2-12-8-12-4 0-6 2-8 4-3 4-6 6-10 6-4 0-4-4-2-6 4-4 12-4 16 0"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case "php":
      return (
        <g>
          <ellipse cx="32" cy="32" rx="26" ry="16" fill="#777BB4" />
          <text x="32" y="37" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="system-ui">
            PHP
          </text>
        </g>
      );
    case "java":
      return (
        <g>
          <path d="M28 40c0 8 8 12 16 8" fill="none" stroke="#EA2D2E" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 34c6-2 14-2 20 0" fill="none" stroke="#5382A1" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 28c8-2 16-2 24 0" fill="none" stroke="#5382A1" strokeWidth="3" strokeLinecap="round" />
          <path d="M34 12c0 8-6 12-2 18" fill="none" stroke="#5382A1" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="32" cy="50" rx="16" ry="5" fill="#E76F00" />
        </g>
      );
    case "redis":
      return (
        <g>
          <ellipse cx="32" cy="18" rx="20" ry="8" fill="#A41E11" />
          <rect x="12" y="18" width="40" height="12" fill="#D82C20" />
          <ellipse cx="32" cy="30" rx="20" ry="8" fill="#A41E11" />
          <rect x="12" y="30" width="40" height="12" fill="#D82C20" />
          <ellipse cx="32" cy="42" rx="20" ry="8" fill="#A41E11" />
          <rect x="12" y="42" width="40" height="8" fill="#D82C20" />
          <ellipse cx="32" cy="50" rx="20" ry="8" fill="#A41E11" />
        </g>
      );
    case "filecache":
      return (
        <g>
          <path d="M16 14h22l12 12v28a4 4 0 01-4 4H16a4 4 0 01-4-4V18a4 4 0 014-4z" fill="#8E8E93" />
          <path d="M38 14v10h12" fill="#AEAEB2" />
          <rect x="20" y="34" width="24" height="4" rx="1" fill="#fff" opacity="0.85" />
          <rect x="20" y="42" width="16" height="4" rx="1" fill="#fff" opacity="0.65" />
        </g>
      );
    case "dbcache":
      return (
        <g>
          <ellipse cx="32" cy="16" rx="18" ry="7" fill="#FF6B35" />
          <rect x="14" y="16" width="36" height="22" fill="#FF8F66" />
          <ellipse cx="32" cy="38" rx="18" ry="7" fill="#FF6B35" />
          <path d="M22 28h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <circle cx="46" cy="46" r="10" fill="#1d1d1f" />
          <path d="M46 41v6l4 2" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "queue":
      return (
        <g>
          <rect x="10" y="14" width="28" height="20" rx="3" fill="#F5A623" transform="rotate(-12 24 24)" />
          <rect x="20" y="22" width="28" height="20" rx="3" fill="#F7C948" />
          <rect x="26" y="30" width="28" height="20" rx="3" fill="#FFD666" />
          <path d="M34 38h12M34 44h8" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "webhook":
      return (
        <g>
          <circle cx="32" cy="22" r="10" fill="#FF9500" />
          <path d="M32 32v10" stroke="#FF9500" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 48h20" stroke="#FF9500" strokeWidth="4" strokeLinecap="round" />
          <circle cx="22" cy="48" r="5" fill="#FF3B30" />
          <circle cx="42" cy="48" r="5" fill="#34C759" />
        </g>
      );
    case "microservice":
      return (
        <g>
          <rect x="8" y="12" width="20" height="16" rx="3" fill="#5856D6" />
          <rect x="36" y="12" width="20" height="16" rx="3" fill="#007AFF" />
          <rect x="8" y="36" width="20" height="16" rx="3" fill="#34C759" />
          <rect x="36" y="36" width="20" height="16" rx="3" fill="#FF2D55" />
          <path d="M28 20h8M18 28v8M46 28v8M28 44h8" stroke="#1d1d1f" strokeWidth="2" opacity="0.35" />
        </g>
      );
    case "event":
      return (
        <g>
          <path d="M18 18h20l8 14-8 14H18l-8-14z" fill="#AF52DE" />
          <path d="M28 24l8 8-8 8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "distributed":
      return (
        <g>
          <circle cx="18" cy="20" r="7" fill="#0071e3" />
          <circle cx="46" cy="20" r="7" fill="#2997ff" />
          <circle cx="18" cy="44" r="7" fill="#5AC8FA" />
          <circle cx="46" cy="44" r="7" fill="#0071e3" />
          <path d="M25 20h14M18 27v10M46 27v10M25 44h14" stroke="#1d1d1f" strokeWidth="2.5" opacity="0.35" />
        </g>
      );
    case "mysql":
      return (
        <g>
          <ellipse cx="32" cy="16" rx="20" ry="8" fill="#00758F" />
          <rect x="12" y="16" width="40" height="28" fill="#F29111" />
          <ellipse cx="32" cy="44" rx="20" ry="8" fill="#00758F" />
          <ellipse cx="32" cy="28" rx="20" ry="8" fill="#00758F" opacity="0.35" />
          <text x="32" y="36" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" fontFamily="system-ui">
            SQL
          </text>
        </g>
      );
    case "mongodb":
      return (
        <g>
          <path
            d="M32 8c2 10 10 16 10 28 0 10-4 18-10 22-6-4-10-12-10-22 0-12 8-18 10-28z"
            fill="#00ED64"
          />
          <path
            d="M32 12c1 8 6 14 6 24 0 8-2 14-6 18"
            fill="none"
            stroke="#001E2B"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
          <ellipse cx="32" cy="54" rx="7" ry="3" fill="#001E2B" opacity="0.35" />
        </g>
      );
    case "sql":
      return (
        <g>
          <ellipse cx="32" cy="14" rx="18" ry="7" fill="#336791" />
          <rect x="14" y="14" width="36" height="30" fill="#4A90A4" />
          <ellipse cx="32" cy="44" rx="18" ry="7" fill="#336791" />
          <path d="M20 24h24M20 32h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        </g>
      );
    case "aws":
      return (
        <g>
          <path d="M12 40 L32 12 L52 40 Z" fill="#FF9900" />
          <path d="M20 40c4-8 8-12 12-12s8 4 12 12" fill="none" stroke="#232F3E" strokeWidth="3" strokeLinecap="round" />
          <text x="32" y="52" textAnchor="middle" fill="#232F3E" fontSize="10" fontWeight="800" fontFamily="system-ui">
            AWS
          </text>
        </g>
      );
    case "gcp":
      return (
        <g>
          <circle cx="32" cy="32" r="22" fill="#fff" stroke="#E8EAED" strokeWidth="2" />
          <path d="M32 14l6 10H26z" fill="#EA4335" />
          <path d="M44 38l-6 10H26l6-10z" fill="#FBBC04" />
          <path d="M20 38l6-10 6 10z" fill="#34A853" />
          <circle cx="32" cy="32" r="6" fill="#4285F4" />
        </g>
      );
    case "azure":
      return (
        <g>
          <path d="M14 48 L28 16 L40 40 L50 48 Z" fill="#0078D4" />
          <path d="M28 16 L42 16 L50 48 L40 40 Z" fill="#50E6FF" opacity="0.9" />
        </g>
      );
    default:
      return <circle cx="32" cy="32" r="18" fill="#86868b" />;
  }
}

function DiagramNodeView({ node }: { node: DiagramNode }) {
  const w = node.w ?? 108;
  const h = 96;
  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <rect
        width={w}
        height={h}
        rx="14"
        fill="#ffffff"
        stroke="#d2d2d7"
        strokeWidth="1.25"
        filter="url(#nodeShadow)"
      />
      <g transform={`translate(${(w - 64) / 2}, 6) scale(0.9)`}>
        <NodeIcon kind={node.icon} />
      </g>
      <text
        x={w / 2}
        y={82}
        textAnchor="middle"
        fill="#1d1d1f"
        fontSize="12"
        fontWeight="600"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {node.label}
      </text>
    </g>
  );
}

function FlowDot({
  pathId,
  delay,
  duration,
  color,
  r = 4.5,
}: {
  pathId: string;
  delay: number;
  duration: number;
  color: string;
  r?: number;
}) {
  return (
    <circle r={r} fill={color} opacity="0.95">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

function GroupBox({
  x,
  y,
  w,
  h,
  title,
  tint,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  tint: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="18"
        fill={tint}
        stroke="#d2d2d7"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <text
        x={x + 16}
        y={y + 22}
        fill="#6e6e73"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {title}
      </text>
    </g>
  );
}

export function TechPipeline() {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6 text-center">
        <p className="text-[14px] font-medium tracking-[0.08em] text-[#6e6e73] uppercase">
          Jeet&apos;s stack
        </p>
        <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#86868b]">
          The production path Jeet ships on: clients into services, async
          fabric, and persistence.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-[#e8e8ed] bg-[#fbfbfd] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="h-auto min-w-[920px] w-full"
          role="img"
          aria-label="Technology architecture pipeline diagram"
        >
          <defs>
            <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1d1d1f" floodOpacity="0.08" />
            </filter>
          </defs>

          <GroupBox x={28} y={28} w={560} h={300} title="CLIENT APPS" tint="#EEF6FF" />
          <GroupBox x={20} y={360} w={360} h={460} title="ASYNC FABRIC" tint="#FFF5EB" />
          <GroupBox x={420} y={340} w={560} h={320} title="APP SERVICES" tint="#F3FBF1" />
          <GroupBox x={990} y={340} w={180} h={480} title="DISTRIBUTED" tint="#EEF8F4" />
          <GroupBox x={380} y={690} w={580} h={300} title="PERSISTENCE" tint="#F0F7FA" />

          {edges.map((edge) => (
            <path
              key={edge.id}
              id={`${uid}-${edge.id}`}
              d={edge.d}
              fill="none"
              stroke="#1d1d1f"
              strokeWidth="1.4"
              strokeOpacity="0.55"
            />
          ))}

          {!reduced &&
            edges.map((edge) => {
              const duration = edge.duration ?? 2.2;
              const delay = edge.delay ?? 0;
              return (
                <g key={`dots-${edge.id}`}>
                  <FlowDot
                    pathId={`${uid}-${edge.id}`}
                    delay={delay}
                    duration={duration}
                    color={edge.color}
                  />
                  <FlowDot
                    pathId={`${uid}-${edge.id}`}
                    delay={delay + duration / 2}
                    duration={duration}
                    color={edge.color}
                    r={3.25}
                  />
                </g>
              );
            })}

          {nodes.map((node) => (
            <DiagramNodeView key={node.id} node={node} />
          ))}
        </svg>
      </div>
    </div>
  );
}
