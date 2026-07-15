import { useState } from 'react';
import './nexa-dashboard.scss';

const CIRCLES = [
    {
        name: 'Martingale Masters',
        desc: 'A community of traders sharing martingale strategies, stake sizing tips, and loss recovery patterns.',
        members: '4,218',
        bots: '34',
        avgWin: '58%',
        live: true,
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        emoji: '📈',
    },
    {
        name: 'Accumulators Elite',
        desc: 'Focused on Accumulators contracts. Share optimized entry points and volatility-based strategies.',
        members: '2,941',
        bots: '21',
        avgWin: '61%',
        live: true,
        gradient: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
        emoji: '⚡',
    },
    {
        name: 'Risk Managers',
        desc: 'Conservative traders prioritizing capital preservation. Stop-loss discipline and low-stake strategies.',
        members: '1,876',
        bots: '18',
        avgWin: '52%',
        live: false,
        gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
        emoji: '🛡️',
    },
    {
        name: 'Crash & Boom Pros',
        desc: 'Specialized in Crash and Boom index trading. Spike prediction and tick-count analysis.',
        members: '3,502',
        bots: '27',
        avgWin: '55%',
        live: true,
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        emoji: '💥',
    },
    {
        name: 'AI Strategy Lab',
        desc: 'Share and refine AI-generated strategies. Collaborate on prompts and backtest results.',
        members: '1,234',
        bots: '12',
        avgWin: '64%',
        live: false,
        gradient: 'linear-gradient(135deg, #f59e0b, #8b5cf6)',
        emoji: '🤖',
    },
    {
        name: 'Forex Bot Builders',
        desc: 'Automated forex trading on Deriv. EUR/USD, GBP/USD and OTC pairs with bot strategies.',
        members: '2,107',
        bots: '19',
        avgWin: '49%',
        live: true,
        gradient: 'linear-gradient(135deg, #3b82f6, #10b981)',
        emoji: '💱',
    },
];

function CirclesPage() {
    const [joined, setJoined] = useState<Set<string>>(new Set());

    const toggleJoin = (name: string) => {
        setJoined(prev => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    };

    return (
        <div>
            <div className='nx-section-head'>
                <div>
                    <h2>Circles</h2>
                    <p>Join trading communities — share strategies, bots, and insights with like-minded traders</p>
                </div>
            </div>
            <div className='nx-circles-grid'>
                {CIRCLES.map(c => (
                    <div key={c.name} className='nx-circle-card ln-card'>
                        <div className='nx-circle-card__head'>
                            <div className='nx-circle-card__avatar' style={{ background: c.gradient }}>
                                {c.emoji}
                            </div>
                            <div>
                                <div className='nx-circle-card__name'>{c.name}</div>
                                <div className='nx-circle-card__members'>{c.members} members</div>
                            </div>
                        </div>
                        <div className='nx-circle-card__desc'>{c.desc}</div>
                        <div className='nx-circle-card__stats'>
                            <div className='stat'>
                                <span className='num'>{c.bots}</span>
                                <span className='lbl'>Shared bots</span>
                            </div>
                            <div className='stat'>
                                <span className='num'>{c.avgWin}</span>
                                <span className='lbl'>Avg win rate</span>
                            </div>
                            <div className='stat'>
                                <span className='num'>{c.live ? '●' : '○'}</span>
                                <span className='lbl'>{c.live ? 'Live now' : 'Offline'}</span>
                            </div>
                        </div>
                        <div className='nx-circle-card__footer'>
                            {c.live && (
                                <span className='nx-circle-card__live'>
                                    <span className='dot' /> {Math.floor(Math.random() * 50) + 12} online
                                </span>
                            )}
                            <button
                                className={`nx-circle-card__join ${joined.has(c.name) ? 'nx-circle-card__join--joined' : ''}`}
                                onClick={() => toggleJoin(c.name)}
                            >
                                {joined.has(c.name) ? 'Joined ✓' : 'Join circle'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CirclesPage;
