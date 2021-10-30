import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import { IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';
import AnimeCard from './components/AnimeCard';
import SearchBar from 'material-ui-search-bar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  listRoot: {
    width : "80%",
    marginLeft : "10%"
  }
}));



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : '');
  const [allAnimes, setAllAnimes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [titleSearch, setTitileSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState("");

  const handleRefresh = () => {
      const value = !refresh;
      setAllAnimes([]);
      setRefresh(value);
  }

  const logoutHandler = () => {
    axios.get('http://localhost:3000/api/auth/logout')
    .then(res => {
      alert("logged Out :)");
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      history.push('/login');
    })
    .catch(err => {
      alert("failed to log out :(");
    })
  }

  const classes = useStyles();

  let history = useHistory();
  useEffect(() => {
    console.log(token, userName, userId);
    if(token) {
      const url = 'http://localhost:3000/api/anime/' + userId;
      axios.get(
        url,
        {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
            }  
        }
      )
      .then(res => {
        console.log("res",res);
        if(res.status !== 200) {
          history.push('/login');
        }
      })
      .catch(err => {
        history.push('/login');
        console.log("err",err);
      })
    } else {
      history.push('/login');
    }
    
  },[refresh]);

  function handleTitleSearch(value) {

    console.log("here");
    console.log(token);
    const url = 'http://localhost:3000/api/anime/' + userId;
    axios.post(url, {title : titleSearch,
      genre : ""}, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }  
    })
    .then(res => {

      console.log(res);

      if(res.status == 200) {

        console.log(res);
        setAllAnimes(res.data.anime_data);
      } else {

        setAllAnimes([]);
        alert("no Animes found with this title");
      }
    })
    .catch(err => {

      alert("No Animes found with this title");
    })

  }

  function handleGenreSearch(value) {


    const url = 'http://localhost:3000/api/anime/' + userId;
    axios.post(url, {title : genreSearch,
      genre : ""}, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }  
    })
    .then(res => {

      if(res.status == 200) {

        console.log(res);
        setAllAnimes(res.data.anime_data);
      } else {

        setAllAnimes([]);
        alert("no Animes found with this title");
      }
    })
    .catch(err => {

      alert("No Animes found with this title");
    })

  }

  return (
    <Container maxWidth="md">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Animes
          </Typography>
          <Button color="inherit" onClick = {logoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>
      {/* <FormDialog handler = {handleRefresh} userId = {userId} token = {token}/> */}
      Search By Title
      <SearchBar
      value={titleSearch}
      onChange={(newValue) => setTitileSearch(newValue)}
      onRequestSearch={() => handleTitleSearch(titleSearch)}
    />
      Search By genre
      <SearchBar
      value={genreSearch}
      onChange={(newValue) => setGenreSearch(newValue)}
      onRequestSearch={() => handleGenreSearch()}
    />
      <List className = {classes.listRoot}>
        {
          allAnimes.map(anime => {
              return (<AnimeCard anime = {anime} userId = {userId} token = {token} handler = {handleRefresh}/>)
          })
        }
      </List>
    </Container>
  );
}

export default App;
