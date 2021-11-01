import React from 'react';
import Table, { PaginationItems } from '../BooksLibrary';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));
configure({ adapter: new Adapter() });
const defaultPropsTableComponent = {
    loading: false,
    data: {
        books: [
            {
                book_author: ['Ανώνυμος'],
                book_pages: 104,
                book_publication_city: 'Βενετία',
                book_publication_country: 'Ιταλία',
                book_publication_year: 1529,
                book_title: 'Ο Αλέξανδρος ο Μακεδών',
                id: 2086,
            },
            {
                book_author: ['Ανώνυμος'],
                book_pages: 32,
                book_publication_city: 'Βενετία',
                book_publication_country: 'Ιταλία',
                book_publication_year: 1548,
                book_title:
                    'Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου',
                id: 2060,
            },
        ],
        count: 2000,
    },
    handleQueryParameters: jest.fn(),
};
const loadingEnabledProps = {
    loading: true,
    data: {},
    handleQueryParameters: jest.fn(),
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        pageNumber: 2,
    }),
}));

describe('<Table />', () => {
    it('should render TableComponent with default values', () => {
        const wrapper = shallow(<Table {...defaultPropsTableComponent} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render TableComponent with loading', () => {
        const wrapper = shallow(<Table {...loadingEnabledProps} />);
        expect(wrapper).toMatchSnapshot();
    });
});
describe('<PaginationItems />', () => {
    const item = {
        type: 'page',
        page: 2,
        selected: false,
        disabled: false,
        color: 'primary',
        'aria-label': 'Go to page 2',
        shape: 'rounded',
        size: 'medium',
        variant: 'text',
    };
    it('should render PaginationItems with default values', () => {
        const wrapper = shallow(<PaginationItems item={item} />);
        expect(wrapper).toMatchSnapshot();
    });
});
