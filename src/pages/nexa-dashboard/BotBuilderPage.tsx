import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';
import RunPanel from '@/components/run-panel';
import './nexa-dashboard.scss';

const BotBuilderPage = observer(() => {
    const { dashboard } = useStore();

    useEffect(() => {
        dashboard.setActiveTab(DBOT_TABS.BOT_BUILDER);
        return () => {};
    }, [dashboard]);

    return (
        <div>
            <div className='nx-section-head'>
                <div>
                    <h2>Bot Builder</h2>
                    <p>Drag-and-drop visual strategy builder powered by Blockly</p>
                </div>
            </div>
            <div className='nx-embed nx-embed--builder'>
                <p style={{ color: 'var(--ln-text-muted)', padding: 24, textAlign: 'center' }}>
                    The Blockly workspace is active. Use the toolbar above to build your strategy, then click Run to execute.
                </p>
            </div>
            <RunPanel />
        </div>
    );
});

export default BotBuilderPage;
