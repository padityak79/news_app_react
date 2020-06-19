import {useState} from 'react'

export default (newPageIndex) => {
    let [value,setValue] = useState(newPageIndex)
    return {
        value,
        setValue
    }
}