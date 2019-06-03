import React from 'react';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const wrapperCss = css({
    marginTop: '4rem',
    marginBottom: '1rem',
    '& > div': {
        marginRight: '3rem'
    }
});

const commitMonthlySetting = ({ monthlySetting, handleSave, handlePublish }) => {
    return (
        <div css={wrapperCss}>
            <Button variant="contained" color="primary" size="large"
                onClick={() => handleSave(monthlySetting)}>
                Save
            </Button>
            <Button variant="contained" color="secondary" size="large"
                onClick={() => handlePublish(monthlySetting)}>
                Publish Calendar
            </Button>
        </div>
    )
}

export default commitMonthlySetting;