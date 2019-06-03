import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

class Cell extends React.Component {
    constructor (props) {
        super(props);
        this.css = css({...props.css_,
            minWidth: '5rem',
            maxWidth: '5rem',
            padding: '1rem',
            textAlign: 'center'
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props["val"] !== nextProps["val"];
    }

    render () {
         const { val } = this.props;
         return (
            <TableCell css={this.css}>
                {val}
            </TableCell>
        );
    }
}

export default Cell;