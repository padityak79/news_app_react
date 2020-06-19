import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinesEllipsis from 'react-lines-ellipsis'

const styles = makeStyles(theme => ({
    root: {
      width: "90%",
      margin: "1.5rem auto",
      transition: "all .1s ease-in-out",
      "&:hover" : {
        boxShadow: "inset -.1rem -.15rem 0 .1rem rgba(0,0,0,.2)",
        transform: "translateY(-.1rem) scale(1.02)"
      },
      "& a:link,a:active,a:visited": {
          textDecoration: "none",
          color: "inherit"
      },
      [theme.breakpoints.down('xs')]: {
        width: "95%"
      }
    },
    media: {
      height: 150,
    },
    newsTitle: {
      width: "100%",
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('xs')]: {
        fontSize:".7rem"
      }
    },
    newsSource: {
      [theme.breakpoints.down('xs')]: {
        fontSize:".6rem"
      }
    }
}))

function NewsCard(props) {
  const classes = styles()
    const {article} = props;
  
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${article.urlToImage}`}
            title="News Related Image"
          />
          <CardContent>
            <Typography gutterBottom variant="body2" component="h6" className={classes.newsTitle}>
                <LinesEllipsis
                    text={article.title}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    fontSize=".7rem"
                />
            </Typography>
            
            <Typography variant="body3" color="textSecondary" component="p" className={classes.newsSource}>
                <LinesEllipsis
                    text={<span>source: {article.source.name} &amp; author: {article.author ? article.author.slice(0,41) + '...' : 'unknown'}</span>}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    fontSize=".6rem"
                />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="outlined">
            <a href={article.url} target="_blank">View Article &rarr; </a>
          </Button>
        </CardActions>
      </Card>
    );
  }

export default NewsCard