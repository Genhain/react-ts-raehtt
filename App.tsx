import * as React from 'react';
import './style.css';
import { searchBeers } from './beers';
import { useState } from "react";

import { Grid, List, TextField, ListItem   } from '@mui/material';
import { switchMap, concatMap, defer, exhaustMap, fromEvent, map, mergeMap, Observable, of, share, tap, Subscription, from, filter, distinctUntilChanged, debounceTime, observable } from 'rxjs';
import { JellyfishSpinner } from 'react-spinners-kit';

const style = {
  mt: 2,
  ml: 2,
  width: { sm: 200, md: 300 },
  backgroundColor: { xs: "aliceblue" },
  boxShadow: 6
};

const input$ = defer(() => fromEvent(document.getElementById('input')!, 'keyup').pipe(map(x => (x.target as HTMLInputElement).value)))

const searchBeers$ = (term: string) => new Observable<string[]>(obs => {
  searchBeers(term, result => {
    obs.next(result)
    obs.complete()
  })
  
  return () => console.log("clean up")
})

const typeAheadFilteredText$ = input$.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  filter(x => x.length > 0 ),
  share()
)

const searchedBeers$ = typeAheadFilteredText$.pipe(switchMap(searchBeers$))
const hasBeganSearching$ = typeAheadFilteredText$.pipe(map(() => true))
const hasFinishedSearching$ = searchedBeers$.pipe(map(() => false))
const emptySearch$ = input$.pipe(filter(x => x.length === 0), map(() => []))

const useObservable = (observable: Observable<any>, setter: React.Dispatch<React.SetStateAction<any>>) => {
  React.useEffect(() => {   
    let sub = observable.subscribe(setter)
    return () => sub.unsubscribe()
  }, [observable, setter])
}

export default function App() {

  const [searchedBeers, setSearchedBeers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useObservable(searchedBeers$, setSearchedBeers)
  useObservable(hasBeganSearching$, setIsLoading)
  useObservable(hasFinishedSearching$, setIsLoading)
  useObservable(emptySearch$, setSearchedBeers)
  
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

