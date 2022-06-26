import {createStore} from 'redux';
import {changeContent} from './store-reducer';

export const store = createStore(changeContent);
