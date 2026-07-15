import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import './landing.scss';

function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setShown(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, shown };
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
    const { ref, shown } = useReveal<HTMLDivElement>();
    return (
        <div ref={ref} className={`ln-reveal ${shown ? 'ln-reveal--in' : ''} ${className}`}>
            {children}
        </div>
    );
}

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'AI Copilot', href: '#ai' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
];

const FEATURES = [
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 2a10 10 0 1 0 10 10' strokeLinecap='round' />
                <path d='M12 6v6l4 2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
        title: 'Real-time Automation',
        desc: 'Execute strategies the instant market conditions align. Sub-second WebSocket streaming keeps your bot in sync with every tick.',
    },
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <rect x='3' y='3' width='7' height='7' rx='1.5' />
                <rect x='14' y='3' width='7' height='7' rx='1.5' />
                <rect x='3' y='14' width='7' height='7' rx='1.5' />
                <rect x='14' y='14' width='7' height='7' rx='1.5' />
            </svg>
        ),
        title: 'Visual Bot Builder',
        desc: 'Drag-and-drop Blockly blocks to compose complex trading logic without writing a single line of code.',
    },
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M3 3v18h18' strokeLinecap='round' />
                <path d='M7 14l3-3 3 2 5-6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
        title: 'Live SmartCharts',
        desc: 'Professional candlestick, line, and bar charts powered by Deriv SmartCharts with 90+ tradeable markets.',
    },
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M13 2L3 14h7l-1 8 10-12h-7z' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
        title: 'AI Strategy Copilot',
        desc: 'Describe your goal in plain English. Our AI suggests block arrangements, risk parameters, and stop-loss logic.',
    },
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
        title: 'Bank-grade Security',
        desc: 'OAuth 2.0 with PKCE, token isolation per account, and zero credential storage. Your keys never leave the browser.',
    },
    {
        icon: (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='12' r='9' />
                <path d='M12 7v5l3 2' strokeLinecap='round' />
            </svg>
        ),
        title: 'Backtest & Simulate',
        desc: 'Run strategies against historical tick data before going live. Fine-tune stake sizing and win-rate thresholds.',
    },
];

const STATS = [
    { num: '90+', label: 'Tradeable markets' },
    { num: '1.2M+', label: 'Bots deployed' },
    { num: '99.98%', label: 'Uptime SLA' },
    { num: '<50ms', label: 'Execution latency' },
];

const PLANS = [
    {
        name: 'Starter',
        price: '$0',
        per: '/forever',
        tag: 'Everything you need to launch your first bot.',
        features: ['1 active bot', 'Visual block builder', '5 markets', 'Community support', '1-day backtest window'],
        featured: false,
    },
    {
        name: 'Pro',
        price: '$29',
        per: '/month',
        tag: 'For active traders scaling automated portfolios.',
        features: [
            '10 active bots',
            'AI Strategy Copilot',
            'All 90+ markets',
            '30-day backtest window',
            'Priority email support',
            'Telegram trade alerts',
        ],
        featured: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        per: '',
        tag: 'Dedicated infra and white-label deployment.',
        features: ['Unlimited bots', 'Unlimited backtest window', 'Dedicated support engineer', 'Custom integrations', 'SLA guarantee'],
        featured: false,
    },
];

const TESTIMONIALS = [
    {
        text: "The AI copilot suggested a martingale variant I'd never considered. My win rate jumped from 54% to 61% in two weeks.",
        name: 'Marcus T.',
        role: 'Day trader, Kenya',
        initials: 'MT',
    },
    {
        text: 'I built my first bot in an afternoon with the visual builder. No code, no headaches — just drag, configure, and run.',
        name: 'Aisha N.',
        role: 'Quant enthusiast, Nigeria',
        initials: 'AN',
    },
    {
        text: 'Execution latency is genuinely under 50ms. Compared to my old setup this is night and day for tick-based strategies.',
        name: 'David K.',
        role: 'Algorithmic trader, Ghana',
        initials: 'DK',
    },
];

