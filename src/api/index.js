const URL = `http://nyx.vima.ekt.gr:3000/api/books`;

const fetchBooks = async (page, itemsPerPage, filters) => {
    const jsonData = {
        page,
        itemsPerPage,
        ...(filters !== undefined &&
            filters !== '' && {
                filters: [{ type: 'all', values: [filters] }],
            }),
    };
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(jsonData),
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

export { fetchBooks };
