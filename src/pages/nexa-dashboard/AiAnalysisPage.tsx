import './nexa-dashboard.scss';

const AI_SIGNALS = [
    { symbol: 'Volatility 75 Index', dir: 'Rise — 3 consecutive green ticks detected', conf: 82 },
    { symbol: 'Boom 1000 Index', dir: 'Fall — spike pattern forming', conf: 67 },
    { symbol: 'Jump 25 Index', dir: 'Rise — momentum building', conf: 74 },
    { symbol: 'Volatility 10 Index', dir: 'Neutral — sideways channel', conf: 45 },
];

const MARKET_SCAN = [
    { name: 'Volatility 75', type: 'Synthetic', sentiment: 'bull' },
    { name: 'Volatility 100', type: 'Synthetic', sentiment: 'bull' },
    { name: 'Boom 500', type: 'Crash/Boom', sentiment: 'bear' },
    { name: 'Crash 1000', type: 'Crash/Boom', sentiment: 'bear' },
    { name: 'Jump 25', type: 'Jump', sentiment: 'bull' },
    { name: 'Step Index', type: 'Synthetic', sentiment: 'neutral' },
    { name: 'BTC/USD', type: 'Crypto', sentiment: 'bull' },
    { name: 'EUR/USD OTC', type: 'Forex', sentiment: 'neutral' },
];

function AiAnalysisPage() {
    return (
        <div>
            <div className='nx-section-head'>
                <div>
                    <h2>AI Analysis</h2>
                    <p>Real-time AI-powered market signals and sentiment analysis</p>
                </div>
            </div>
            <div className='nx-ai-analysis'>
                <div className='nx-ai-panel ln-card'>
                    <div className='nx-ai-head'>
                        <div className='nx-ai-head__avatar'>AI</div>
                        <div>
                            <div className='nx-ai-head__title'>NexaBot AI Engine</div>
                            <div className='nx-ai-head__status'>● Analyzing 90+ markets</div>
                        </div>
                    </div>

                    <div className='nx-ai-insight'>
                        <span className='strong'>Market Summary:</span> The synthetic indices sector is showing strong
                        bullish momentum on Volatility 75 and 100. The AI detects a 3-tick green streak pattern on
                        Volatility 75 with 82% confidence. Crash/Boom markets are showing bearish divergence — consider
                        Fall entries on Boom 500.
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 14 }}>Active Signals</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {AI_SIGNALS.map(s => (
                                <div key={s.symbol} className='nx-ai-signal'>
                                    <div className='nx-ai-signal__left'>
                                        <span className='nx-ai-signal__symbol'>{s.symbol}</span>
                                        <span className='nx-ai-signal__dir'>{s.dir}</span>
                                        <span className='nx-ai-signal__conf'>Confidence: {s.conf}%</span>
                                    </div>
                                    <div className='nx-ai-signal__bar'>
                                        <div className='nx-ai-signal__bar-fill' style={{ width: `${s.conf}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='nx-ai-panel ln-card'>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Market Sentiment Scan</h3>
                    <div className='nx-market-list'>
                        {MARKET_SCAN.map(m => (
                            <div key={m.name} className='nx-market-row'>
                                <div>
                                    <div className='nx-market-row__name'>{m.name}</div>
                                    <div className='nx-market-row__type'>{m.type}</div>
                                </div>
                                <span
                                    className={`nx-market-row__sentiment nx-market-row__sentiment--${
                                        m.sentiment === 'bull' ? 'bull' : m.sentiment === 'bear' ? 'bear' : 'neutral'
                                    }`}
                                >
                                    {m.sentiment === 'bull' ? '▲ Bullish' : m.sentiment === 'bear' ? '▼ Bearish' : '— Neutral'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiAnalysisPage;
