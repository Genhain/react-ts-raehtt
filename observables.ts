import * as React from 'react';
import { debounceTime, defer, distinctUntilChanged, filter, fromEvent, map, Observable, share, switchMap } from "rxjs"
import { concatMap } from 'rxjs/operators';
import { searchBeers } from "./beers"

export const input$ = defer(() => fromEvent(document.getElementById('input')!, 'keyup').pipe(map(x => (x.target as HTMLInputElement).value)))

export const searchBeers$ = (term: string) => new Observable<string[]>(obs => {
  searchBeers(term, result => {
    obs.next(result)
    obs.complete()
  })
  
  return () => console.log("clean up")
})

export const typeAheadFilteredText$ = input$.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  filter(x => x.length > 0 ),
  share()
)

export const searchedBeers$ = typeAheadFilteredText$.pipe(switchMap(searchBeers$))
export const hasBeganSearching$ = typeAheadFilteredText$.pipe(map(() => true))
export const hasFinishedSearching$ = searchedBeers$.pipe(map(() => false))
export const emptySearch$ = input$.pipe(filter(x => x.length === 0), map(() => []))
export const noBeersOfThatTerm$ = searchedBeers$.pipe(filter(x => x.length == 0),map(() => ["No beers :("]))

export const useObservable = (observable: Observable<any>, setter: React.Dispatch<React.SetStateAction<any>>) => {
  React.useEffect(() => {   
    let sub = observable.subscribe(setter)
    return () => sub.unsubscribe()
  }, [observable, setter])
}