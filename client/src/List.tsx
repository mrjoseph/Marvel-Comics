import React, { Fragment, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import useStyles from './styles';

import CharacterList from './CharacterList';
import { PaginationWrapper } from './PaginationWrapper';
const CHARACTERS_LIST_QUERY = gql`
query Characters($offset: Int, $limit:Int){
  characters(offset:$offset, limit:$limit) {
    data {
        count
        total
      results{
        name
        id
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

const List = () => {
	const limit = 60;
	const router = useRouter();
	const classes = useStyles();
	const [currentPageNumber, setQueryPage] = useState(1);

	useEffect(()=> {
		if(router && router.query.page) {
			
			const { query: { page } } = router;
			let pageNumber: any = (page) && page;
			setQueryPage(parseInt(pageNumber))
		
		}
	}, [router]);

	const { loading, error, data, fetchMore } = useQuery(CHARACTERS_LIST_QUERY,  {
			notifyOnNetworkStatusChange: true,
			variables: { 
					offset: 0, 
					limit 
			},
	}); 

	const fetchMorePagination = (event: React.ChangeEvent<unknown>, page:number):void => {
		event.preventDefault();
		let offset: number = 0;
		if(currentPageNumber === page) return;
	
		offset = limit * (page - 1);
	
		router.push({
			pathname:'/',
			query: {
				page
			}
		})
		fetchMore({
			variables: {
				offset,
				limit
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return fetchMoreResult
			}
		})
	};

	return(
		<Fragment>
				<PaginationWrapper fetchMorePagination={fetchMorePagination} data={data} currentPageNumber={currentPageNumber} limit={limit}/>
				<Container className={classes.cardGrid} maxWidth="md">
					<CharacterList error={error} loading={loading} data={data}/>
				</Container>
			<PaginationWrapper fetchMorePagination={fetchMorePagination} data={data} currentPageNumber={currentPageNumber} limit={limit}/>
		</Fragment>
	)
}

export default List