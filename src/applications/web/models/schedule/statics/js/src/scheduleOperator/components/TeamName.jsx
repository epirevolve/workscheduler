import React from 'react';

import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { lightslategray } from 'color';

const nameCss = css({
    marginTop: '1.25rem'
},lightslategray);

const teamName = ({ team }) => (
    <Typography variant="h5" css={nameCss}>
        {team.name}
    </Typography>
);

export default teamName;