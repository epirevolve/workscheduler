import React from 'react';
import propTypes from 'prop-types';

import Box from "@material-ui/core/Box";

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt5, mr5, mb3 } from 'margin';

const actionAreaCss = css({
    display: 'inline-flex',
    '& > div': css({},mr5)
}
,mt5,mb3);

const commitActionArea = ({
        monthlySetting, isProgressing, save, publish
    }) => (
    <Box css={actionAreaCss}>
        <ProgressButton label={'Save'} isProgressing={isProgressing} handleClick={() => save(monthlySetting)} />
        <ProgressButton label={'Publish Calendar'} color="primary" isProgressing={isProgressing}
            handleClick={() => publish(monthlySetting)} />
    </Box>
);

commitActionArea.propTypes = {
    monthlySetting: propTypes.object,
    isProgressing: propTypes.bool,
    save: propTypes.func.isRequired,
    publish: propTypes.func.isRequired
};

export default commitActionArea;