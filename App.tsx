import * as React from 'react';
import './style.css';
import { useState } from "react";
import { Grid, List, TextField, ListItem   } from '@mui/material';
import { JellyfishSpinner } from 'react-spinners-kit';
import { emptySearch$, hasBeganSearching$, hasFinishedSearching$, noBeersOfThatTerm$, searchedBeers$, useObservable } from './observables';

export default function App() {

  const [searchedBeers, setSearchedBeers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useObservable(searchedBeers$, setSearchedBeers)
  useObservable(emptySearch$, setSearchedBeers)
  useObservable(noBeersOfThatTerm$, setSearchedBeers)

  useObservable(hasBeganSearching$, setIsLoading)
  useObservable(hasFinishedSearching$, setIsLoading)

  
  
  const beerList: React.ReactNode = <List>{ searchedBeers.map(x =>  <ListItem key={x}>{x}</ListItem> ) }</List>

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    sx={{ minHeight: '100vh' }}
    >
      <h1>It's beer o'clock!</h1>
      <p>type to search for your beer</p>
      <br/>
      <TextField 
      autoComplete='off'
      id='input'
      sx={{
        ...style,
        mb: 2,
        mr: 2,
        border: "solid black 2px",
        "& .MuiFilledInput-input": { color: "white" }
      }}/>
      <br/>
      {isLoading ? <JellyfishSpinner/> : beerList}
    </Grid>
  );
}

const style = {
  mt: 2,
  ml: 2,
  width: { sm: 200, md: 300 },
  backgroundColor: { xs: "aliceblue" },
  boxShadow: 6
};


