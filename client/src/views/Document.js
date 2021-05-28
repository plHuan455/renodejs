import '../components/Documents/Document.scss';
import DocumentNavbar from '../components/Documents/DocumentNavbar.js';
import DocumentContent from '../components/Documents/DocumentContent.js';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

function Document(props) {
    /** Get Query */
    const getQuery = new URLSearchParams(useLocation().search);
    const query = { type: getQuery.get("type"), id: getQuery.get("id") };
    /** State */
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState('');
    /**  Effect */
    useEffect(() => {
        const { id, type } = query;
        var fetchApi = '/api/document';
        if (id && type) {
            fetchApi += `?id=${id}&type=${type}`;
        }
        else if (type) {
            fetchApi += `?type=${type}`;
        }
        fetch(fetchApi)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setIsLoaded(true);
                setData(response);
            });
    }, [query.id, query.type])
    /** Render */
    if (!isLoaded)
        return (
            <div>
                loading...
            </div>
        )
    if (!data && !data.success) {
        return (
            <div>
                {data.message}
            </div>
        )
    }
    return (
        <div>
            <DocumentNavbar types={data.types}></DocumentNavbar>
            <DocumentContent document={data.document}></DocumentContent>
        </div>
    )
}

export default Document;