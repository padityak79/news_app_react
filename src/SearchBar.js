import React,{useState,useContext,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import NewsIcon from '@material-ui/icons/LibraryBooksTwoTone'
import { Link, withRouter} from 'react-router-dom'
import { SearchArticleContext } from "./Contexts/SearchArticlesContext.js"
import {SearchArticlesContext} from './Contexts/SearchArticlesContext'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      "& a":{
        fontFamily: "Cambria",
        color:"inherit",
        textDecoration: "none",
        fontWeight: "500"
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0,2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '25ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  }))

function SearchAppBar(props) {
    const classes = useStyles();
    let {history,location} = props
    let [value,setValue] = useState('')
    let {searchItem,setSearchItem} = useContext(SearchArticleContext)
    let {setArticles} = useContext(SearchArticlesContext)

    useEffect(() => {
        const currentPath = location.pathname.slice(1)
        if(currentPath.split('/').length > 1) {
          setArticles([])
            async function navigateBack() {
                await setValue(currentPath.split('/')[1])
                await setSearchItem(currentPath.split('/')[1])
            }
            navigateBack()
        } else{ 
            setValue('')
            setSearchItem('')
        }
    },[location.pathname])

    const onChange = (e)=> {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(value.length>=1 && value !== searchItem){
            setArticles([])
            history.push(`/relatedTo/${value}`)
            setSearchItem(value)
        }
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h5" noWrap>
                <Link to='/'>NEWS LIGHT <NewsIcon/></Link>
                </Typography>
                <form className={classes.search} onSubmit={handleSubmit}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    value={value}
                    placeholder="Search Here.."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={onChange}
                    />
                </form>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default withRouter(SearchAppBar)