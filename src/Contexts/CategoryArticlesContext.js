import React,{createContext, useEffect,useState} from 'react'
import axios from 'axios'
import usePageHook from '../hooks/usePageHook.js'

export const ArticleContext = createContext()
export const ArticlesContext = createContext()

let topHeadlinesURL = 'https://newsapi.org/v2/top-headlines'
let apiKey = process.env.REACT_APP_NEWS_API_KEY

export function ArticlesProvider(props) {
    const {value,setValue} = usePageHook()
    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        let category = JSON.parse(window.sessionStorage.getItem('pageCategory'))
        if(!isNaN(value)) {
            let fetchParams = () => {
                if(category) {
                    return {
                        category,
                        apiKey : apiKey,
                        country: 'in',
                        pageSize: 30
                    }
                }
                return {
                    apiKey : apiKey,
                    country: 'in',
                    pageSize: 30
                }
            }
            try {
                async function fetchArticles() {
                    let {data} = await axios.get(topHeadlinesURL,{
                        params : fetchParams()
                    })
                    setArticles(data.articles)
                }
                fetchArticles()
            } catch (error) {
                console.log(error)
            }
        }
    },[value])
    
    return(
        <ArticleContext.Provider value={{value,setValue}}>
            <ArticlesContext.Provider value={{articles,setArticles}}>
                {props.children}
            </ArticlesContext.Provider>
        </ArticleContext.Provider>
    )
}


