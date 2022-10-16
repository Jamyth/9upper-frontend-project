import React from 'react';
import {useModuleMainState} from 'module/main/hooks';
import './index.less'

export const Logger = React.memo(() => {
    const logs = useModuleMainState(state => state.logs);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const scrollHeight = containerRef.current?.scrollHeight ?? 100000;
        containerRef.current?.scroll(0, scrollHeight)
    }, [logs])

    return (
        <div id='logger' ref={container => containerRef.current = container}>
            {logs.map(({date, info}, index) => (
                <div key={index}>
                    <span>[{date}]</span>
                    <div>{info}</div>
                </div>
            ))}
        </div>
    )
})