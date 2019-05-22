import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class TotalCell extends React.Component {
    constructor(props) {
        super(props)
        this.css = {...props.css_,
            minWidth: '5rem',
            maxWidth: '5rem',
            padding: '1rem',
            textAlign: 'center'
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ["val", "state"].some(x => this.props[x] !== nextProps[x])
    }

    render () {
        const { val, state } = this.props
        let css_ = {...this.css};
        switch (state) {
            case 'over':
                css_ = {...this.css,
                    color: 'greenyellow'
                }
                break
            case 'under':
                css_ = {...this.css,
                    color: 'red'
                }
                break
            case 'excess':
                css_ = {...this.css,
                    color: 'deepskyblue'
                }
                break
        }

        return (
            <TableCell css={css(css_)}>
                {val}
            </TableCell>
        )
    }
}

export default TotalCell;