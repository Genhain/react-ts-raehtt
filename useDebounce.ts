import { debounce, DebounceSettings } from 'lodash'
import { useRef } from 'react'

interface DebouncedArgs<T> {
  delay?: number
  callback?: (value: T) => void
  debounceSettings?: DebounceSettings
}

export const useDebounce = <T = unknown>({ callback, debounceSettings, delay = 700 }: DebouncedArgs<T>) => {
  const dispatchValue = (value: T) => callback?.(value)

  const setValueDebounced = useRef(debounce(dispatchValue, delay, { ...debounceSettings, maxWait: debounceSettings?.maxWait || 1400 }))

  return (value: T) => setValueDebounced.current(value)
}