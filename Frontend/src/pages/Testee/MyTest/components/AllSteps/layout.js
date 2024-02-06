import React, { useEffect, useRef, useState } from "react";
import "../../style.css";
import { apiCall } from "../../../../../apiCalls/apiCalls";
import { logoUploader } from "../../../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";
import { serverImageUrl } from "../../../../../apiCalls/apiRoutes";
import { SketchPicker, SwatchesPicker, ChromePicker } from "react-color";

function TestLayout(props) {
  const [showColorPickerForBackgroundColor, setShowColorPickerForBackgroundColor] = useState(false);
  const [showColorPickerForTextColor, setShowColorPickerForTextColor] = useState(false);
  const [showColorPickerForQuestionBackgroundColor, setShowColorPickerForQuestionBackgroundColor] = useState(false);
  const [showColorPickerForQuestionTextColor, setShowColorPickerForQuestionTextColor] = useState(false);
  const [showColorPickerForAnswerColor, setShowColorPickerForAnswerColor] = useState(false);

  const BackgroundColor = useRef(null);
  const TextColor = useRef(null);
  const QuestionBackgroundColor = useRef(null);
  const QuestionTextColor = useRef(null);
  const AnswerColor = useRef(null);


  const [textLayout, setTextLayout] = useState({
    answerColor: "",
    backgroundColor: "",
    imageUrl: "",
    questionBackgroundColor: "",
    questionTextColor: "",
    textColor: "",
  });
  const handleSwatchHover = (color, id) => {
    console.log(color);
  }
  useEffect(() => {
    // Update the background color of the paper div
    const paperDiv = document.getElementById("paperDiv");
    if (paperDiv) {
      paperDiv.style.backgroundColor = textLayout.backgroundColor;
    }
  }, [textLayout.backgroundColor]);

  useEffect(() => {
    if (props.obj.mainObj?.layout && props.obj.mainObj?.layout != {
      answerColor: "",
      backgroundColor: "",
      imageUrl: "",
      questionBackgroundColor: "",
      questionTextColor: "",
      textColor: "",
    }) {
      setTextLayout((prevTextLayout) => ({
        ...prevTextLayout,
        ...props.obj.mainObj?.layout,
      }));
    }
  }, [props.obj.mainObj?.layout]);

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
              setTextLayout((prev) => {
                return { ...prev, imageUrl: url };
              });
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
  useEffect(() => {
    const handleClickedOutside = (e) => {
      if (BackgroundColor.current && !BackgroundColor.current.contains(e.target)) {
        setShowColorPickerForBackgroundColor(false);
      }
      if (TextColor.current && !TextColor.current.contains(e.target)) {
        setShowColorPickerForTextColor(false);
      }
      if (QuestionBackgroundColor.current && !QuestionBackgroundColor.current.contains(e.target)) {
        setShowColorPickerForQuestionBackgroundColor(false);
      }
      if (QuestionTextColor.current && !QuestionTextColor.current.contains(e.target)) {
        setShowColorPickerForQuestionTextColor(false);
      }
      if (AnswerColor.current && !AnswerColor.current.contains(e.target)) {
        setShowColorPickerForAnswerColor(false);
      }
    }
    document.addEventListener("mousedown", handleClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    }
  }, []);

  const handleFileSelect = (event) => {
    console.log(event.target.files[0]);
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
              textAlign: "start",
              position:"relative",right:"20px"
          
            }}
          >

            {textLayout.imageUrl ? (
              <>
                <svg style={{ position: 'absolute' }} width="600" height="20"><line x1="250" y1="10" x2="750" y2="10" stroke="black" /></svg>

                <img style={{ height: '150px', width: '250px' }} src={`${serverImageUrl}${textLayout.imageUrl}`} alt="Selected Logo" />
              </>
            ) : (
              <p style={{ height: '150px', width: '250px' }}>No file chosen</p>
            )}
            <div style={{ position: 'absolute', marginTop: '-60px' }}>
              <svg style={{ position: 'absolute' }} width="800" height="10"><line x1="500" y1="10" x2="600" y2="10" stroke="black" /></svg>
            </div>
            <div style={{ position: 'absolute', marginTop: '20px' }}>
              <svg style={{ position: 'absolute' }} width="800" height="40"><line x1="200" y1="30" x2="600" y2="10" stroke="black" /></svg>
            </div>
            <h3 className="p-5">#4 - My Questionaire</h3>


            <h4 style={{
              backgroundColor: textLayout.questionBackgroundColor,
              color: textLayout.questionTextColor,
              padding: '0.2rem 0.3rem'
            }}>What is Computer</h4>
            <div style={{ position: 'absolute', marginTop: '-50px' }}>
              <svg style={{ position: 'absolute' }} width="600" height="30"><line x1="300" y1="28" x2="600" y2="0" stroke="black" /></svg>
            </div>
            <div style={{ position: 'absolute', marginTop: '-20px' }}>
              <svg style={{ position: 'absolute' }} width="600" height="50"><line x1="100" y1="0" x2="600" y2="50" stroke="black" /></svg>
            </div>
            <div
              className="answer"
              style={{ color: textLayout.answerColor }}
            >

              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: '10rem' }}>Answer 1</p>
                <p>Answer 2</p>
              </div>
              <div style={{ position: 'absolute', marginTop: '0px' }}>
                <svg style={{ position: 'absolute' }} width="600" height="70"><line x1="200" y1="10" x2="600" y2="70" stroke="black" /></svg>
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
          <button type="submit" onClick={(e) => { props.obj.apiCallToCreateTest(e) }}> Save Test & Close </button>
          <button type="submit">Next</button>
        </div>

        <div className="w-25">
          <label className="form-label">Please select your logo</label>
          <input
            onChange={(e) => {
              handleFileSelect(e);
            }}
            type="file"
            className="form-control mb-3 pt-3 pb-3"
            placeholder="choose a file"
          />

          {/* <label className="form-label">Choose Background Color</label>
          <ChromePicker
            color={textLayout.backgroundColor}
            onChangeComplete={(color) => {
              layoutFieldsAdder({ target: { id: "backgroundColor", value: color.hex } });
            }
            }
          /> */}
          <div ref={BackgroundColor} className="color-picker" style={{position:"relative",right:"20px"}}>
            <button    onClick={() => setShowColorPickerForBackgroundColor(!showColorPickerForBackgroundColor)}>Background Color</button>
            {showColorPickerForBackgroundColor && <ChromePicker
              color={textLayout.backgroundColor}
              onChangeComplete={(color) => {
                layoutFieldsAdder({ target: { id: "backgroundColor", value: color.hex } });
              }
              }
            />}
          </div>

          <div ref={TextColor} className="color-picker" style={{position:"relative",right:"20px"}}>
            <button onClick={() => setShowColorPickerForTextColor(!showColorPickerForTextColor)}>Text Color</button>
            {showColorPickerForTextColor && <ChromePicker
              color={textLayout.textColor}
              onChangeComplete={(color) => {
                layoutFieldsAdder({ target: { id: "textColor", value: color.hex } });
              }
              }
            />}
          </div>

          <div ref={QuestionBackgroundColor} className="color-picker" style={{position:"relative",right:"20px"}}>
            <button onClick={() => setShowColorPickerForQuestionBackgroundColor(!showColorPickerForQuestionBackgroundColor)}>Question Bg Color</button>
            {showColorPickerForQuestionBackgroundColor && <ChromePicker
              color={textLayout.questionBackgroundColor}
              onChangeComplete={(color) => {
                layoutFieldsAdder({ target: { id: "questionBackgroundColor", value: color.hex } });
              }
              }
            />}
          </div>

          <div ref={QuestionTextColor} className="color-picker" style={{position:"relative",right:"20px"}}>
            <button onClick={() => setShowColorPickerForQuestionTextColor(!showColorPickerForQuestionTextColor)}>Question Text CLR</button>
            {showColorPickerForQuestionTextColor && <ChromePicker
              color={textLayout.questionTextColor}
              onChangeComplete={(color) => {
                layoutFieldsAdder({ target: { id: "questionTextColor", value: color.hex } });
              }
              }
            />}
          </div>
          <div ref={AnswerColor} className="color-picker"  style={{position:"relative",right:"20px"}}>
            <button onClick={() => setShowColorPickerForAnswerColor(!showColorPickerForAnswerColor)}>Answer Color</button>
            {showColorPickerForAnswerColor && <ChromePicker
              color={textLayout.answerColor}
              onChangeComplete={(color) => {
                layoutFieldsAdder({ target: { id: "answerColor", value: color.hex } });
              }
              }
            />}
          </div>
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
          <h3  style={{ marginLeft:'20px' }}>LAYOUT</h3>
          <TextLayouts />
        </form>
      </div>
    </div>
  );
}

export default TestLayout;
