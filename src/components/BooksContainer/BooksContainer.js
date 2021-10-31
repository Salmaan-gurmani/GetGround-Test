import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../../actions';
import './styles.css';
import Books from '../Table/index';
class BooksContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: { page: 1, itemsPerPage: 20 },
        };
    }
    handleQueryParameters = state => {
        this.props.loadBooks(state);
        this.setState({ payload: state });
    };
    render() {
        const { isLoading, books, error } = this.props;
        return (
            <div className="content">
                <Books
                    data={books.response}
                    handleQueryParameters={this.handleQueryParameters}
                    isLoading={isLoading}
                />
                {error && <div className="error">{JSON.stringify(error)}</div>}
            </div>
        );
    }
}

const mapStateToProps = ({ isLoading, books, error }) => ({
    isLoading,
    books,
    error,
});

const mapDispatchToProps = dispatch => {
    return {
        loadBooks: payload => dispatch(loadBooks(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
