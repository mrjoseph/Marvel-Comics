import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
export const PaginationWrapper = ({ data: characterData, fetchMorePagination, currentPageNumber, limit }: any) => {
	if (!characterData)
		return null;
	const { characters: { data: { total } } } = characterData;
	const count = Math.ceil(total / limit);
	return (<Grid container spacing={0} direction="column" alignItems="center" justify="center">
		<Pagination page={currentPageNumber} count={count} onChange={(event: React.ChangeEvent<unknown>, page: number) => void fetchMorePagination(event, page)} />
	</Grid>);
};
