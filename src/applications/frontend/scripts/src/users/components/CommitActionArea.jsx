import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mr1 } from 'margin';

const commitActionArea = ({ user, isAppend, close, activate, inactivate, resetPassword, save }) => (
    <>
        <Button onClick={close} color="default" css={mr1}>
            Close
        </Button>
        {(() => {
            if (!user.isInactivated)
                return (
                    <>
                        {!isAppend && (
                            <>
                                <Button onClick={() => inactivate(user.id)} variant="outlined" color="secondary" css={mr1}>
                                    Inactivate
                                </Button>
                                <Button onClick={() => resetPassword(user.id)} variant="outlined" color="secondary" css={mr1}>
                                    Reset Password
                                </Button>
                            </>
                        )}
                        <Button onClick={() => save(user, isAppend)} variant="outlined" color="primary">
                            Save
                        </Button>
                    </>);
            else {
                return (
                    <Button onClick={() => activate(user.id)} variant="outlined" color="secondary" css={mr1}>
                        Activate
                    </Button>
                );
            }
        })()}
    </>
);

commitActionArea.propTypes = {
    user: propTypes.object,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    activate: propTypes.func.isRequired,
    inactivate: propTypes.func.isRequired,
    resetPassword: propTypes.func.isRequired,
    save: propTypes.func.isRequired
};

export default commitActionArea;