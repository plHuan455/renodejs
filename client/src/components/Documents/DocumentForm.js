import DocumentChildrenContent from './DocumentChildrenContent.js';
import React, { useState, useEffect } from 'react';

function DocumentForm(props) {
    /** Props */
    const { type, data } = props;
    const dataFlag = data ? 1 : 0;

    /** State */
    const [CpCount, setCpCount] = useState([0])

    /** Effect */
    useEffect(() => {
        if (data) {
            var arr = data.children_parts.map((value, index) => {
                return index;
            })
            setCpCount([...arr]);
        }
    }, [data])

    /** Event Handler */
    function parentPartIconHandler(info, ps) {
        var copyCpCount = [...CpCount]
        if (info === 'sub') {
            copyCpCount.splice(ps, 1);
            setCpCount(copyCpCount);
            return;
        }
        //info = addText
        copyCpCount.splice(ps + 1, 0, Math.max(...CpCount) + 1);
        setCpCount(copyCpCount);
    }

    /** Render */
    const childrenParts = CpCount.map((value, index) => {
        return (
            <DocumentChildrenContent key={value} CpIndex={index} data={data} parentPartIconHandler={parentPartIconHandler} />
        );
    });

    const action = dataFlag ? `/api/document/${data._id}/update?_method=PUT` : "/api/document/create";
    return (
        <form method="POST" action={action} className="doc__form">
            <div className="doc__form__head">
                <label className="item__label">Parent Part Title</label>
                <input name="parent_part_title" className="doc__form__input" type="text"
                    placeholder="Enter Parent Part Title"
                    autoComplete="off"
                    defaultValue={dataFlag ? data.parent_part.title : ""} />
            </div>
            {childrenParts}
            <div className="doc__form__btn-container doc__form__btn-container--right">
                <button name="type" value={type} type="submit" className="btn btn--secondary">Submit</button>
            </div>
        </form>
    )
}

export default DocumentForm;