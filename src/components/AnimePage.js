import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router';
import ReviewDialog from './ReviewDialogBox';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function AnimePage() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : '');
  const [anime, setAnime] = useState({});
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let history = useHistory();


  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { id } = useParams();

  const handleRefresh = () => {
    const value = !refresh;
    setAnime({});
    setRefresh(value);
}

  useEffect(() => {

    if(token) {
        const url = 'https://whispering-forest-98624.herokuapp.com/api/anime/byId/' + id + "/" + userId;
        axios.get(url, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
                }  ,
                changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    } 
        })
        .then(res => {

            console.log(res);
            if(res.status == 200) {
                if(res.data.anime_data == undefined) {

                    alert("anime data is not loaded");
                    return;
                }
                setReviews(res.data.anime_data.reviews);
                let concatenatedGenre = "";
                res.data.anime_data.genres.forEach(genre => {

                    concatenatedGenre = concatenatedGenre + genre + ",";
                }) 
                setGenres(concatenatedGenre);
                setAnime(res.data.anime_data);
            } else {

                setAnime({});
                alert("failed in loading data");
            }
        })
        .catch(error => {
            console.log(error);
            alert("something went wrong");
        });
    } else {
        history.push('/login');
    }

  }, []);

  const ReviewFuction = () => {

    if(reviews.length == 0) {

        return (
            <Typography color="secondary" variant = "h5"> 
                {anime.review_message}
            </Typography>
        )
    }
    else {
        return (reviews.map(review => {
            return (
              <Typography color="secondary" variant = "h5">
              Username : {review.author.username}
              <hr />
              rating : {review.rating}
              <hr/>
              comment : {review.comment}
              <hr/>
              <hr />
              </Typography>
            )
        }));
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography color="Primary" variant = "h3">
          {anime.title}
        </Typography>

        <img src = {anime.banner_image}/>
        <Typography color="Primary" variant = "h4">
          User Reviews : 
        </Typography>
          <ReviewFuction />
        <ReviewDialog handler = {handleRefresh} userId = {userId} token = {token} anilist_id = {anime.anilist_id}/>
        <Typography variant="h5" component="h2">
          {bull} {anime.description}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          genres
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {genres}
        </Typography>
        <img src = {anime.cover_image} className={classes.imageStyle}/>
        <Typography className={classes.pos} color="primary" variant="h4">
          Start Date : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {moment(anime.start_date).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          End Date : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {moment(anime.end_date).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          API Rating : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {anime.rating}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
            trailer_url : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {anime.trailer_url}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          season_year : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {anime.season_year}
        </Typography>
        <Typography className={classes.pos} color="primary" variant="h4">
          no_of_episodes : 
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          {anime.no_of_episodes}
        </Typography>
      </CardContent>
    </Card>
  );
}
