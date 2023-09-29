import React, { Component, useEffect, useState } from "react";

import "../../style.css";
import { apiCall } from "../../../../../apiCalls/apiCalls";
import { logoUploader } from "../../../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";

import { environment } from "../../../../../apiCalls/apiRoutes";
function TestLayout(props) {
  const [textLayout, setTextLayout] = useState({
    answerColor: "",
    backgroundColor: "",
    imageUrl: "",
    questionBackgroundColor: "",
    questionTextColor: "",
    textColor: "",
  });

const showToastMessage = (text, color, notify) => {
    if (notify == 1) {
      toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    } else {
      toast.warning(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    }
  };
  const layoutFieldsAdder = (e, name) => {
    setTextLayout((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(textLayout);
    props.obj.mainObjectAdderForLayout(
      e,
      "layout",
      e.target.id,
      e.target.value
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [handleRend, setHandleRend] = useState(0);
  useEffect(
    (e) => {
      if (handleRend) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        apiCall("post", logoUploader, formData)
          .then((res) => {
            if (res.status == 200) {
              let url = res.data.data;
              console.log(url);
              props.obj.mainObjectAdderForLayout(e, "layout", "imageUrl", url);
              showToastMessage("Logo updated Successfully ", "green", 1);
            }
          })
          .catch((err) => {
            showToastMessage(err?.response?.data?.message, "red", 2);

          });
      }
    },
    [handleRend]
  );
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setHandleRend(handleRend + 1);
  };

  function TextLayouts() {
    return (
      <div className="w-100" style={{ display: 'flex' }}>
        <div className="w-75">
          <div
            className="paper"
            style={{
              backgroundColor: textLayout.backgroundColor,
              color: textLayout.textColor,
              textAlign:"start"
            }}
          >
            <h3 className="p-5">#4 - My Questionaire</h3>

            <h4 style={{
              backgroundColor: textLayout.questionBackgroundColor,
              color: textLayout.questionTextColor,
              padding: '0.2rem 0.3rem'
            }}>What is Computer</h4>
            <div
              className="answer"
              style={{ color: textLayout.answerColor }}
            >
              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: '10rem' }}>Answer 1</p>
                <p>Answer 2</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: '10rem' }}>Answer 3</p>
                <p>Answer 4</p>
              </div>
            </div>

            <h4 style={{
              backgroundColor: textLayout.questionBackgroundColor,
              color: textLayout.questionTextColor,
              padding: '0.2rem 0.3rem'
            }}>What is Physics</h4>
            <div
              className="answer"
              style={{ color: textLayout.answerColor }}
            >
              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: '10rem' }}>Answer 1</p>
                <p>Answer 2</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: '10rem' }}>Answer 3</p>
                <p>Answer 4</p>
              </div>
            </div>

          </div>
        </div>
        <div className="w-25">
          <label className="form-label">Please select your logo</label>
          <input
            value={textLayout.imageUrl}
            onChange={(e) => {
              handleFileSelect(e);
            }}
            type="file"
            className="form-control mb-3 pt-3 pb-3"
            placeholder="choose a dile"
          />

          <label className="form-label">Choose Background Color</label>
          <input
            onChange={layoutFieldsAdder}
            value={textLayout.backgroundColor}
            id="backgroundColor"
            type="color"
            className="form-control form-control-color"
          />
          <label className="form-label">Choose Text Color</label>
          <input
            value={textLayout.textColor}
            onChange={layoutFieldsAdder}
            id="textColor"
            type="color"
            className="form-control form-control-color"
          />
          <label className="form-label">Question Background Color</label>
          <input
            value={textLayout.questionBackgroundColor}
            onChange={layoutFieldsAdder}
            id="questionBackgroundColor"
            type="color"
            className="form-control form-control-color"
          />
          <label className="form-label">Question Text Color</label>
          <input
            value={textLayout.questionTextColor}
            onChange={layoutFieldsAdder}
            id="questionTextColor"
            type="color"
            className="form-control form-control-color"
          />
          <label className="form-label">Answer Color</label>
          <input
            onChange={layoutFieldsAdder}
            id="answerColor"
            value={textLayout.answerColor}
            type="color"
            className="form-control form-control-color"
          />
          <button type="submit">Save Test & Close</button>
        </div>

      </div>

    );
  }
  return (
    <div
      className="layout-content"
      hidden={props.obj.tabSelected == "LAYOUT" ? false : true}
    >
      <div className="leftHalf">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.obj.showTab("RESULT STRUCTURE");
          }}
          className=""
        >
          <h3>LAYOUT</h3>

          <TextLayouts />
        </form>
      </div>
    </div>
  );
}

export default TestLayout;
