import React from 'react';
import {useModuleMainState} from 'module/main/hooks';
import { actions } from 'module/main/index';
import './index.less'

export const GameScreen = React.memo(() => {
    const isGameStarted = useModuleMainState(state => state.isGameStarted);
    const isHost = useModuleMainState(state => state.isHost);
    const players = useModuleMainState(state => state.players);
    return isGameStarted ? null : (
        <div id="waiting-lobby">
            <h2>已有 {players.length} 位玩家</h2>
            {isHost ? <button onClick={actions.startGame}>開始遊戲</button> : (
                <h3>等待房主開始</h3>
            )}
        </div>
    )

})