import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import PropTypes from "prop-types";
import CardActionArea from "@material-ui/core/CardActionArea";
import DeleteConfirmAlert from "./DeleteConfirmAlert";
import axios from 'axios';

function CompanyCardView(props) {
    const handleDelete = () => {
        const url = `http://127.0.0.1:8000/company/${props.pk}`;
        const redirect = '/home';
        axios.delete(url).then(response => {
            props.history.push(redirect);
        }).catch(error => console.error(error));
    };
    return (
        <Card className='CompanyCard'>
            <CardActionArea
                href={'company/' + props.pk}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    className='CardMedia'
                    image={props.imageSource}
                    title={props.imageTitle}
                />
                <CardContent className='CardContent'>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.companyName}
                    </Typography>
                    <Typography>
                        email: {props.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <DeleteConfirmAlert model='Company' confirmHandle={handleDelete}/>
                <Button href={'/company/' + props.pk + '/edit'}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

CompanyCardView.propTypes = {
    imageSource: PropTypes.string.isRequired,
    imageTitle: PropTypes.string,
    companyName: PropTypes.string.isRequired,
    pk: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
};

CompanyCardView.defaultProps = {
    imageTitle: ""
};

export default CompanyCardView;