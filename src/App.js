import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import './App.css';


function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API call to post the article using the MediaWiki API
    // Replace 'API_ENDPOINT' with the actual API endpoint for posting articles

    const data = {
      action: 'edit',
      format: 'json',
      title,
      text: content,
      token: process.env.MEDIA_WIKI_TOKEN // Replace 'edit_token' with the actual edit token
    };

    fetch('https://en.wikinews.org/w/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response
        console.log(result);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <Grid justify="center" spacing={2} style={{margin:40}}>
      <h1>Post the Wiki News</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Content"
          value={content}
          onChange={handleContentChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Grid>
  );
}

export default App;
