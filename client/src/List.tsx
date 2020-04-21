import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useStyles from './styles';
import { Loader } from './Loader';
const CHARACTER_LIST_QUERY = gql`
query {
  characters {
    data {
      results{
        name
        description
        thumbnail{
          path
          extension
        }
      }
    }
  }
}
`;


interface ICharacterList {
    name: string
    description: string
    thumbnail: {
        path:string
        extension: string
    }
}
const List = () => {
    const classes = useStyles();
    const { loading, error, data:queryData } = useQuery(CHARACTER_LIST_QUERY);
    if (error) return <p>error ...</p>;
    if (loading) return <Loader />;
    const { characters: { data: { results }} } = queryData;
    return(
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {results.map((characterList:ICharacterList) => {
                const { name, description, thumbnail: { path, extension } } = characterList;
                return (
                    <Grid item key={name} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`${path}.${extension}`}
                          title={name}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {name}
                          </Typography>
                          <Typography>
                            {description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            View
                          </Button>
                          <Button size="small" color="primary">
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
            })}
          </Grid>
        </Container>
    )
}

export default List