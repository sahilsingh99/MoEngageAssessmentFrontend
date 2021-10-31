import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import useState from 'react';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  imageStyle: {
    alignSelf: 'center',
    height:'100%', 
    width:'100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  content: {
    margin : "0%",
    paddingBottom : "5px"
  },
//   title: {
//     fontSize: 14,
//   },
  pos: {
    marginBottom: 4,
  },
});

export default function AnimeCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  let history = useHistory();
  const anime = props.anime;
  let genres = "";

  anime.genres.forEach(genre => {

    genres = genres + genre + ',';
  })

  function submitHandler() {

    if(anime.anilist_id != undefined)
    {let url = "/anime/" + anime.anilist_id;
    history.push(url);}
    else {
      alert("try again");
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography color="Primary" variant = "h3">
          {anime.title}
        </Typography>
        <img src = {anime.banner_image} className={classes.imageStyle}/>
        <Typography variant="h5" component="h2">
          {bull} {anime.description}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          Genres
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {genres}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h5">
          Rating : {anime.rating}
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          Trailer_url : {anime.trailer_url}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h5">
          Season_year : {anime.season_year}
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          no_of_episodes : {anime.no_of_episodes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color = "primary" onClick = {submitHandler}>See More..</Button>
      </CardActions>
    </Card>
  );
}
