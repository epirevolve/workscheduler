import React from 'react';

import { CSVLink } from "react-csv";

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

const renderActionByPublicity = (isPublished, isProgressing, onWithdrawSchedules, onPublishSchedules) => {
    const wrapButtonCreation = (label, handleClick) =>
        <ProgressButton label={label} handleClick={handleClick} isProgressing={isProgressing} />;
    if (isPublished) {
        return wrapButtonCreation('Withdraw', onWithdrawSchedules);
    }
    else {
        return wrapButtonCreation('Publish', onPublishSchedules);
    }
}

const commitActionArea = ({
        schedules, isPublished, isProgressing,
        onSaveSchedules, onWithdrawSchedules, onPublishSchedules
    }) => {
    if (!schedules || schedules.length == 0) return (<></>);

    const button = renderActionByPublicity(isPublished, isProgressing,
        () => onWithdrawSchedules(schedules), () => onPublishSchedules(schedules));
    return (
        <div css={actionCss}>
            <ProgressButton label={'Save'} handleClick={() => onSaveSchedules(schedules)}
                isProgressing={isProgressing} color="primary" />
            {button}
        </div>
    );
};

export default commitActionArea;