import React from 'react';
import propTypes from 'prop-types';

import Box from "@material-ui/core/Box";

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { my3, mr3 } from 'margin';
import { floatr } from 'float';

const actionCss = css({
    display: 'inline-flex',
    '& > div': css({},mr3)
}
,floatr,my3);

const renderActionByPublicity = (isPublished, isProgressing, withdraw, publish) => {
    const wrapButtonCreation = (label, handleClick) =>
        <ProgressButton label={label} handleClick={handleClick} isProgressing={isProgressing} />;
    if (isPublished) {
        return wrapButtonCreation('Withdraw', withdraw);
    }
    else {
        return wrapButtonCreation('Publish', publish);
    }
};

const commitActionArea = ({
        schedules, isPublished, isProgressing,
        save, withdraw, publish
    }) => {
    if (!schedules || schedules.length == 0) return (<></>);

    const button = renderActionByPublicity(isPublished, isProgressing,
        () => withdraw(schedules), () => publish(schedules));
    return (
        <Box css={actionCss}>
            <ProgressButton label={'Save'} handleClick={() => save(schedules)}
                isProgressing={isProgressing} color="primary" />
            {button}
        </Box>
    );
};

commitActionArea.propTypes = {
    schedules: propTypes.object,
    isPublished: propTypes.bool,
    isProgressing: propTypes.bool,
    save: propTypes.func.isRequired,
    withdraw: propTypes.func.isRequired,
    publish: propTypes.func.isRequired,
};

export default commitActionArea;