import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmAlert from "./DeleteConfirmAlert";
import {Button} from "@material-ui/core";
import '../styles/ArashCardView.css';

function ArashCardView(props) {
    return (
        <Card className='ArashCard'>
            <CardMedia
                className='CardMedia'
                image={props.imageSource}
                title={props.imageTitle}
            />
            <CardContent className={props.disabled ? 'disabled' : ''}>
                <Typography>
                    {/*TODO("Choose what to show")*/}
                    This is a media card. You can use this section to describe the content.
                </Typography>
            </CardContent>
            <CardActions className={props.disabled ? 'disabled' : ''}>
                <DeleteConfirmAlert model='Arash'/>
                <Button href={'/company/' + props.pk + '/edit-arash/' + props.apk}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

ArashCardView.propTypes = {
    imageSource: PropTypes.string.isRequired,
    imageTitle: PropTypes.string,
    pk: PropTypes.number.isRequired,
    apk: PropTypes.number.isRequired,
    disabled: PropTypes.bool
};

ArashCardView.defaultProps = {
    imageTitle: "",
    disabled: false
};

export default ArashCardView;