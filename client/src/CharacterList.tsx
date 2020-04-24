
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { withRouter } from 'next/router'
import { Loader } from './Loader';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';


interface ICharacterList {
    name: string
    id: string
    description: string
    thumbnail: {
        path:string
        extension: string
    }
}
type GridContainerProps = { 
    error: any
    loading: boolean
    data: any
}

const CharacterList = ({ error, loading, data: queryData }: GridContainerProps | any) => {
    const classes = useStyles();
    if (error) return <p>error ...</p>;
    if (loading) return <Loader />;
    let obj;
    if(queryData && queryData.characters) {
      obj = queryData.characters.data.results;
     
    }
    if(queryData && queryData.search) {
      obj = queryData.search.data.results;
     
    }
    
    return (
        <Grid container spacing={4}>
{obj.map((characterList:ICharacterList) => {
    const { id, name, description, thumbnail: { path, extension } } = characterList;
    return (
        <Grid item key={id} xs={12} sm={6} md={4}>
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
            <Typography gutterBottom>
            <Link href={{ pathname: '/character', query: { id } }}>
              <a className={classes.link}>View {name}</a>
            </Link>
            </Typography>
            </CardActions>
          </Card>
        </Grid>
      )
    })}
</Grid>)
}

export default withRouter(CharacterList);