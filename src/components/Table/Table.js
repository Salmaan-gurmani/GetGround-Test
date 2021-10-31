import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Link, useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const USER_PATH = '/user';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 1500,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function BooksLibrary({
    data,
    handleQueryParameters,
    isLoading,
}) {
    const { pageNumber } = useParams();
    const [page, setPage] = useState(pageNumber ? pageNumber : 1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searched, setSearched] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const queryParameters = {
            page: Number(page),
            itemsPerPage: rowsPerPage,
            filter: searched,
        };
        handleQueryParameters(queryParameters);
    }, [rowsPerPage, searched, page]);

    const handleChangePagination = (event, value) => {
        setPage(value);
    };
    const handleChangeRowsCount = event => {
        setRowsPerPage(event.target.value);
    };
    return (
        <>
            <Paper className={classes.table}>
                <SearchBar
                    value={searched}
                    onChange={searched => setSearched(searched)}
                    onCancelSearch={() => setSearched('')}
                />
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">ID</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Title
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Publication Year
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Publication Country
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Publication City
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Pages
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        Author
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.books &&
                                data.books.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.book_title}</TableCell>
                                        <TableCell>
                                            {row.book_publication_year}
                                        </TableCell>
                                        <TableCell>
                                            {row.book_publication_country}
                                        </TableCell>
                                        <TableCell>
                                            {row.book_publication_city}
                                        </TableCell>
                                        <TableCell>{row.book_pages}</TableCell>
                                        <TableCell>{row.book_author}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    flex={1}
                    padding={1}
                    paddingRight={10}
                >
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rowsPerPage}
                            onChange={handleChangeRowsCount}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination
                        page={Number(pageNumber)}
                        count={
                            data && data.count
                                ? Math.ceil(data.count / rowsPerPage)
                                : 1
                        }
                        shape="rounded"
                        color="primary"
                        showFirstButton
                        showLastButton
                        boundaryCount={2}
                        onChange={handleChangePagination}
                        renderItem={item => (
                            <PaginationItem
                                type={'start-ellipsis'}
                                component={Link}
                                selected
                                to={`${USER_PATH}/${item.page}`}
                                {...item}
                            />
                        )}
                    />
                </Box>
            </Paper>
            <br />
        </>
    );
}
