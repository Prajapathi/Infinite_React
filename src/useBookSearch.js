import { useEffect, useState } from 'react';
import axios from 'axios';

const useBookSearch = (query, pageNumber) => {

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [books, setbooks] = useState([]);
    const [hasMore, sethasMore] = useState(false);

    useEffect(() => {
        setbooks([])
    }, [query])

    useEffect(() => {
        setloading(true)
        seterror(false)
        let cancel;

        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setbooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
            })
            sethasMore(res.data.docs.length > 0)
            setloading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            seterror(true)
        })

        return () => cancel()
    }, [query, pageNumber])

    return { loading, error, books, hasMore }
}

export default useBookSearch;