import type {Socket} from 'socket.io-client';
import type {Question, Identity} from 'util/SocketUtil';

export type Path = never;

export type Tab = 'main-screen' | 'game';

export interface Log {
    date: string;
    info: string;
}

export interface State {
    socket: Socket | null;
    name: string | null;
    players: string[];
    tab: Tab;
    logs: Log[];
    isHost: boolean;
    isGameStarted: boolean;
    question: Question | null;
    identity: Identity | null;
    countdown: number | null;
}
