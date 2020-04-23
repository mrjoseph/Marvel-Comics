import React, { Fragment, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import { Loader } from '../src/Loader';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import useStyles from '../src/styles';
import Logo from '../src/Logo';
import MainFeaturedPost from '../src/HeroBanner';
import { Copyright } from '../src/Copyright';
import Typography from '@material-ui/core/Typography';

const CHARACTER_LIST_QUERY = gql`
  query Character($id: String) {
    character(id:$id) {
      data {
      results{
        name
        id
        description
        thumbnail {
          extension
          path
        }
        comics {
          available
          items {
            resourceURI
            name
          }
        }
        events{
          returned
          items{
            name
            resourceURI
          }
          available
          
        }
        stories{
          items {
            name
            resourceURI
          }
        }
      }
    }
    }
  }
`;

const Character = () => {
  const classes = useStyles();
  const router = useRouter();
  const [characterId, setId] = useState("");
  useEffect(()=> {
   
		if(router && router.query.id) {
			const { query: { id } } = router;
			let cid: any = (id) && id;
			setId(cid)
		
		}
	},[router]);
  const { loading, error, data: queryData } = useQuery(CHARACTER_LIST_QUERY,  {
    notifyOnNetworkStatusChange: true,
    variables: { 
        id: characterId, 
    }
}); 
if (error) return <p>error ...</p>;
if (loading) return <Loader />;
const { character: { data: { results }} } = queryData;
const { 
  description,
  stories: {
    items: storyItems
  },
  events: {
    items: eventItems
  },
  comics: { 
    items 
  }, 
  name,
  id 
} = results[0];
console.log(items)
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.root}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
          
      <main>
      <Container maxWidth="md">
      <MainFeaturedPost {...results[0]}/> 
      <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
      <Typography gutterBottom variant="h1" component="h1">
         {name}
      </Typography>
      <p>
      {description ? description : 'No description'}
      </p>

      <ListItems name="Stories" category={storyItems} type="Stories" id={id} />
      <ListItems name="Events" category={eventItems} type="Events" id={id} />
        </Grid>
        <Grid item xs={12} sm={4}>
        <ListItems name="Comics" category={eventItems} type="Comics" id={id} />
        </Grid>
      </Grid>
      </Container>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </Fragment>
  );
}
type ICategory = {
  resourceURI:string
  name:string
}
type IListItemProps = {
  name: string
  category: [ICategory]
  type: string
  id: string
  
}

const ListItems = ({name, category, type, id}: IListItemProps) => {
  return (
    <div>
      <Typography gutterBottom variant="h3" component="h3">
        {type}
      </Typography> 
      {category.length > 0 ? 
        <ul>
        {category.map(({ name, resourceURI }: any) => {
           return (
             <li key={`${name}-${id}`}> 
           <a href={resourceURI}>{name}</a>
             </li>
           )
          }) }
        </ul>
      : `No data for ${name}`
      }
    </div>
  )
}
export default Character;