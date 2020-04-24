import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
export const PaginationWrapper = ({ data: characterData, fetchMorePagination, currentPageNumber, limit }: any) => {
	let total;
	if (!characterData)
		return null;
	if(characterData && characterData.characters) {
		total = characterData.characters.data.total;
	}
	if(characterData && characterData.search) {
		total = characterData.search.data.total;
	}
	const count = Math.ceil(total / limit);
	return (<Grid container spacing={0} direction="column" alignItems="center" justify="center">
		<Pagination page={currentPageNumber} count={count} onChange={(event: React.ChangeEvent<unknown>, page: number) => void fetchMorePagination(event, page)} />
	</Grid>);
};
