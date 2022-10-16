import React from 'react'
import {actions} from 'module/main';
import {useModuleMainState} from 'module/main/hooks';
import './index.less'

export const MainScreen = React.memo(() => {
        const nickname = useModuleMainState(state => state.name);

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            actions.updateNickname(e.target.value);
        }

        const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            actions.sendNickname();
        }

        return (
            <form onSubmit={onFormSubmit} id="main-screen">
                <h1>Test</h1>
                <input value={nickname ?? ''} onChange={onChange} placeholder="輸入名稱"/>
                <button type='submit'>加入</button>
            </form>
        )
    }
)