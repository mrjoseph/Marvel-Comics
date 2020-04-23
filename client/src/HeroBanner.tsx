import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    height: '300px',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    padding: theme.spacing(10),
  },
}));

type charactorProps = {
    name: string
    id: string
    description: string
    thumbnail: {
        path:string
        extension: string
    }
}
const  MainFeaturedPost = ({ thumbnail: { path, extension} }: charactorProps) => {
  const classes = useStyles();

  return (
      <Fragment>
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${path}.${extension})` }}>
    </Paper>
    </Fragment>

  );
}

export default MainFeaturedPost;