const FAQS = [
    {
        q: 'What is Deriv and how does this site use it?',
        a: 'Deriv is a regulated online trading platform offering 90+ markets. This site is a third-party interface that connects to the Deriv WebSocket API — you log in via Deriv OAuth, and our bot builder and AI copilot run on top of your existing Deriv account.',
    },
    {
        q: 'Do I need a Deriv account to use the bot?',
        a: 'Yes. Click "Launch Bot" and you will be redirected to Deriv to authorize. We never see your password — the OAuth flow returns a scoped token that stays in your browser.',
    },
    {
        q: 'Is my money safe?',
        a: 'We never custody funds. All deposits, withdrawals, and trades happen on Deriv. Our site only sends trade instructions via the API using your authorized token.',
    },
    {
        q: 'How does the AI Strategy Copilot work?',
        a: 'You describe a trading goal in plain language ("buy rise when last 3 ticks are green, martingale on loss, stop after 5 wins"). The copilot translates that into a block arrangement you can review, edit, and run.',
    },
    {
        q: 'Can I run multiple bots at once?',
        a: 'Pro plans support 10 concurrent bots across different markets. Enterprise plans have no limit. Each bot runs in an isolated interpreter instance.',
    },
];

function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`ln-nav ${scrolled ? 'is-scrolled' : ''}`}>
            <div className='ln-container ln-nav__inner'>
                <Link to='/' className='ln-nav__brand'>
                    <span className='ln-nav__logo'>N</span>
                    <span>NexaBot</span>
                </Link>
                <ul className='ln-nav__links'>
                    {NAV_LINKS.map(l => (
                        <li key={l.href}>
                            <a href={l.href}>{l.label}</a>
                        </li>
                    ))}
                </ul>
                <div className='ln-nav__cta'>
                    <Link to='/bot' className='ln-btn ln-btn--ghost ln-btn--sm'>
                        Log in
                    </Link>
                    <Link to='/bot' className='ln-btn ln-btn--primary ln-btn--sm'>
                        Launch Bot
                    </Link>
                    <button className='ln-nav__burger' onClick={() => setOpen(!open)} aria-label='Menu'>
                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            {open ? (
                                <path d='M6 6l12 12M6 18L18 6' strokeLinecap='round' />
                            ) : (
                                <>
                                    <path d='M4 7h16' strokeLinecap='round' />
                                    <path d='M4 12h16' strokeLinecap='round' />
                                    <path d='M4 17h16' strokeLinecap='round' />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`ln-nav__mobile ${open ? 'ln-nav__mobile--open' : ''}`}>
                {NAV_LINKS.map(l => (
                    <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                        {l.label}
                    </a>
                ))}
                <Link to='/bot' onClick={() => setOpen(false)}>
                    Launch Bot
                </Link>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className='ln-hero'>
            <div className='ln-container ln-hero__inner'>
                <div>
                    <span className='ln-eyebrow'>
                        <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                            <circle cx='12' cy='12' r='6' />
                        </svg>
                        AI-Powered Deriv Trading
                    </span>
                    <h1 className='ln-hero__title'>
                        Trade smarter with <span className='ln-grad-text'>AI-driven</span> automation
                    </h1>
                    <p className='ln-hero__desc'>
                        NexaBot turns the Deriv API into a premium, no-code trading experience. Build, backtest, and deploy
                        automated strategies in minutes — supercharged by an AI copilot that writes your bot logic for you.
                    </p>
                    <div className='ln-hero__actions'>
                        <Link to='/bot' className='ln-btn ln-btn--primary'>
                            Launch the Bot Builder
                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </Link>
                        <a href='#features' className='ln-btn ln-btn--ghost'>
                            Explore features
                        </a>
                    </div>
                    <div className='ln-hero__meta'>
                        <div className='ln-hero__meta-item'>
                            <span className='num'>90+</span>
                            <span className='label'>Markets</span>
                        </div>
                        <div className='ln-hero__meta-item'>
                            <span className='num'>{'<'}50ms</span>
                            <span className='label'>Latency</span>
                        </div>
                        <div className='ln-hero__meta-item'>
                            <span className='num'>1.2M+</span>
                            <span className='label'>Bots deployed</span>
                        </div>
                    </div>
                </div>
                <div className='ln-hero__visual ln-float-anim'>
                    <div className='ln-card ln-mock'>
                        <div className='ln-mock__bar'>
                            <span className='ln-mock__dot ln-mock__dot--r' />
                            <span className='ln-mock__dot ln-mock__dot--y' />
                            <span className='ln-mock__dot ln-mock__dot--g' />
                            <span className='ln-mock__title'>nexabot — live session</span>
                        </div>
                        <div className='ln-mock__stats'>
                            <div className='ln-mock__stat'>
                                <div className='label'>Balance</div>
                                <div className='val'>$ 12,480.50</div>
                            </div>
                            <div className='ln-mock__stat'>
                                <div className='label'>Win rate</div>
                                <div className='val val--up'>61.4%</div>
                            </div>
                            <div className='ln-mock__stat'>
                                <div className='label'>P&amp;L today</div>
                                <div className='val val--up'>+$ 318.20</div>
                            </div>
                        </div>
                        <div className='ln-mock__chart'>
                            <svg width='100%' height='100%' viewBox='0 0 300 120' preserveAspectRatio='none'>
                                <defs>
                                    <linearGradient id='lnchart' x1='0' y1='0' x2='0' y2='1'>
                                        <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.4' />
                                        <stop offset='100%' stopColor='#3b82f6' stopOpacity='0' />
                                    </linearGradient>
                                </defs>
                                <path
                                    d='M0,90 L25,80 L50,85 L75,60 L100,70 L125,45 L150,55 L175,30 L200,40 L225,25 L250,35 L275,15 L300,22 L300,120 L0,120 Z'
                                    fill='url(#lnchart)'
                                />
                                <path
                                    d='M0,90 L25,80 L50,85 L75,60 L100,70 L125,45 L150,55 L175,30 L200,40 L225,25 L250,35 L275,15 L300,22'
                                    fill='none'
                                    stroke='#60a5fa'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </div>
                        <div className='ln-mock__ai'>
                            <span className='ln-mock__ai-pulse' />
                            <span className='ln-mock__ai-text'>
                                <span className='strong'>AI Copilot:</span> Detected 3 bullish ticks — recommending Rise entry on Volatility 75.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section className='ln-section' id='features'>
            <div className='ln-container'>
                <Reveal>
                    <span className='ln-eyebrow'>Capabilities</span>
                    <h2 className='ln-section-title'>
                        Everything you need to <span className='ln-grad-text'>automate</span> your edge
                    </h2>
                    <p className='ln-section-sub'>
                        From visual strategy design to real-time execution and AI-assisted optimization — NexaBot covers the
                        full automated trading lifecycle on Deriv.
                    </p>
                </Reveal>
                <div className='ln-features'>
                    {FEATURES.map((f, i) => (
                        <Reveal key={f.title} className={i > 2 ? 'ln-card ln-feature' : 'ln-card ln-feature'}>
                            <div className='ln-feature__icon'>{f.icon}</div>
                            <h3 className='ln-feature__title'>{f.title}</h3>
                            <p className='ln-feature__desc'>{f.desc}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AIShowcase() {
    return (
        <section className='ln-section' id='ai'>
            <div className='ln-container'>
                <Reveal>
                    <span className='ln-eyebrow'>AI Strategy Copilot</span>
                    <h2 className='ln-section-title'>
                        Describe it. <span className='ln-grad-text'>We build it.</span>
                    </h2>
                    <p className='ln-section-sub'>
                        No more staring at a blank canvas. Tell the copilot your strategy in plain English and watch it
                        assemble the blocks, set risk parameters, and suggest backtest settings.
                    </p>
                </Reveal>
                <div className='ln-showcase'>
                    <Reveal>
                        <div className='ln-card ln-chat'>
                            <div className='ln-chat__head'>
                                <div className='ln-chat__avatar'>AI</div>
                                <div>
                                    <div className='ln-chat__name'>NexaBot Copilot</div>
                                    <div className='ln-chat__status'>● online</div>
                                </div>
                            </div>
                            <div className='ln-chat__body'>
                                <div className='ln-chat__msg ln-chat__msg--user'>
                                    Buy Rise on Volatility 75 when the last 3 ticks are green. Martingale x2 on loss. Stop after 5 wins or $100 loss.
                                </div>
                                <div className='ln-chat__msg ln-chat__msg--ai'>
                                    Got it. I&apos;ll set up a trade definition block with Rise/Fall on Volatility 75, a tick-analysis
                                    block checking 3 consecutive green ticks, a martingale stake multiplier (x2), and a stop
                                    condition on 5 wins or $100 cumulative loss. Want me to backtest on the last 7 days?
                                </div>
                                <div className='ln-chat__msg ln-chat__msg--user'>Yes, and show me the win rate.</div>
                                <div className='ln-chat__msg ln-chat__msg--ai'>
                                    Backtest complete: 142 trades, 58.4% win rate, net +$84.20 over 7 days. I recommend a $2
                                    base stake. Ready to deploy?
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal>
                        <ul className='ln-showcase-list'>
                            <li>
                                <span className='tick'>
                                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                                        <path d='M5 12l5 5L20 7' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </span>
                                Natural-language strategy generation from a single prompt
                            </li>
                            <li>
                                <span className='tick'>
                                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                                        <path d='M5 12l5 5L20 7' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </span>
                                Automatic risk management — stop-loss, take-profit, max runs
                            </li>
                            <li>
                                <span className='tick'>
                                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                                        <path d='M5 12l5 5L20 7' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </span>
                                One-click backtest with win-rate and P&amp;L breakdown
                            </li>
                            <li>
                                <span className='tick'>
                                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                                        <path d='M5 12l5 5L20 7' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </span>
                                Editable output — every block is fully adjustable after generation
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function StatsBand() {
    return (
        <section className='ln-section' style={{ paddingTop: 0 }}>
            <div className='ln-container'>
                <Reveal>
                    <div className='ln-stats'>
                        {STATS.map(s => (
                            <div key={s.label} className='ln-card ln-stat-card'>
                                <div className='num'>{s.num}</div>
                                <div className='label'>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function Pricing() {
    return (
        <section className='ln-section' id='pricing'>
            <div className='ln-container'>
                <Reveal>
                    <span className='ln-eyebrow'>Pricing</span>
                    <h2 className='ln-section-title'>
                        Simple, <span className='ln-grad-text'>transparent</span> plans
                    </h2>
                    <p className='ln-section-sub'>Start free. Upgrade when you are ready to scale. Cancel anytime.</p>
                </Reveal>
                <div className='ln-pricing'>
                    {PLANS.map(p => (
                        <Reveal key={p.name}>
                            <div className={`ln-card ln-plan ${p.featured ? 'ln-plan--featured' : ''}`}>
                                {p.featured && <span className='ln-plan__badge'>Most popular</span>}
                                <div className='ln-plan__name'>{p.name}</div>
                                <div className='ln-plan__price'>
                                    <span className='amt'>{p.price}</span>
                                    <span className='per'>{p.per}</span>
                                </div>
                                <div className='ln-plan__tag'>{p.tag}</div>
                                <ul className='ln-plan__list'>
                                    {p.features.map(f => (
                                        <li key={f}>
                                            <span className='tick'>✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to='/bot'
                                    className={`ln-btn ${p.featured ? 'ln-btn--primary' : 'ln-btn--ghost'}`}
                                >
                                    {p.price === '$0' ? 'Start free' : 'Get started'}
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className='ln-section' id='reviews'>
            <div className='ln-container'>
                <Reveal>
                    <span className='ln-eyebrow'>Loved by traders</span>
                    <h2 className='ln-section-title'>
                        Trusted by <span className='ln-grad-text'>1.2M+</span> automated traders
                    </h2>
                </Reveal>
                <div className='ln-testimonials'>
                    {TESTIMONIALS.map(t => (
                        <Reveal key={t.name}>
                            <div className='ln-card ln-quote'>
                                <div className='ln-quote__stars'>★★★★★</div>
                                <p className='ln-quote__text'>&ldquo;{t.text}&rdquo;</p>
                                <div className='ln-quote__author'>
                                    <div className='avatar'>{t.initials}</div>
                                    <div>
                                        <div className='name'>{t.name}</div>
                                        <div className='role'>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className='ln-section' id='faq'>
            <div className='ln-container'>
                <Reveal>
                    <span className='ln-eyebrow'>FAQ</span>
                    <h2 className='ln-section-title'>
                        Questions? <span className='ln-grad-text'>Answered.</span>
                    </h2>
                </Reveal>
                <div className='ln-faq'>
                    {FAQS.map((f, i) => (
                        <Reveal key={f.q}>
                            <div className={`ln-card ln-faq-item ${open === i ? 'ln-faq-item--open' : ''}`}>
                                <button className='ln-faq-item__q' onClick={() => setOpen(open === i ? null : i)}>
                                    {f.q}
                                    <span className='ln-faq-item__icon'>+</span>
                                </button>
                                <div className='ln-faq-item__a'>
                                    <div className='inner'>{f.a}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTABand() {
    return (
        <section className='ln-section' style={{ paddingTop: 0 }}>
            <div className='ln-container'>
                <Reveal>
                    <div className='ln-card ln-cta-band'>
                        <h2 className='ln-cta-band__title'>
                            Ready to automate your <span className='ln-grad-text'>trading edge?</span>
                        </h2>
                        <p className='ln-cta-band__sub'>
                            Launch the bot builder now and deploy your first AI-assisted strategy in under five minutes.
                        </p>
                        <div className='ln-cta-band__actions'>
                            <Link to='/bot' className='ln-btn ln-btn--primary'>
                                Launch the Bot Builder
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                    <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </Link>
                            <a href='#pricing' className='ln-btn ln-btn--ghost'>
                                View pricing
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className='ln-footer'>
            <div className='ln-container'>
                <div className='ln-footer__top'>
                    <div className='ln-footer__brand'>
                        <Link to='/' className='ln-nav__brand'>
                            <span className='ln-nav__logo'>N</span>
                            <span>NexaBot</span>
                        </Link>
                        <p>
                            An AI-powered third-party interface for the Deriv trading platform. Build, backtest, and deploy
                            automated trading strategies — no code required.
                        </p>
                    </div>
                    <div className='ln-footer__col'>
                        <h4>Product</h4>
                        <ul>
                            <li><a href='#features'>Features</a></li>
                            <li><a href='#ai'>AI Copilot</a></li>
                            <li><a href='#pricing'>Pricing</a></li>
                            <li><Link to='/bot'>Bot Builder</Link></li>
                        </ul>
                    </div>
                    <div className='ln-footer__col'>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href='#faq'>FAQ</a></li>
                            <li><a href='#reviews'>Reviews</a></li>
                            <li><a href='https://deriv.com' target='_blank' rel='noopener noreferrer'>Deriv</a></li>
                        </ul>
                    </div>
                    <div className='ln-footer__col'>
                        <h4>Legal</h4>
                        <ul>
                            <li><a href='#'>Terms</a></li>
                            <li><a href='#'>Privacy</a></li>
                            <li><a href='#'>Risk Disclosure</a></li>
                        </ul>
                    </div>
                </div>
                <div className='ln-footer__bottom'>
                    <p>&copy; {new Date().getFullYear()} NexaBot. Not affiliated with or endorsed by Deriv.</p>
                    <span className='ln-badge-risk'>Trading involves risk</span>
                </div>
            </div>
        </footer>
    );
}

export default function Landing() {
    return (
        <div className='ln-shell'>
            <AnimatedBackground />
            <Navbar />
            <Hero />
            <Features />
            <AIShowcase />
            <StatsBand />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTABand />
            <Footer />
        </div>
    );
}
