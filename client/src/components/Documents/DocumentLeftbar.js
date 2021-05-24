import './DocumentLeftbar.scss';
import React, { useState, useEffect } from 'react';

function DocumentLeftbar(props) {
    //State
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (props.query.type) {
            fetch(`/api/document?type=${props.query.type}`)
                .then(response => response.json())
                .then(value => {
                    if (value !== '') {
                        setLoaded(true);
                        setData(value);
                    }
                })
        }
    }, [props.query.type])

    if (isLoaded && data) {
        var content = data.map(value => {
            return (
                <div key={value._id} className="DocLeftbar__item">
                    {value.parent_part.title}
                </div>
            )
        });

        return (
            <div id="DocLeftbar" className="DocLeftbar">
                <div className="DocLeftbar__item">
                    <h2 className="DocLeftbar__item__title">
                        {props.query.type}
                    </h2>
                </div>
                {content}
            </div>
        )
    }
    return "";
}


export default DocumentLeftbar;