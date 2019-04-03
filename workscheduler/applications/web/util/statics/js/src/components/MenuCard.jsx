import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const menuCard = ({title, img, description, href}) => {
    return (
        <Card style={{ width: 300 }} className="m-2 p-3">
            <CardActionArea href={href}>
                <CardContent>
                    <Typography gutterBottom variant="h4" className="menuHeader">
                        {title}
                    </Typography>
                </CardContent>
                <CardMedia component="img" alt={title} title={title}
                    height="140" image={img} />
                <CardContent>
                    <Typography gutterBottom component="p" className="menuContent">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default menuCard;