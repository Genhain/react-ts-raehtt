import * as React from 'react';
import './style.css';
import { searchBeers } from './beers';
import { useState } from "react";
import { useDebounce } from "./useDebounce"

export default function App() {
  const onChange = (value: string) => searchBeers(value, result => {
    setSearchedBeers(result)
  })

  const debounce = useDebounce({ callback: onChange })

  const [searchTerm, setSearchTerm] = useState("")
  const [searchedBeers, setSearchedBeers] = useState<string[]>([]);
  const beerList: React.ReactNode = <ul>{ searchedBeers.map(x =>  <li key={x}>{x}</li> ) }</ul>
  

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debounce(event.target.value)
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

