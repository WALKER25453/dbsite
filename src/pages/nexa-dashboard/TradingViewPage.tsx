import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';
import './nexa-dashboard.scss';

const TradingViewPage = observer(() => {
    const { dashboard } = useStore();

    useEffect(() => {
        dashboard.setActiveTab(DBOT_TABS.CHART);
        return () => {};
    }, [dashboard]);

    return (
        <div>
            <div className='nx-section-head'>
                <div>
                    <h2>Deriv Trading View</h2>
                    <p>Live SmartCharts with real-time price feeds across 90+ markets</p>
                </div>
            </div>
            <div className='nx-embed'>
                <p style={{ color: 'var(--ln-text-muted)', padding: 24, textAlign: 'center' }}>
                    The chart is active in the main workspace. Switch between markets using the chart toolbar.
                </p>
            </div>
        </div>
    );
});

export default TradingViewPage;
