import React from 'react';
import propTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { lightslategray } from 'color';

const nameCss = css({
    marginTop: '1.25rem'
}, lightslategray);

const teamName = ({ team }) => (
    <Box css={nameCss}>
        <Typography variant="h5">
            {team.name}
        </Typography>
    </Box>
);

teamName.propTypes = {
    team: propTypes.object.isRequired
};

export default teamName;