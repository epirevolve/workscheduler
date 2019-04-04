import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const menuCard = ({title, img, description, href, onClick}) => {
    return (
        <Card style={{ width: "100%", minWidth: 120, maxHeight: 320, minHeight: 320 }}>
            <CardActionArea href={href} onClick={onClick}>
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