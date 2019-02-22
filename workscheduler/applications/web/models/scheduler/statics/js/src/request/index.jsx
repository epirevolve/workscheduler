import React from 'react';
import { render } from 'react-dom'

import Button from '@material-ui/core/Button';

import App from './components/App'

const $script = $('script[src*="request"]');

const url = $script.data('url');
const scheduleOf = new Date($script.data('scheduleOf'));
const scheduleOfName = $script.data('scheduleOfName');

render(
    <App />,
    document.getElementById('content')
)