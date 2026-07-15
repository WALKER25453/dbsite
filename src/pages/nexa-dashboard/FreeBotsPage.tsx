import { useState } from 'react';
import './nexa-dashboard.scss';

const FREE_BOTS = [
    {
        icon: '📈',
        name: 'Martingale',
        desc: 'Double your stake after each loss to recover and profit on the next win. Classic progression strategy.',
        tags: ['Rise/Fall', 'Progression', 'Popular'],
        runs: '48.2K',
    },
    {
        icon: '🔄',
        name: 'Reverse Martingale',
        desc: 'Double stake after each win instead of loss. Ride winning streaks while limiting downside on losses.',
        tags: ['Rise/Fall', 'Streak'],
        runs: '31.8K',
    },
    {
        icon: '⚖️',
        name: "D'Alembert",
        desc: 'Increase stake by one unit after a loss, decrease by one after a win. A balanced progression system.',
        tags: ['Rise/Fall', 'Balanced'],
        runs: '22.1K',
    },
    {
        icon: '🎯',
        name: 'Oscars Grind',
        desc: 'Increase stake by one unit after a win, keep it the same after a loss. Targets small consistent profits.',
        tags: ['Rise/Fall', 'Conservative'],
        runs: '18.5K',
    },
    {
        icon: '🎲',
        name: '1-3-2-6',
        desc: 'A four-stage progression: bet 1 unit, then 3, then 2, then 6. Resets after the cycle completes.',
        tags: ['Rise/Fall', 'Pattern'],
        runs: '15.3K',
    },
    {
        icon: '⚡',
        name: 'Accumulators Martingale',
        desc: 'Martingale progression adapted for Accumulators contracts. Optimized for volatile markets.',
        tags: ['Accumulators', 'Progression'],
        runs: '12.7K',
    },
    {
        icon: '🔮',
        name: 'Accumulators D Alembert',
        desc: "D'Alembert balanced progression for Accumulators. Steady growth with controlled risk.",
        tags: ['Accumulators', 'Balanced'],
        runs: '9.4K',
    },
    {
        icon: '🔁',
        name: 'Reverse D Alembert',
        desc: 'Reverse the D\'Alembert: increase after wins, decrease after losses. Capitalize on winning runs.',
        tags: ['Rise/Fall', 'Streak'],
        runs: '8.1K',
    },
    {
        icon: '📊',
        name: 'Martingale Max Stake',
        desc: 'Martingale with a maximum stake cap to prevent runaway losses during long losing streaks.',
        tags: ['Rise/Fall', 'Risk-capped'],
        runs: '6.8K',
    },
];

function FreeBotsPage() {
    const [deployed, setDeployed] = useState<string | null>(null);

    return (
        <div>
            <div className='nx-section-head'>
                <div>
                    <h2>Free Bots</h2>
                    <p>Pre-built strategy templates — deploy instantly to the Bot Builder</p>
                </div>
            </div>
            <div className='nx-bots-grid'>
                {FREE_BOTS.map(bot => (
                    <div key={bot.name} className='nx-bot-card ln-card'>
                        <div className='nx-bot-card__icon'>{bot.icon}</div>
                        <div className='nx-bot-card__name'>{bot.name}</div>
                        <div className='nx-bot-card__desc'>{bot.desc}</div>
                        <div className='nx-bot-card__tags'>
                            {bot.tags.map(t => (
                                <span key={t} className='nx-bot-card__tag'>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className='nx-bot-card__footer'>
                            <span className='nx-bot-card__runs'>{bot.runs} runs</span>
                            <button
                                className='nx-bot-card__btn'
                                onClick={() => {
                                    setDeployed(bot.name);
                                    setTimeout(() => setDeployed(null), 2500);
                                }}
                            >
                                {deployed === bot.name ? 'Deploying…' : 'Deploy bot'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreeBotsPage;
