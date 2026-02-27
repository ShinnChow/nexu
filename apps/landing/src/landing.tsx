import { useState } from 'react';
import {
  ArrowRight,
  Terminal,
  Zap,
  Clock,
  Code2,
  Rocket,
  MessageSquare,
  ChevronDown,
  Blocks,
  Brain,
  FileText,
  BarChart3,
  PenTool,
  Workflow,
  Search,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center py-4 w-full text-left cursor-pointer"
      >
        <span className="text-sm font-medium text-text-primary">{q}</span>
        <ChevronDown
          size={16}
          className={`text-text-tertiary shrink-0 ml-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-text-secondary">{a}</div>
      )}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  badge,
}: {
  icon: typeof Terminal;
  title: string;
  desc: string;
  badge?: string;
}) {
  return (
    <div className="p-6 rounded-xl border transition-colors bg-surface-1 border-border hover:border-border-hover group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-accent/10">
          <Icon size={20} className="text-accent" />
        </div>
        {badge && (
          <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <div className="text-[14px] font-semibold text-text-primary mb-2">
        {title}
      </div>
      <div className="text-[13px] text-text-muted leading-relaxed">{desc}</div>
    </div>
  );
}

/* ---------- Demo: Slack-style IM ---------- */

interface SlackMessage {
  role: 'user' | 'bot';
  content: string;
  time: string;
  attachments?: { name: string; icon: typeof FileText; color: string }[] | null;
  result?: {
    borderColor: string;
    title: string;
    items: string[];
    link?: string;
  };
}

interface DemoScenario {
  key: string;
  label: string;
  icon: typeof Code2;
  channel: string;
  messages: SlackMessage[];
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    key: 'coding',
    label: 'Build & Deploy',
    icon: Code2,
    channel: '#product-dev',
    messages: [
      {
        role: 'user',
        content: 'Build me a flashcard game for kids learning English — cute style, with pronunciation',
        time: '2:30 PM',
        attachments: null,
      },
      {
        role: 'bot',
        content: 'On it! Creating the English flashcard game now 🎴',
        time: '2:31 PM',
        result: {
          borderColor: 'border-l-[#2eb67d]',
          title: '✅ Code complete',
          items: [
            'React flip-card game · 48 word cards · audio pronunciation',
            'Difficulty levels (easy/medium/hard) · scoring & progress tracking',
          ],
        },
      },
      {
        role: 'user',
        content: "Awesome! Deploy it — I want to share the link with my friend's kids",
        time: '2:35 PM',
        attachments: null,
      },
      {
        role: 'bot',
        content: "Deployed! Share the link and they can start playing right away 🚀",
        time: '2:35 PM',
        result: {
          borderColor: 'border-l-[#1264a3]',
          title: '🌐 Live · english-cards.nexu.dev',
          items: ['Works on mobile & desktop · no install needed · offline support'],
          link: 'Open game →',
        },
      },
    ],
  },
  {
    key: 'analysis',
    label: 'Data Analysis',
    icon: BarChart3,
    channel: '#data-insights',
    messages: [
      {
        role: 'user',
        content: 'Analyze this sales data and find the fastest-growing categories',
        time: '10:15 AM',
        attachments: [
          { name: 'sales-2026-Q1.csv', icon: FileText, color: 'text-green-400' },
        ],
      },
      {
        role: 'bot',
        content: 'Analyzing 12,847 sales records...',
        time: '10:15 AM',
        result: {
          borderColor: 'border-l-[#2eb67d]',
          title: '📊 Analysis complete',
          items: [
            'Top 3 categories: Smart Home (+142%), Pet Supplies (+98%), Health Food (+76%)',
            'Generated visual report · trend charts + category comparison + forecasts',
          ],
          link: 'View full report →',
        },
      },
      {
        role: 'user',
        content: 'Now do a competitor pricing analysis for the Smart Home category',
        time: '10:20 AM',
        attachments: null,
      },
      {
        role: 'bot',
        content: 'Scraped competitor data from public sources.',
        time: '10:21 AM',
        result: {
          borderColor: 'border-l-[#1264a3]',
          title: '📋 Competitor Pricing Report',
          items: ['Covers 8 competitors · 42 SKUs · price trends & recommended pricing range'],
          link: 'View report →',
        },
      },
    ],
  },
  {
    key: 'content',
    label: 'Content Creation',
    icon: PenTool,
    channel: '#marketing',
    messages: [
      {
        role: 'user',
        content: "Write a product update blog post based on this week's changelog",
        time: '4:00 PM',
        attachments: [
          { name: 'changelog-v0.4.md', icon: FileText, color: 'text-purple-400' },
        ],
      },
      {
        role: 'bot',
        content: 'Generating blog post from changelog...',
        time: '4:01 PM',
        result: {
          borderColor: 'border-l-[#2eb67d]',
          title: '✍️ Blog post ready',
          items: [
            'Title: "Nexu v0.4 — Your Lobster Just Got Smarter" · 1,200 words',
            'Generated cover image + SEO summary + Twitter Thread version',
          ],
          link: 'Preview blog →',
        },
      },
      {
        role: 'user',
        content: 'Also generate an investor weekly update email',
        time: '4:10 PM',
        attachments: null,
      },
      {
        role: 'bot',
        content: 'Combined blog content with this week\'s metrics.',
        time: '4:11 PM',
        result: {
          borderColor: 'border-l-[#1264a3]',
          title: '📧 Investor Update ready',
          items: ['Key metrics, product progress, next week\'s plan · formatted as email'],
          link: 'Preview email →',
        },
      },
    ],
  },
];

const SLACK_CHANNELS = ['all-refly-team', 'product-dev', 'data-insights', 'marketing', 'random'];
const SLACK_DMS = [
  { name: 'Marc Chan', online: true },
  { name: 'Sarah', online: true },
  { name: 'Yixian', online: false },
  { name: 'Nexu 🦞', online: true },
];

function SlackMsgRow({ msg }: { msg: SlackMessage }) {
  const isBot = msg.role === 'bot';
  return (
    <div className="flex gap-2 px-5 py-1 hover:bg-[#f8f8f8] group">
      {isBot ? (
        <div className="flex justify-center items-center w-9 h-9 rounded-lg shrink-0 bg-[#f0ebff] text-base mt-0.5">
          🦞
        </div>
      ) : (
        <div className="flex justify-center items-center w-9 h-9 rounded-lg shrink-0 bg-[#e8f5e9] mt-0.5">
          <span className="text-[14px]">👤</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex gap-1.5 items-baseline">
          <span className="text-[14px] font-bold text-[#1d1c1d]">
            {isBot ? 'Nexu' : 'Eli'}
          </span>
          {isBot && (
            <span className="text-[10px] font-medium text-[#616061] bg-[#e8e8e8] px-1 py-px rounded">
              APP
            </span>
          )}
          <span className="text-[11px] text-[#616061]">{msg.time}</span>
        </div>
        <div className="text-[14px] text-[#1d1c1d] leading-[1.6] mt-px">
          {isBot && <span className="text-[#1264a3] bg-[#e8f0fe] px-0.5 rounded">@Eli</span>}{' '}
          {msg.content}
        </div>
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="flex gap-2 mt-1.5">
            {msg.attachments.map((att) => (
              <div
                key={att.name}
                className="flex gap-1.5 items-center px-2.5 py-1.5 rounded border border-[#ddd] bg-white text-[12px] text-[#616061]"
              >
                <att.icon size={13} className={att.color} />
                {att.name}
              </div>
            ))}
          </div>
        )}
        {msg.result && (
          <div className={`mt-2 border-l-[3px] ${msg.result.borderColor} rounded-r bg-[#f8f8f8] border border-[#e0e0e0] border-l-0`}>
            <div className="px-3 py-2">
              <div className="text-[13px] font-bold text-[#1d1c1d] mb-0.5">
                {msg.result.title}
              </div>
              {msg.result.items.map((item, j) => (
                <div key={j} className="text-[13px] text-[#616061] leading-relaxed">
                  {item}
                </div>
              ))}
              {msg.result.link && (
                <a href="#" className="inline-block mt-1 text-[13px] text-[#1264a3] hover:underline">
                  {msg.result.link}
                </a>
              )}
            </div>
          </div>
        )}
        {isBot && (
          <div className="flex gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[#d0d0d0] bg-white text-[11px] cursor-default">
              ✅ <span className="text-[#1264a3] font-medium">1</span>
            </span>
            {msg.result && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[#d0d0d0] bg-white text-[11px] cursor-default">
                🚀 <span className="text-[#1264a3] font-medium">2</span>
              </span>
            )}
          </div>
        )}
        {msg.result && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-5 h-5 rounded bg-[#f0ebff] flex items-center justify-center text-[10px]">🦞</div>
            <span className="text-[12px] text-[#1264a3] font-medium hover:underline cursor-pointer">
              {msg.result.link ? '2 replies' : '1 reply'}
            </span>
            <span className="text-[11px] text-[#616061]">Last reply today at {msg.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SlackDemo({ scenarioKey }: { scenarioKey: string }) {
  // DEMO_SCENARIOS is a non-empty const array, so index 0 always exists
  const scenario = DEMO_SCENARIOS.find((s) => s.key === scenarioKey) ?? DEMO_SCENARIOS[0]!;
  const activeChannel = scenario.channel.replace('#', '');

  return (
    <div className="overflow-hidden rounded-xl shadow-2xl border border-[#ccc]/30">
      <div className="flex gap-2 items-center px-4 py-2 bg-[#3f0e40]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[11px] text-white/60">
            <Search size={11} />
            Search Nexu Workspace
          </div>
        </div>
        <div className="w-6 h-6 rounded-lg bg-[#e8f5e9] flex items-center justify-center text-[10px]">
          👤
        </div>
      </div>

      <div className="flex" style={{ height: 480 }}>
        <div className="w-[44px] shrink-0 bg-[#3f0e40] flex flex-col items-center py-2 gap-3 border-r border-[#5c2d5e]">
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-[12px] text-white/80">
            🏠
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[12px] text-white/50">
            💬
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[12px] text-white/50">
            📁
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[12px] text-white/50">
            ⋯
          </div>
        </div>

        <div className="w-[150px] shrink-0 bg-[#3f0e40] py-2.5 px-1.5 border-r border-[#5c2d5e] overflow-hidden">
          <div className="flex items-center gap-1.5 px-2 mb-3">
            <span className="text-[13px] font-bold text-white/90">Nexu Team</span>
            <ChevronDown size={12} className="text-white/50" />
          </div>
          <div className="text-[11px] font-medium text-white/40 px-2 mb-1">Channels</div>
          <div className="space-y-px mb-2">
            {SLACK_CHANNELS.map((ch) => {
              const isActive = ch === activeChannel;
              return (
                <div
                  key={ch}
                  className={`px-2 py-[3px] rounded text-[12px] truncate ${
                    isActive
                      ? 'bg-[#1264a3] text-white font-medium'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  <span className="text-white/40 mr-0.5">#</span> {ch}
                </div>
              );
            })}
          </div>
          <div className="text-[11px] font-medium text-white/40 px-2 mb-1">Direct Messages</div>
          <div className="space-y-px">
            {SLACK_DMS.map((dm) => (
              <div key={dm.name} className="flex gap-1.5 items-center px-2 py-[3px] text-[12px] text-white/60 truncate">
                <div className={`w-2 h-2 rounded-full shrink-0 ${dm.online ? 'bg-[#2bac76]' : 'border border-white/30'}`} />
                <span className="truncate">{dm.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 bg-white">
          <div className="flex items-center px-5 py-2.5 border-b border-[#e0e0e0]">
            <span className="text-[15px] font-bold text-[#1d1c1d]">
              # {activeChannel}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2">
            {scenario.messages.map((msg, i) => (
              <SlackMsgRow key={i} msg={msg} />
            ))}
          </div>

          <div className="px-5 pb-3">
            <div className="rounded-lg border border-[#ccc] overflow-hidden">
              <div className="flex items-center gap-0.5 px-2 py-1 border-b border-[#e8e8e8] bg-[#fafafa]">
                {['B', 'I', 'U', 'S'].map((btn) => (
                  <div key={btn} className="w-6 h-6 rounded flex items-center justify-center text-[12px] font-bold text-[#999] hover:bg-[#eee] cursor-default">
                    {btn}
                  </div>
                ))}
                <div className="w-px h-4 bg-[#ddd] mx-1" />
                <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] text-[#999]">🔗</div>
                <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] text-[#999]">≡</div>
                <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] text-[#999]">{'{}'}</div>
              </div>
              <div className="px-3 py-2">
                <span className="text-[13px] text-[#aaa]">
                  Message #{activeChannel}
                </span>
              </div>
              <div className="flex items-center justify-between px-2 py-1 border-t border-[#e8e8e8]">
                <div className="flex items-center gap-0.5">
                  <div className="w-7 h-7 rounded flex items-center justify-center text-[13px] text-[#999] hover:bg-[#eee] cursor-default">➕</div>
                  <div className="w-7 h-7 rounded flex items-center justify-center text-[13px] text-[#999] hover:bg-[#eee] cursor-default">😊</div>
                  <div className="w-7 h-7 rounded flex items-center justify-center text-[13px] text-[#999] hover:bg-[#eee] cursor-default">@</div>
                  <div className="w-7 h-7 rounded flex items-center justify-center text-[13px] text-[#999] hover:bg-[#eee] cursor-default">📎</div>
                </div>
                <div className="w-7 h-7 rounded flex items-center justify-center bg-[#007a5a] text-white text-[12px] cursor-default">▶</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Landing                                                       */
/* ------------------------------------------------------------------ */

export function Landing() {
  const [activeDemo, setActiveDemo] = useState('coding');

  const goToAuth = () => { window.location.href = '/auth'; };

  return (
    <div className="min-h-full bg-surface-0 relative">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md border-border bg-surface-0/85">
        <div className="flex justify-between items-center px-6 mx-auto max-w-5xl h-14">
          <div className="flex items-center gap-2.5">
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-accent">
              <span className="text-xs font-bold text-accent-fg">N</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              Nexu
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-text-tertiary">
            <a href="#scenarios" className="transition-colors hover:text-text-primary">
              Scenarios
            </a>
            <a href="#features" className="transition-colors hover:text-text-primary">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-text-primary">
              How it works
            </a>
            <a href="#faq" className="transition-colors hover:text-text-primary">
              FAQ
            </a>
            <button
              onClick={goToAuth}
              className="px-4 py-1.5 bg-accent hover:bg-accent-hover text-accent-fg rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5"
            >
              Get started free <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--color-accent-rgb,99,102,241),0.06)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative px-6 pt-24 pb-20 mx-auto max-w-4xl text-center">
          <div className="inline-flex gap-2 items-center px-3 py-1 mb-8 text-xs font-medium rounded-full border border-accent/20 text-accent bg-accent/5">
            <Zap size={12} /> Nexu · Digital clone powered by OpenClaw
          </div>
          <h1 className="text-[42px] font-bold text-text-primary mb-6 leading-[1.15] tracking-tight">
            For your lobster 🦞
            <br />
            <span className="text-accent">A cyber office where humans and clones coexist</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-tertiary">
            Your lobster lives in Slack / Discord / Telegram / WhatsApp, etc. —
            <br />
            not just chatting, but delivering results. Build apps, analyze data, write content, run automations.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {[
              { icon: Code2, label: 'Build websites & tools' },
              { icon: BarChart3, label: 'Data analysis' },
              { icon: PenTool, label: 'Content writing' },
              { icon: Search, label: 'Research' },
              { icon: Workflow, label: 'Automation' },
            ].map((cap) => (
              <span
                key={cap.label}
                className="inline-flex gap-1.5 items-center px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors bg-surface-1 text-text-secondary border-border hover:border-border-hover"
              >
                <cap.icon size={14} />
                {cap.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3 justify-center items-center mx-auto mb-6 max-w-md">
            <button
              onClick={goToAuth}
              className="flex gap-2 items-center px-8 py-3 text-sm font-semibold rounded-lg transition-all bg-accent hover:bg-accent-hover text-accent-fg hover:shadow-lg hover:shadow-accent/20"
            >
              Get started free <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex items-center justify-center text-[13px] text-text-muted">
            <span>3-minute setup · Unlimited free Claude models</span>
          </div>
        </div>
      </section>

      {/* Demo section (tabbed) */}
      <section id="scenarios" className="px-6 py-16 mx-auto max-w-5xl">
        <div className="flex gap-2 justify-center mb-8">
          {DEMO_SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveDemo(s.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeDemo === s.key
                  ? 'bg-accent text-accent-fg'
                  : 'bg-surface-1 text-text-secondary border border-border hover:border-border-hover'
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-4xl">
          <SlackDemo scenarioKey={activeDemo} />
          <div className="text-center mt-4 text-[12px] text-text-muted">
            @Nexu in your favorite chat app — say what you need, get the result delivered
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <div className="text-[11px] font-semibold text-accent mb-3 tracking-widest uppercase">
            Capabilities
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            You share the idea. 🦞 delivers the result.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-tertiary">
            No tools to learn. No prompts to craft. Open your IM, say what you need, and your lobster builds it.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-10">
          <FeatureCard
            icon={Code2}
            title="Build websites & tools"
            desc={'"Build me a flashcard game for learning English" — your lobster writes the code, deploys it, and gives you a link.'}
          />
          <FeatureCard
            icon={BarChart3}
            title="Analyze data & reports"
            desc="Drop in an Excel file and your lobster finds trends, builds charts, and delivers insights. Half a day of work, done in seconds."
          />
          <FeatureCard
            icon={PenTool}
            title="Write & publish content"
            desc="Product blogs, weekly updates, Twitter Threads, investor emails — give it your materials and get polished content back."
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <FeatureCard
            icon={MessageSquare}
            title="Lives in your chat app"
            desc="No new app to download. Your lobster lives directly in Slack / Discord / Telegram / WhatsApp. Just type and it starts working."
          />
          <FeatureCard
            icon={Workflow}
            title="Scheduled automation"
            desc={'"Every Friday, summarize our Slack and send a newsletter" — set it once, your lobster runs it every week.'}
          />
          <FeatureCard
            icon={Brain}
            title="Gets smarter over time"
            desc="Your lobster remembers your preferences and context — no need to repeat yourself. The more you use it, the better it gets."
          />
        </div>
      </section>

      <div className="px-6 mx-auto max-w-4xl">
        <div className="border-t border-border" />
      </div>

      {/* How it works */}
      <section id="how" className="px-6 py-24 mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <div className="text-[11px] font-semibold text-accent mb-3 tracking-widest uppercase">
            How it works
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            3 steps to get 🦞 working
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {[
            {
              step: '01',
              title: 'Sign up',
              desc: 'Create an account with your email. Takes 30 seconds.',
              icon: Rocket,
            },
            {
              step: '02',
              title: 'Add to your IM',
              desc: 'Connect Slack / Discord / Telegram / WhatsApp in 3 minutes. Your 🦞 moves right in.',
              icon: Blocks,
            },
            {
              step: '03',
              title: 'Start talking',
              desc: '@Nexu in your chat — tell it what you need, and 🦞 builds it for you.',
              icon: Terminal,
            },
          ].map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < 2 && (
                <div className="absolute -right-5 top-7 w-10 border-t border-dashed border-border" />
              )}
              <div className="flex justify-center items-center mx-auto mb-5 w-14 h-14 rounded-2xl bg-accent/10">
                <s.icon size={24} className="text-accent" />
              </div>
              <div className="mb-2 font-mono text-xs font-semibold text-accent">
                STEP {s.step}
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-tertiary">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 mx-auto max-w-4xl">
        <div className="border-t border-border" />
      </div>

      {/* Use Cases */}
      <section className="px-6 py-24 mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <div className="text-[11px] font-semibold text-accent mb-3 tracking-widest uppercase">
            Use cases
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            You describe it. Your 🦞 delivers it.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              icon: Code2,
              tag: 'App',
              prompt: '"Build my daughter a vocabulary flashcard game — cute style"',
              result: 'Creates React game from scratch · 48 word cards · pronunciation · auto-deployed, share the link to play',
              time: '~45s',
            },
            {
              icon: BarChart3,
              tag: 'Data',
              prompt: '"Find the fastest-growing category in this sales data"',
              result: 'Analyzes 12,000+ records · generates trend charts + category rankings + growth forecast dashboard',
              time: '~35s',
            },
            {
              icon: PenTool,
              tag: 'Content',
              prompt: '"Write a blog post + Twitter Thread from this week\'s product updates"',
              result: '1,200-word blog + 8-tweet thread + SEO summary, ready to publish',
              time: '~30s',
            },
            {
              icon: Code2,
              tag: 'Tool',
              prompt: '"Build a customer feedback form that exports to CSV"',
              result: 'Full-stack form app · ratings + text + tag filters + one-click export · live in seconds',
              time: '~40s',
            },
            {
              icon: Workflow,
              tag: 'Automation',
              prompt: '"Every Friday, summarize our Slack discussions and send a newsletter"',
              result: 'Scheduled workflow · auto-fetch → AI summary → format → send email, fully hands-free',
              time: '~20s',
            },
            {
              icon: Search,
              tag: 'Research',
              prompt: '"Research AI coding competitors and build a pricing comparison table"',
              result: 'Covers 6 competitors · feature comparison + pricing matrix + differentiation recommendations',
              time: '~60s',
            },
          ].map((c) => (
            <div
              key={c.prompt}
              className="flex gap-5 items-start p-5 rounded-xl border bg-surface-1 border-border"
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-xl shrink-0 bg-accent/10">
                <c.icon size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 items-center mb-1.5">
                  <span className="text-[10px] font-medium text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <div className="text-[14px] font-semibold text-text-primary mb-1">
                  {c.prompt}
                </div>
                <div className="text-[13px] text-text-muted mb-2">
                  {c.result}
                </div>
                <div className="inline-flex gap-1 items-center text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded-full font-medium">
                  <Clock size={10} /> {c.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 mx-auto max-w-4xl">
        <div className="border-t border-border" />
      </div>

      {/* Numbers */}
      <section className="px-6 py-24 mx-auto max-w-4xl">
        <div className="grid grid-cols-4 gap-8 text-center">
          {[
            { num: '3 min', label: 'To get started', sub: 'Add a bot and you\'re ready' },
            { num: '10h+', label: 'Saved per week', sub: 'Let your lobster do the grunt work' },
            { num: '4', label: 'IM platforms', sub: 'Slack · Discord · Telegram · WhatsApp' },
            { num: '0', label: 'Things to install', sub: 'Just type and it works' },
          ].map((n) => (
            <div key={n.label}>
              <div className="font-mono text-3xl font-bold tracking-tight text-accent">
                {n.num}
              </div>
              <div className="mt-1 text-sm font-medium text-text-primary">
                {n.label}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">{n.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 mx-auto max-w-4xl">
        <div className="border-t border-border" />
      </div>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24 mx-auto max-w-2xl">
        <div className="mb-14 text-center">
          <div className="text-[11px] font-semibold text-accent mb-3 tracking-widest uppercase">
            FAQ
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            You might be wondering
          </h2>
        </div>
        <div>
          <FAQItem
            q="What can Nexu do for me?"
            a="Anything you can describe in a conversation: build websites and tools (auto-deployed and live), analyze data and generate reports, write blogs and newsletters, run scheduled automations, conduct competitive research, and more. Just say what you need in Slack / Discord / Telegram / WhatsApp, and your lobster delivers it."
          />
          <FAQItem
            q="How is this different from ChatGPT / Claude?"
            a="ChatGPT gives you answers. Nexu gives you results. The difference: 1) Your lobster lives in your IM — no extra window to open; 2) It doesn't just respond, it executes — code gets deployed, data analysis becomes a live dashboard; 3) It remembers your preferences — the more you use it, the smoother it gets; 4) It runs scheduled tasks automatically, without you having to watch."
          />
          <FAQItem
            q="I don't know how to code. Can I still use it?"
            a={'Absolutely. Just say "build me a ___" and your lobster handles all the technical details. For example, "build my daughter a vocabulary game" — it writes the code, deploys it, and gives you a link. You never touch a single line of code.'}
          />
          <FAQItem
            q="Which chat apps are supported?"
            a="Slack, Discord, Telegram, and WhatsApp. Each platform only needs a one-time bot setup — takes about 3 minutes. After that, 🦞 shows up in your group chats and DMs."
          />
          <FAQItem
            q="Are the websites/tools it builds temporary?"
            a="No. Every project is deployed to a unique URL that you can share with anyone. Pro plan supports custom domains and permanent hosting."
          />
          <FAQItem
            q="Is my data safe?"
            a="Every user's code and data is fully isolated, running in an independent sandbox environment. We never access or use your data."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-accent-rgb,99,102,241),0.05)_0%,transparent_60%)]" />
        <div className="relative px-6 py-24 mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">
            Stop doing it yourself. Let 🦞 handle it.
          </h2>
          <p className="mb-8 text-base text-text-tertiary">
            Get started for free — say what you need, your lobster builds it.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={goToAuth}
              className="flex gap-2 items-center px-8 py-3 text-sm font-semibold rounded-lg transition-all bg-accent hover:bg-accent-hover text-accent-fg hover:shadow-lg hover:shadow-accent/20"
            >
              Get started free <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="flex justify-between items-center px-6 py-8 mx-auto max-w-5xl">
          <div className="flex items-center gap-2.5">
            <div className="flex justify-center items-center w-5 h-5 rounded bg-accent">
              <span className="text-[9px] font-bold text-accent-fg">N</span>
            </div>
            <span className="text-xs text-text-muted">
              © 2026 Nexu by Refly
            </span>
          </div>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="transition-colors hover:text-text-secondary">
              X / Twitter
            </a>
            <a href="#" className="transition-colors hover:text-text-secondary">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
