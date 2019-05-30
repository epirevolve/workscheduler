import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const cardCss = {
    width: "100%",
    minWidth: 120,
    maxHeight: 320,
    minHeight: 320
}

const actionAreaCss = {
    height: 320,
    display: 'block'
}

const titleCss = {
    color: 'lightslategray !important'
}

const contentCss = {
    color: 'gray !important'
}

const menuCard = ({title, img, description, href, onClick}) => {
    return (
        <Card css={css(cardCss)}>
            <CardActionArea href={href} onClick={onClick} css={css(actionAreaCss)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" css={css(titleCss)}>
                        {title}
                    </Typography>
                </CardContent>
                <CardMedia component="img" alt={title} title={title} height="190" image={img} />
                <CardContent>
                    <Typography gutterBottom component="p" css={css(contentCss)}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default menuCard;