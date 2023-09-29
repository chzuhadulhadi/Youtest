import React, { Component, useEffect, useState } from 'react';
// import MSFHeader from './header';
// import Properties from './properties';
// import Structure from './structure';
// import Categories from './categories';
import '../../style.css'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

function PropertiesStep(props) {
    console.log(props.obj.mainObj);
    const [timeLimited, setTimeLimited] = useState(props.obj.mainObj?.timeLimit?.length>0)
    const [beforeTextState, setBeforeTextState] = React.useState(
        () => EditorState.)
    const [afterTextState, setAfterTextSatet] = React.useState(
        () => EditorState.createEmpty())
    const [beforeTestTextHtml, setBeforeTestTextHtml] = useState()
    const [afterTestTextHtml, setAfterTestTextHtml] = useState()
    useEffect(() => {
        let html = convertToHTML(beforeTextState.getCurrentContent());
        setBeforeTestTextHtml(html)
        props.obj.mainObjectAdderForProperties(beforeTestTextHtml, "beforeTestText")
    }, [beforeTextState])

    useEffect(() => {
        document.querySelectorAll('.rdw-option-wrapper')?.forEach((ele, index) => {
            if (index == '3' || index == '4' || index == '5' || index == '6 ' || index == '15' || index == '18' || index == '21' || index == '27' || index == '28' || index == '29' || index == '30 ' || index == '39' || index == '42' || index == '45') {
                ele.style.display = "none"
            }
        })
        document.querySelectorAll('.rdw-block-wrapper').forEach((ele) => {
            ele.style.display = "none"
        })
    }, [])

    useEffect(() => {
        let html = convertToHTML(afterTextState.getCurrentContent());
        setAfterTestTextHtml(html)
        props.obj.mainObjectAdderForProperties(afterTestTextHtml, "afterTestText")
    }, [afterTextState])

    return (
        <div hidden={props.obj.tabSelected == "PROPERTIES" ? false : true} className='categories-content'>
            <div className="leftHalf" style={{ float: "left" }}>

                <br />
                <form
                    className="formClass"
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.obj.showTab("CATEGORIES");
                    }}
                >

                    <h3> #1 - Properties</h3>
                    <label className="form-label"> Name </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control mb-3 pt-3 pb-3"
                        placeholder="Enter here the name of the test"
                        value={props.obj.mainObj?.name}
                        onChange={(e) => props.obj.mainObjectAdderForProperties(e, "name")}
                        required
                    />

                    <label className="form-label">Test structure</label>
                    <select
                        id="orientation"
                        value={props.obj.mainObj?.orientation}
                        onChange={(e) => props.obj.mainObjectAdderForProperties(e, "orientation")}
                        className="form-select mb-3 pt-3 pb-3"
                        required
                    >
                        <option value="0">All the questions should appear in one page</option>
                        <option value="1">Questions are shown one by one</option>
                    </select>

                    <label className="form-label">Scoring type</label>
                    <select
                        id="scoringType"
                        value={props.obj.mainObj?.scoringType}
                        onChange={(e) => props.obj.mainObjectAdderForProperties(e, "scoringType")}
                        className="form-select mb-3 pt-3 pb-3"
                        required
                    >
                        <option value="0">
                            Answers could be only totally right or totally wrong
                        </option>
                        <option value="1">
                            Answers could be right, wrong and the shades that in between
                        </option>
                    </select>

                    <label className="form-label">Questions order</label>
                    <select
                        id="randomOrder"
                        value={props.obj.mainObj?.randomOrder}
                        onChange={(e) => props.obj.mainObjectAdderForProperties(e, "randomOrder")}
                        className="form-select mb-3 pt-3 pb-3"
                        required
                    >
                        <option value="0">Sequence</option>

                        <option value="1">Random</option>

                    </select>


                    <input type="checkbox" onClick={(e) => { (e.target.checked) ? setTimeLimited(true) : setTimeLimited(false) }} checked={timeLimited} />
                    <label> Time Limited Test </label> <br />
                    <div style={timeLimited ? { display: "block" } : { display: 'none' }}>
                        <label className="form-label"> How long the test is going to be in minutes </label>
                        <input
                            id="timeLimit"
                            type="number"
                            min="1"
                            max="100"
                            name='timeLimit'
                            className="form-control mb-3 pt-3 pb-3"
                            placeholder="mins"
                            value={props.obj.mainObj?.timeLimit}
                            onChange={(e) => props.obj.mainObjectAdderForProperties(e, "timeLimit")}
                        />
                    </div>

                    <label className="form-label">
                        The text that will appear before doing the test
                    </label>
                    <Editor
                        editorState={beforeTextState}
                        onEditorStateChange={setBeforeTextState}
                        id="beforeTestText"
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />

                    <label className="form-label mt-4">
                        The text that will appear after doing the test
                    </label>
                    <Editor
                        editorState={afterTextState}
                        onEditorStateChange={setAfterTextSatet}
                        id="afterTestText"
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />



                    <button type="submit" onClick={(e) => { props.obj.apiCallToCreateTest(e) }}> Save Test & Close </button>
                    <button className='next-button' type="submit" > Next </button>

                </form>
                <br />
                <br />
            </div>
        </div>
    )
}

export default PropertiesStep;