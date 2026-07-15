import { observer } from 'mobx-react-lite';
import { useApiBase } from '@/hooks/useApiBase';
import { useStore } from '@/hooks/useStore';
import './nexa-dashboard.scss';

function formatBalance(balance: string, currency: string) {
    const num = parseFloat(balance || '0');
    const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${formatted} ${currency}`;
}

const OverviewPage = observer(() => {
    const { authData, accountList, activeLoginid } = useApiBase();
    const { client } = useStore() ?? {};

    const accounts = accountList?.length
        ? accountList
        : client?.account_list?.length
        ? client.account_list
        : [];

    const activeBalance = client?.balance || authData?.balance || '0';
    const activeCurrency = client?.currency || authData?.currency || 'USD';
    const isVirtual = activeLoginid?.startsWith('VRT') || activeLoginid?.startsWith('VRTC');

    return (
        <div className='nx-overview'>
            <div className='nx-section-head'>
                <div>
                    <h2>Dashboard</h2>
                    <p>Your account overview and balance across all Deriv accounts</p>
                </div>
            </div>

            <div className='nx-balance-row'>
                <div className='nx-balance-card nx-balance-card--primary'>
                    <div className='nx-balance-card__label'>Total Balance</div>
                    <div className='nx-balance-card__val'>{formatBalance(activeBalance, activeCurrency)}</div>
                    <div className='nx-balance-card__sub nx-balance-card__sub--muted'>
                        {isVirtual ? 'Demo account' : 'Real account'} · {activeLoginid || '—'}
                    </div>
                </div>
                <div className='nx-balance-card ln-card'>
                    <div className='nx-balance-card__label'>Active Account</div>
                    <div className='nx-balance-card__val'>{activeLoginid || '—'}</div>
                    <div className='nx-balance-card__sub nx-balance-card__sub--muted'>{activeCurrency}</div>
                </div>
                <div className='nx-balance-card ln-card'>
                    <div className='nx-balance-card__label'>Accounts</div>
                    <div className='nx-balance-card__val'>{accounts.length}</div>
                    <div className='nx-balance-card__sub nx-balance-card__sub--muted'>
                        {accounts.filter((a: any) => a.is_virtual).length} demo ·{' '}
                        {accounts.filter((a: any) => !a.is_virtual).length} real
                    </div>
                </div>
                <div className='nx-balance-card ln-card'>
                    <div className='nx-balance-card__label'>Status</div>
                    <div className='nx-balance-card__val' style={{ color: '#34d399', fontSize: '1.2rem' }}>
                        Connected
                    </div>
                    <div className='nx-balance-card__sub nx-balance-card__sub--muted'>WebSocket live</div>
                </div>
            </div>

            <div>
                <div className='nx-section-head'>
                    <div>
                        <h2>All Accounts</h2>
                        <p>Switch between your Deriv accounts</p>
                    </div>
                </div>
                <div className='nx-accounts-grid'>
                    {accounts.length === 0 && (
                        <div className='nx-empty'>
                            <div className='nx-empty__icon'>
                                <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                    <path d='M12 2a10 10 0 1 0 10 10' strokeLinecap='round' />
                                </svg>
                            </div>
                            <div className='nx-empty__title'>No accounts loaded</div>
                            <div className='nx-empty__desc'>
                                Your Deriv accounts will appear here once the WebSocket connection is fully established.
                            </div>
                        </div>
                    )}
                    {accounts.map((acct: any) => {
                        const isActive = acct.loginid === activeLoginid;
                        const virtual = acct.is_virtual || acct.loginid?.startsWith('VRT');
                        return (
                            <div key={acct.loginid} className='nx-acct-card ln-card'>
                                <div className='nx-acct-card__head'>
                                    <span className={`nx-acct-card__type ${virtual ? 'nx-acct-card__type--demo' : 'nx-acct-card__type--real'}`}>
                                        {virtual ? 'Demo' : 'Real'}
                                    </span>
                                    <span className='nx-acct-card__id'>{acct.loginid}</span>
                                </div>
                                <div>
                                    <div className='nx-acct-card__balance'>
                                        {formatBalance(acct.balance || '0', acct.currency || 'USD')}
                                    </div>
                                    <div className='nx-acct-card__currency'>{acct.currency || 'USD'}</div>
                                </div>
                                <button
                                    className={`nx-acct-card__action ${isActive ? 'nx-acct-card__action--active' : ''}`}
                                    onClick={() => {
                                        localStorage.setItem('active_loginid', acct.loginid);
                                        const isDemo = acct.loginid.startsWith('VRT') || acct.loginid.startsWith('VRTC');
                                        localStorage.setItem('account_type', isDemo ? 'demo' : 'real');
                                        window.location.reload();
                                    }}
                                >
                                    {isActive ? 'Active' : 'Switch to this account'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default OverviewPage;
