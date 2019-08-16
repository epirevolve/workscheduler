import React from 'react';
import propTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cardCss = css({
    width: "100%",
    minWidth: 120,
    maxHeight: 320,
    minHeight: 320
});

const actionAreaCss = css({
    height: 320,
    display: 'block'
});

const titleCss = css({
    color: 'lightslategray !important'
});

const imageCss = css({
    width: '180px',
    height: '180px',
    marginLeft: '5vw'
});

const contentCss = css({
    color: 'gray !important'
});

const menuCard = ({ title, img, description, href, onClick }) => (
    <Card css={cardCss}>
        <CardActionArea href={href} onClick={onClick} css={actionAreaCss}>
            <CardContent>
                <Typography gutterBottom variant="h5" css={titleCss}>
                    {title}
                </Typography>
            </CardContent>
            <CardMedia alt={title} title={title} css={imageCss} image={img} />
            <CardContent>
                <Typography gutterBottom component="p" css={contentCss}>
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);

menuCard.propTypes = {
    title: propTypes.string.isRequired,
    img: propTypes.string.isRequired,
    description: propTypes.string,
    href: propTypes.string,
    onClick: propTypes.func
};

export default menuCard;