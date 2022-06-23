import * as React from 'react';
import { debounce } from 'lodash';
import './style.css';
import { beers } from './beers';
import { useState } from "react";

export default function App() {
  const [searchedBeers, setSearchedBeers] = useState<string[]>([]);
  const beerList: React.ReactNode = <ul>{ searchedBeers.map(x => { <li>{x}</li> }) }</ul>

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      searchBeers(event.target.value, result => {
        setSearchedBeers(result)
      })
    }, 1000)
  }
  
  const searchBeers = (searchTerm: string, callBack: (results: string[]) => void) => {
    setTimeout(() => {
      callBack(beers.filter(x => x.includes(searchTerm) ))
     }, 2000)
  }

  return (
    <div>
      <h1>It's beer o'clock!</h1>
      <p>type to search for your beer</p>
      <br/>
      <input onChange={onInput}/>
      <br/>
      {beerList}
    </div>
  );
}

