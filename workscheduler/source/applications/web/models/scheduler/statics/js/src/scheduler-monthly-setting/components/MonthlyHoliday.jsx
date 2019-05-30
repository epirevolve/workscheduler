import React from 'react';

import TextField from '@material-ui/core/TextField';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const wrapperCss = css({
	marginTop: '1rem !important',
    marginBottom: '0.5rem !important',
})

const monthlyHoliday = ({ holidays, onChange }) => {
    return (
        <TextField type="number" onChange={onChange} value={holidays}
            label="holidays" InputProps={{ min:"0" }} css={wrapperCss} />
    )
};

export default monthlyHoliday;