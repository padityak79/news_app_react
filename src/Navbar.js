import React,{useEffect,useContext,memo} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Trending from "@material-ui/icons/TrendingUp";
import Sports from "@material-ui/icons/SportsTennis";
import Entertainment from "@material-ui/icons/Tv"
import Business from "@material-ui/icons/BusinessCenter";
import Health from "@material-ui/icons/Filter9PlusSharp";
import Science from "@material-ui/icons/BookTwoTone";
import Technology from "@material-ui/icons/HeadsetMic";
import {withRouter} from 'react-router-dom'
import { ArticleContext } from "./Contexts/CategoryArticlesContext";
import {ArticlesContext} from './Contexts/CategoryArticlesContext'

const pages = ['trending','sports','entertainment','business','health','science','technology']
const pagesIcons = [<Trending />, <Sports/>, <Entertainment/>, <Business/>, <Health/>, <Science/>, <Technology/>]

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        margin: "auto",
        textAlign: "center"
    },
    Indicator: {
        height: 3,
        boxShadow: 'inset 0 0 6px rgba(0,0,255,.5)',
        transform: "scale(.8)"
    },
    Tab : {
        width: "20%", 
        fontWeight: "500", 
        fontSize: "1.05rem",
        [theme.breakpoints.down("sm")] : {
            width: "50%",
            fontSize: "1rem"
        },
        [theme.breakpoints.down("xs")] : {
            width: "50%",
            fontSize: ".7rem"
        }
    }
}))

function Navbar(props) {
    const classes = styles()
    const {location,history} = props
    const {value,setValue} = useContext(ArticleContext)
    const {articles,setArticles} = useContext(ArticlesContext)
    let currentValue = () => {
        const currentPath = location.pathname.slice(1)
        if(currentPath.split('/').length > 1) {
            return undefined
        }
        const pageIndex = pages.indexOf(currentPath)
        if(pageIndex !== -1) {
            return pageIndex
        }
        return 0
    }

    if(value !== currentValue || !currentValue) {
        setValue(currentValue)
    }

    useEffect(() => {
        setArticles([])
        const currentPath = location.pathname.slice(1)
        if(!isNaN(value) || currentPath.split('/').length <= 1) {
            window.sessionStorage.setItem('pageCategory',JSON.stringify(currentPath))
        }
    },[location.pathname])

    const handleChange = (event,newValue) => {
        setValue(newValue)
        setArticles([])
        if(newValue) {
            window.sessionStorage.removeItem('pageCategory')
            if(newValue >= 1) window.sessionStorage.setItem('pageCategory',JSON.stringify(`${pages[newValue]}`))
            history.push(`/${pages[newValue]}`)
        } 
        else {
            window.sessionStorage.removeItem('pageCategory')
            history.push('/')
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="none"
                    textColor="primary"
                    classes={{ indicator: classes.Indicator}}
                    aria-label="scrollable article navigation bar"
                >
                    {pages.map((page,idx) => 
                    <Tab 
                    className={classes.Tab} 
                    label={<span>{page}</span>} 
                    icon={pagesIcons[idx]}
                    key={idx}
                    />)}
                </Tabs>
            </AppBar>
        </div>
    )
}
   
export default withRouter(memo(Navbar))








