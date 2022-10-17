import {Identity} from './SocketUtil';

function identity(type: Identity): string {
    switch (type) {
        case Identity.NINE_UPPER:
            return "9 Upper";
        case Identity.REAL_UPPER:
            return "老實人";
        case Identity.THINKER:
            return "諗樣"
    }
}

export const Translator = Object.freeze({
    identity,
})