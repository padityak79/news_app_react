import React , {createContext, useState, useEffect} from 'react'
import axios from 'axios'
export const SearchArticleContext = createContext()
export const SearchArticlesContext = createContext()
let searchURL = 'https://newsapi.org/v2/everything'
let apiKey = process.env.REACT_APP_NEWS_API_KEY

export function SearchArticleProvider(props) {
    let [searchItem, setSearchItem] = useState('')
    let [articles, setArticles] = useState([])
    let [sortBy,setSortBy] = useState('relevancy')
    useEffect(() => {
        if(searchItem.length) {
            let fetchParams = () => {
                return {
                    q : searchItem,
                    qInTitle : searchItem, 
                    apiKey : apiKey,
                    sortBy: sortBy,
                    pageSize: 50
                }
            }
            try {
                async function fetchArticles() {
                    let {data} = await axios.get(searchURL,{
                        params : fetchParams()
                    })
                    console.log(data)
                    setArticles(data.articles)
                }
                fetchArticles()
            } catch (error) {
                console.log(error)
            }
        }
    },[searchItem,sortBy])
    return(
        <SearchArticleContext.Provider value={{searchItem,setSearchItem,setSortBy}}>
            <SearchArticlesContext.Provider value={{articles,setArticles}}>
                {props.children}
            </SearchArticlesContext.Provider>
        </SearchArticleContext.Provider>
    )
}