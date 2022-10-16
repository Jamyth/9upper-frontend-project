import { createApp, async } from 'react-shiba';
import { ErrorHandler } from 'util/ErrorHandler';

const Component = async(() => import('module/main'), 'MainComponent');

createApp({
    entryElement: document.getElementById('app'),
    Component,
    withReactRouter: false,
    errorHandler: new ErrorHandler()
})