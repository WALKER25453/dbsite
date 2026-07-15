import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useApiBase } from '@/hooks/useApiBase';
import { useStore } from '@/hooks/useStore';
import { useLogout } from '@/hooks/useLogout';
import { DBOT_TABS } from '@/constants/bot-contents';
import OverviewPage from './OverviewPage';
import FreeBotsPage from './FreeBotsPage';
import AiAnalysisPage from './AiAnalysisPage';
import CirclesPage from './CirclesPage';
import BotBuilderPage from './BotBuilderPage';
import TradingViewPage from './TradingViewPage';
import './nexa-dashboard.scss';

type PageId = 'overview' | 'bot-builder' | 'trading-view' | 'free-bots' | 'ai-analysis' | 'circles';

const NAV_ITEMS: { id: PageId; label: string; icon: ReactNode }[] = [
    {
        id: 'overview',
        label: 'Dashboard',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <rect x='3' y='3' width='7' height='7' rx='1.5' />
                <rect x='14' y='3' width='7' height='7' rx='1.5' />
                <rect x='3' y='14' width='7' height='7' rx='1.5' />
                <rect x='14' y='14' width='7' height='7' rx='1.5' />
            </svg>
        ),
    },
    {
        id: 'bot-builder',
        label: 'Bot Builder',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 2a10 10 0 1 0 10 10' strokeLinecap='round' />
                <path d='M14.5 10L12 12.5 9.5 10' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
    },
    {
        id: 'trading-view',
        label: 'Deriv Trading View',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M3 3v18h18' strokeLinecap='round' />
                <path d='M7 14l3-3 3 2 5-6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
    },
    {
        id: 'free-bots',
        label: 'Free Bots',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M13 2L3 14h7l-1 8 10-12h-7z' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
    },
    {
        id: 'ai-analysis',
        label: 'AI Analysis',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='12' r='9' />
                <path d='M12 8v4l3 2' strokeLinecap='round' />
            </svg>
        ),
    },
    {
        id: 'circles',
        label: 'Circles',
        icon: (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='9' cy='12' r='5' />
                <circle cx='16' cy='12' r='5' />
            </svg>
        ),
    },
];

function formatBalance(balance: string, currency: string) {
    const num = parseFloat(balance || '0');
    return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

const NexaDashboard = observer(() => {
    const [activePage, setActivePage] = useState<PageId>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authData, activeLoginid } = useApiBase();
    const { client } = useStore() ?? {};
    const handleLogout = useLogout();

    const { dashboard } = useStore() ?? {};

    useEffect(() => {
        if (dashboard && activePage !== 'bot-builder' && activePage !== 'trading-view') {
            dashboard.setActiveTab(DBOT_TABS.DASHBOARD);
        }
    }, [activePage, dashboard]);

    const balance = client?.balance || authData?.balance || '0';
    const currency = client?.currency || authData?.currency || 'USD';
    const isVirtual = activeLoginid?.startsWith('VRT') || activeLoginid?.startsWith('VRTC');
    const loginid = activeLoginid || client?.loginid || '—';

    const renderPage = () => {
        switch (activePage) {
            case 'overview':
                return <OverviewPage />;
            case 'bot-builder':
                return <BotBuilderPage />;
            case 'trading-view':
                return <TradingViewPage />;
            case 'free-bots':
                return <FreeBotsPage />;
            case 'ai-analysis':
                return <AiAnalysisPage />;
            case 'circles':
                return <CirclesPage />;
            default:
                return <OverviewPage />;
        }
    };

    return (
        <div className='nx-dash'>
            {sidebarOpen && <div className='nx-overlay nx-overlay--visible' onClick={() => setSidebarOpen(false)} />}

            <aside className={`nx-sidebar ${sidebarOpen ? 'nx-sidebar--open' : ''}`}>
                <Link to='/' className='nx-sidebar__brand'>
                    <span className='nx-sidebar__logo'>N</span>
                    <span>NexaBot</span>
                </Link>

                <nav className='nx-sidebar__nav'>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`nx-sidebar__item ${activePage === item.id ? 'nx-sidebar__item--active' : ''}`}
                            onClick={() => {
                                setActivePage(item.id);
                                setSidebarOpen(false);
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className='nx-sidebar__user'>
                    <div className='nx-sidebar__user-card'>
                        <div className='nx-sidebar__user-row'>
                            <div className='nx-sidebar__user-avatar'>{loginid.charAt(0) || 'U'}</div>
                            <div>
                                <div className='nx-sidebar__user-name'>{loginid}</div>
                                <div className='nx-sidebar__user-type'>
                                    {isVirtual ? 'Demo account' : 'Real account'} · {currency}
                                </div>
                            </div>
                        </div>
                        <div className='nx-sidebar__user-balance'>
                            <span className='label'>Balance</span>
                            <span className='val'>{formatBalance(balance, currency)}</span>
                        </div>
                        <button className='nx-sidebar__logout' onClick={() => handleLogout()}>
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            <div className='nx-main'>
                <header className='nx-topbar'>
                    <div className='nx-topbar__left'>
                        <button className='nx-topbar__burger' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                <path d='M4 7h16' strokeLinecap='round' />
                                <path d='M4 12h16' strokeLinecap='round' />
                                <path d='M4 17h16' strokeLinecap='round' />
                            </svg>
                        </button>
                        <span className='nx-topbar__title'>{NAV_ITEMS.find(n => n.id === activePage)?.label}</span>
                    </div>
                    <div className='nx-topbar__right'>
                        <span className='nx-topbar__badge'>
                            <span className='dot' /> Connected
                        </span>
                        <span className='nx-topbar__acct'>
                            {loginid} · <span className='amt'>{formatBalance(balance, currency)}</span>
                        </span>
                        <Link to='/' className='nx-back-home'>
                            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                <path d='M19 12H5M12 19l-7-7 7-7' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Home
                        </Link>
                    </div>
                </header>

                <main className='nx-content'>{renderPage()}</main>
            </div>
        </div>
    );
});

export default NexaDashboard;
