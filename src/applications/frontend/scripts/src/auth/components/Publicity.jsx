import React from 'react';

import Typography from "@material-ui/core/Typography";

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { px5, py4 } from 'padding';
import { m4, mt5, mb4, mb5, ml5 } from "margin";

const jumbotronCss = css({
    backgroundColor: 'lightslategray',
    color: 'white',
    borderRadius: '.3rem'
},px5,py4,mt5,mb4);

const publicity = () => (
    <div css={jumbotronCss}>
        <Typography variant="h1" css={mb5}>Work Scheduler</Typography>
        <div css={m4}>
            <Typography variant="h4">With this application all Administrators can be FREE of a bothering task.</Typography>
            <Typography variant="h4">And each User can ask what they require on their schedule.</Typography>
        </div>
        <div css={css(m4, ml5)}>
            <Typography variant="body1">This application provide auto work schedule making process.</Typography>
            <Typography variant="body1">Every operator can ask their requires like holiday.</Typography>
            <Typography variant="body1">Also administrator can set operators relationships and their skills.</Typography>
        </div>
    </div>
);

export default publicity;