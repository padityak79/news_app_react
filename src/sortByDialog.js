import React, {useState ,useEffect,useContext} from 'react'
import {withRouter} from 'react-router-dom'
import { SearchArticleContext } from "./Contexts/SearchArticlesContext.js"
import { SearchArticlesContext } from "./Contexts/SearchArticlesContext.js"
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Check from '@material-ui/icons/Check'
import { blue } from '@material-ui/core/colors'
import Filter from '@material-ui/icons/ListAlt'


const sortCatogories = ['relevancy','published At','popularity']
const sortKeys = ['relevancy','publishedAt','popularity']
const useStyles = makeStyles( theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: "white",
  },
  Dialog: {
      marginLeft: ".2rem",
      "& button:hover": {
          transform: "translateY(-.1rem) Scale(1.02)"
      }
  },
  openDialog: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: ".2rem .3rem"
  },
  container: {
      margin: "0 auto",
      height: "80vh",
      width: "80vw",
      [theme.breakpoints.up('sm')]: {
        height: "50vh",
        width: "50vw"
      }
  },
  selected: {
      backgroundColor: "rgba(0,0,0,.2)"
  }
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={'xs'} classes={{ root : classes.openDialog, container: classes.container}}>
            <DialogTitle id="simple-dialog-title">Sort By</DialogTitle>
            <List>
                {sortCatogories.map((category) => (
                <ListItem button onClick={() => handleListItemClick(category)} key={category} className={category === selectedValue && classes.selected}>
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        {category === selectedValue && <Check />}
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={category} />
                </ListItem>
                ))}
            </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SortByDialog(props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(sortKeys[0]);
  const classes = useStyles()
  const {location} = props
  const {setSortBy} = useContext(SearchArticleContext)
  const {setArticles} = useContext(SearchArticlesContext)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    if(value !== selectedValue) {
        const key = sortKeys.filter(k => k.includes(value.split(' ')[0]))
        setArticles([])
        setSortBy(key)
    }
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(()=> {
    setSortBy(sortKeys[0])
    setSelectedValue(sortKeys[0])
  },[location.pathname])

  return (
    <div className={classes.Dialog}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <Filter />
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export default withRouter(SortByDialog)