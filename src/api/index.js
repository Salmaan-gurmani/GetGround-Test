// get your own key from unsplash please 😇
// const KEY =
//     '?client_id=5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';
const URL = `http://nyx.vima.ekt.gr:3000/api/books`;

const fetchBooks = async (page, itemsPerPage, filters) => {
    // console.log('page:', page, itemsPerPage, filters);
    const jsonData = {
        page,
        itemsPerPage,
        ...(filters !== undefined &&
            filters !== '' && {
                filters: [{ type: 'all', values: [filters] }],
            }),
    };
    // console.log('jsonPage:', jsonData);
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
