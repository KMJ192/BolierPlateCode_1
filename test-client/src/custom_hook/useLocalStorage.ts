import { useState } from 'react'

// https://usehooks-typescript.com/react-hook/use-local-storage 
function useLocalStorage<T>(key: string, intialValue: T): [T, (value: T) => void] {
    //local storage의 json을 parsing, key값을 이용하여 Value return
    const readValue = () => {
        if(typeof window === 'undefined'){
            return intialValue;
        }
        try{
            //key에 맞는 값이 있을 경우 value를 return 없을 경우, parameter로 입력받은 값을 return
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : intialValue;
        }catch(e){
            return intialValue;
        }
    }

    //초기상태함수 저장
    const [storedValue, setStoredValue] = useState<T>(readValue);

    //새로운 값을 localStorage에 유지
    const setValue = (value: T) => {
        if(typeof window === 'undefined'){
            console.warn(`Tried setting localStorage key "${key}" even through environment is not a client`);
        }

        try{
            //param이 함수인지 아닌지 구분하여 넣어줌
            const newValue = value instanceof Function ? value(storedValue) : value
            window.localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
            window.dispatchEvent(new Event('local-storage'));
        }catch(e){
            console.warn(`Error setting localStorage key "${key}": `, e);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage
