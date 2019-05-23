import React from 'react';

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import RowHeader from './RowHeader';

import { zip } from 'array-util'

class Row extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props["header"] !== nextProps["header"] ||
            zip(this.props["cells"], nextProps["cells"]).some(([x, y]) => x != y)
    }

    render () {
         const { header, cells, css_ } = this.props
         return (
            <TableRow css={css(css_)}>
                <RowHeader val={header} />
                {cells}
            </TableRow>
        )
    }
}

export default Row;