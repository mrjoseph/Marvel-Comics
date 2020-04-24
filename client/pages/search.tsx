import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright } from '../src/Copyright';
import SearchList from '../src/SearchList';
import useStyles from '../src/styles';
import Logo from '../src/Logo';
import { SearchBarComponent } from '../src/Search';



const Search = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.root}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Marvel Comics 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Browse or search all of Marvel Comics characters
            </Typography>
            <SearchBarComponent />
          </Container>
        </div>
      <SearchList />
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

export default Search;