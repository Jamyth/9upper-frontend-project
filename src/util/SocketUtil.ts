import {io} from "socket.io-client";
import type {Socket} from "socket.io-client";

let socket: Socket | null = null;

function setup() {
    socket = io("localhost:3000");
    return socket;
}

function createSignal(fn: (client: Socket) => void) {
    if (!socket || !socket.connected) {
        throw new Error("[SocketUtil]: socket is not ready");
    }
    fn(socket);
}

function onConnect(fn: () => void) {
    return createSignal(socket => {
        socket.on('connect', () => {
            fn();
        })
    })
}

// Set the nickname before anything
function setNickname(nickname: string) {
    return createSignal((socket) => {
        socket.emit("set-nickname", nickname);
    });
}

function onSetNicknameError(callback: (errorMsg: string) => void) {
    return createSignal(socket => {
        socket.on('on-set-nickname-error', (errorMsg) => {
            callback(errorMsg);
        })
    })
}

function onMyNameSet(callback: (isHost: boolean, hostName:string) => void) {
    return createSignal(socket => {
        socket.on('on-my-name-set', (host) => {
            callback(socket.id === host.id, host.name);
        })
    })
}

// Eveyone will know each others' name
function onPlayerNameSet(callback: (info: { newPlayer: string, allPlayers: string[], host: string }) => void) {
    return createSignal((socket) => {
        socket.on("on-player-name-set", (response: { newPlayer: string, allPlayers: string[], host: string }) => {
            callback(response);
        });
    });
}

// Only host can start game
function startGame() {
    return createSignal((socket) => {
        socket.emit("start-game");
    });
}

// Everyone will know when the game starts
function onGameStart(callback: () => void) {
    return createSignal((socket) => {
        socket.once("on-game-start", () => {
            callback();
        });
    });
}

// Should listen after game start
function onIdentityReceived(callback: (identity: any) => void) {
    return createSignal((socket) => {
        socket.once("on-identity-received", (identity) => {
            callback(identity);
        });
    });
}

// Boardcast question to everyone
function onQuestionReceived(callback: (question: any) => {}) {
    return createSignal((socket) => {
        socket.once("on-question-received", (question) => {
            callback(question);
        });
    });
}

// Used to close answer
function onReadQuestionTimeout(callback: () => void) {
    return createSignal((socket) => {
        socket.once("on-read-question-timeout", () => {
            callback();
        });
    });
}

// Only Thinker can guess
function guessPlayer(playerName: string) {
    return createSignal((socket) => {
        socket.emit("guess-player", playerName);
    });
}

// Only thinker & picked player can receive the feedback
function onGuessResponse(callback: (isCorrect: boolean) => void) {
    return createSignal((socket) => {
        socket.on("on-guess-response", (isCorrect) => {
            callback(isCorrect);
        });
    });
}

export const SocketUtil = Object.freeze({
    setup,
    onConnect,
    setNickname,
    onSetNicknameError,
    onMyNameSet,
    startGame,
    onPlayerNameSet,
    onGameStart,
    onIdentityReceived,
    onQuestionReceived,
    onReadQuestionTimeout,
    guessPlayer,
    onGuessResponse,
});
