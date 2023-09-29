import React, { Component, useState } from "react";
import { EditorState } from 'draft-js';
import { useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import "../../style.css";
var conditionCounter = 0;

const categoryTracking = {}
function AutomaticText(props) {
  const [html, setHtml] = useState({});
  const [automaticText, setAutomaticText] = useState({});
  const [showSubmit, setShowSubmit] = useState(false)
  const [beforeTextState, setBeforeTextState] = React.useState(
    () => EditorState.createEmpty(),)
  const [beforeTestTextHtml, setBeforeTestTextHtml] = useState()
  const [currentText, setCurrentText] = useState()

  useEffect(() => {

    let html = convertToHTML(beforeTextState.getCurrentContent());
    console.log("🚀 ~ file: automaticText.js:23 ~ useEffect ~ html:", html)
    setBeforeTestTextHtml(html)
  }, [beforeTextState])

  const AutomaticTextAdder = (e, name) => {
    if (name == "category") {
      categoryTracking[e.target.id] ? categoryTracking[e.target.id] = categoryTracking[e.target.id] : categoryTracking[e.target.id] = {}
    }
    else {
      setAutomaticText((prev) => {
        let prevObj = Object.assign({}, prev);

        prevObj[e.target.id]
          ? (prevObj[e.target.id] = { ...prevObj[e.target.id] })
          : (prevObj[e.target.id] = { min: 0, max: 0, text: "", category: "" });
        prevObj[e.target.id][name] = e.target.value;
        return {
          ...prevObj,
        }
      })
    }
    props.obj.mainObjectAdderForAutomaticText(e, "automaticText", name,)
    return 0;
  };

  function addAutomatictextRule() {
    setShowSubmit(true)
    setHtml((prevState) => {
      let name = Object.assign({}, prevState);
      name["condition" + conditionCounter] = (
        <>
          <div className="questionSetter">
            <select
              id={"condition" + conditionCounter}
              className="automatic-text-select-cat"
              onChange={(e) => AutomaticTextAdder(e, "category")}
            >
              <option>Select Category</option>
              {Object.keys(props.obj.categoryStore).map((ele) => {
                return (
                  <option value={props.obj.categoryStore[ele].categoryName}>
                    {props.obj.categoryStore[ele].categoryName}
                  </option>
                );
              })}
            </select>

            <label className="form-label">Minimum Value</label>
            <input
              id={"condition" + conditionCounter}
              type="number"
              name="min"
              onChange={(e) => AutomaticTextAdder(e, "min")}
              placeholder="Min Value"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            <label className="form-label">Maximum Value</label>
            <input
              id={"condition" + conditionCounter}
              type="number"
              name="max"
              onChange={(e) => AutomaticTextAdder(e, "max")}
              placeholder="Max Value"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            <label className="form-label">Text for the range</label>
            <input
              id={"condition" + conditionCounter}
              type="text"
              name="text"
              onChange={(e) => AutomaticTextAdder(e, "text")}
              placeholder="Enter text"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            {/* <Editor

              onEditorStateChange={setBeforeTextState}
              id="beforeTestText"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            /> */}
            <br />
          </div>
        </>
      );
      ++conditionCounter;
      return name; // return new object jasper object
    });
  }

  return (
    <div
      className="automatic-text-content"
      hidden={props.obj.tabSelected == "AUTOMATIC TEXT" ? false : true}
      style={{ textAlign: "start" }}
    >
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.obj.apiCallToCreateTest(e)
          }}
          className="formClass"
        >
          <h3>#6 - AUTOMATIC TEXT</h3>
          <button onClick={addAutomatictextRule}>+</button>

          {Object.keys(html).map(function (key, i) {
            <button>Add New Condition</button>;
            return html[key];
          })}
          <button style={showSubmit ? { display: "block" } : { display: 'none' }} type="submit">Save Test & Close </button>
        </form>

      </div>
    </div>
  );
}

export default AutomaticText;
