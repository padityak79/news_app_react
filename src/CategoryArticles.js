import React,{useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ArticlesContext} from './Contexts/CategoryArticlesContext'
import NewsCard from './NewsCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "90%",
    paddingTop: theme.spacing(3),
    margin: "0 auto"
  },
  Loader: {
    marginTop: "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

function Articles(props) {
  const {classes} = props
  const {articles} = useContext(ArticlesContext)
  return (
    articles.length ? 
    (<div className={classes.root}>
        <Grid container spacing={1}>
            {articles.map((article,idx) => {
                return (
                <Grid item xs={12} md={6} key={idx}>
                    <NewsCard article={article} />
                </Grid>
                )
            })}
        </Grid>
    </div>) : 
    (
      <div className={classes.Loader}>
        <CircularProgress />
      </div>
    )
  );
}

export default withStyles(styles)(Articles)