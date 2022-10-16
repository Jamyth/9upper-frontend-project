import React from "react";
import {MainScreen} from './MainScreen';
import {GameScreen} from './GameScreen';
import {useModuleMainState} from '../hooks';
import {Logger} from './Logger';
import "css/index.less";
import "./index.less";

export const Main = React.memo(() => {
    const tab = useModuleMainState(state => state.tab);

    const renderTab = () => {
        switch (tab) {
            case 'main-screen':
                return <MainScreen/>;
            case "game":
                return <GameScreen/>;
        }
    }

    return <div id='module-main'>
        <Logger/>
        {renderTab()}
    </div>;
});
