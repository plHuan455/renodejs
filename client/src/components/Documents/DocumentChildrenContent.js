import React, { useState } from 'react';
import DocumentFormInput from './DocumentFormInput.js';

function DocumentChildrenContent(props) {
    /** State */
    const [keys, setKeys] = useState([0, 1])
    const [itemArr, setItemArr] = useState([0, 0]);  //0: textarea, 1: image
    /** Children Content thứ mấy */
    const CpCount = props.CpCount;

    function clickIconHandler(info, ps) {
        const copyItemArr = [...itemArr];
        const copyKeys = [...keys];
        if (info === 'addText') {       //textarea
            copyItemArr.splice(ps, 0, 0);
            copyKeys.splice(ps, 0, Math.max(...keys) + 1);
            setItemArr(copyItemArr);
            setKeys(copyKeys);
        }
        else if (info === 'addImage') {
            copyItemArr.splice(ps, 0, 1);    //image
            copyKeys.splice(ps, 0, Math.max(...keys) + 1);
            setItemArr(copyItemArr);
            setKeys(copyKeys);
        }
        else if (info === 'sub') {
            copyItemArr.splice(ps - 1, 1);
            setItemArr(copyItemArr);
        }
    }


    /** Render */
    var cntItem = itemArr.map((value, index) => {
        if ([0, 1].includes(value)) { //textarea and text(link)
            return (
                <DocumentFormInput key={keys[index]}
                    ps={index + 1}
                    CpCount={CpCount}
                    clickIconHandler={clickIconHandler}
                    type={value ? "image" : "textarea"}
                />
            )
        }
        return (
            <div>There are some error</div>
        )
    })

    return (
        <div className="doc__form__content" >
            <DocumentFormInput type="title"
                clickIconHandler={clickIconHandler}
            />
            {cntItem}
        </div>
    )
}

export default DocumentChildrenContent;



