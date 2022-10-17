import {Module, register} from "react-shiba";
import {Main} from "./Main";
import {SocketUtil} from 'util/SocketUtil';
import {DateUtil} from '@iamyth/util';
import { Translator } from 'util/Translator';
import type {State, Path, Tab} from "./type";

const initialState: State = {
    socket: null,
    name: null,
    players: [],
    tab: 'main-screen',
    logs: [],
    isHost: false,
    isGameStarted: false
};

class ModuleMainModule extends Module<Path, State> {
    override onEnter() {
        const socket = SocketUtil.setup();
        this.setState({socket});
        socket.on("connect", () => {
            this.pushLog('Socket 已連接');
            SocketUtil.serverLog(msg => {
                this.pushLog(msg);
            })
            SocketUtil.onPlayerNameSet(({newPlayer, allPlayers}) => {
                this.pushLog(`${newPlayer} 已加入`);
                this.setState({players: allPlayers});
            });
            SocketUtil.onSetNicknameError((errorMsg) => {
                this.pushLog(errorMsg);
            })
            SocketUtil.onMyNameSet((isHost, hostName) => {
                this.pushLog('名稱已設置成功');
                if (isHost) {
                    this.pushLog("您是房主");
                } else {
                    this.pushLog(`${hostName} 是房主`)
                }
                this.setState({ isHost });
                this.changeTab('game');
            });
            SocketUtil.onGameStart(() => {
                this.pushLog("遊戲開始")
                this.setState({isGameStarted: true});
            });
            SocketUtil.onStartGameError(errorMsg => {
                this.pushLog(errorMsg);
            })
            SocketUtil.onIdentityReceived((identity) => {
                this.pushLog(`您的身份是 ${Translator.identity(identity)} `);
            })
        })
    }

    updateNickname(nickname: string) {
        this.setState({name: nickname});
    }

    sendNickname() {
        const nickname = this.state.name
        if (nickname) {
            SocketUtil.setNickname(nickname);
        }
    }

    changeTab(tab: Tab) {
        this.setState({tab});
    }

    startGame() {
        if(!this.state.isHost) {
            return;
        }
        SocketUtil.startGame();
    }

    private pushLog(info: string) {
        const date = DateUtil.format(new Date(), 'time');
        this.setState(state => {
            state.logs.push({date, info})
        })
    }
}

const moduleMainModule = register(new ModuleMainModule(null, initialState));
export const useState = moduleMainModule.getState();
export const actions = moduleMainModule.getActions();
export const MainComponent = moduleMainModule.attachLifecycle(Main);
