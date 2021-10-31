import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function PostFormDialog(props) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  }

  const handleComment = (e) => {
    setComment(e.target.value);
  }
  


  const handleSubmit = (e) => {
      e.preventDefault();
      if(rating == '' || comment == '') {
          alert('enter all require fields');
          return;
      }
      const url = 'https://whispering-forest-98624.herokuapp.com/api/anime/add/review/' + props.anilist_id + "/" + props.userId;
        axios.post( url, {
        rating : rating,
        comment : comment,
    },{
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${props.token}`
          }  ,
          changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    } 
    })
    .then(res => {
      if(res.status === 201) {
        alert("review successfully added");
        props.handler();
      } else {
        alert(" error in adding review ");
      }
    })
    .catch(err => {
      console.log(err);
      alert("error", err);
    })
    setOpen(false);
  }

  return (
    <div>
      <Button size = "Large" variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Review.
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all details to add Review.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            input = {rating}
            onChange = {handleRating}
            fullWidth
            required
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            type="text"
            input = {content}
            onChange = {handleContent}
            fullWidth
          /> */}
            {/* <TextEditor handleContent = {handleContent}/> */}
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            input = {comment}
            onChange = {handleComment}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}