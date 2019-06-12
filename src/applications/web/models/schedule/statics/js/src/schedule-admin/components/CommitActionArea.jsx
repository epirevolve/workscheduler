import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt5, mr3, mr5, mb3 } from 'margin';
import { floatl, floatr } from 'float';

const actionCss = css({
	display: 'inline-flex',
	'& > div': css({},mr5)
}
,floatr);

const actionAreaCss = css({
	color: 'lightslategray !important',
},
mt5, mb3);

const renderActionByPublicity = (isPublished, isProgressing, onTerminateSchedules, onPublicSchedules) => {
    if (isPublished) {
        return <ProgressButton label={'Terminate'} handleClick={onTerminateSchedules} color="default"
            isProgressing={isProgressing} css={mr3} />;
    }
    else {
        return <ProgressButton label={'Publish'} handleClick={onPublicSchedules}
            isProgressing={isProgressing} css={mr3} />;
    }
}

const commitActionArea = ({
        schedules, isPublished, isProgressing,
        onSaveSchedules, onPublicSchedules, onTerminateSchedules
    }) => {
    const button = renderActionByPublicity(isPublished, isProgressing, onTerminateSchedules, onPublicSchedules);

    return (
        <div css={actionAreaCss}>
            <Typography variant="h5" css={floatl}>
                This schedule is {isPublished ? 'published' : 'not published'}.
            </Typography>
            <div css={actionCss}>
                <ProgressButton label={'Save'} handleClick={() => onSaveSchedules(schedules)}
                    isProgressing={isProgressing} color="primary" css={mr3} />
                {button}
            </div>
        </div>
    );
};

export default commitActionArea;