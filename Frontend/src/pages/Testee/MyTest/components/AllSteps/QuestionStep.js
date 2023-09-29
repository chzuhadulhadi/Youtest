import React, { Component, useEffect, useState } from "react";

// import '../../style.css'
import "./steps.css";

var questionCounter = 0;
var answerCounter = 0;
var object = [];

function QuestionStep(props) {
  const [html, setHtml] = useState({});
  const [htmlAnswer, setHtmlAnswer] = useState({});

  const [selectedCategory, setSelectedCategory] = useState();
  const [freeText, setFreeText] = useState({});
  const [allQUestionView, setAllQUestionView] = useState("See Only Questions");
  const [lenght, setLength] = useState(null);

  const categoryValueAdder = (e, name) => {
    props.obj.mainObjectAdder(e, "questions", e.target.id, name);
    return 0;
  };

  // function handleCategoryChange(e) {
  //     setSelectedCategory(e.target.value)
  // }

  function handleFreeTextChange(e) {
    // setFreeText((prev) => {
    //     let prevObj = Object.assign({}, prev);
    //     prevObj[e.target.id] = e.target.checked == true ? 1 : 0
    //     return prevObj
    // })
    var str = e.target.id.split("freeText");
    e.target.checked == true
      ? document.getElementById("answer" + str[1]).setAttribute("hidden", true)
      : document.getElementById("answer" + str[1]).removeAttribute("hidden");
    var temp = e;
    temp.target.value = e.target.checked == true ? 1 : 0;
    // e.target.value == 0 ? document.getElementById("freeTextField" + str[1]).setAttribute("hidden", true) :
    //     document.getElementById("freeTextField" + str[1]).removeAttribute("hidden")

    props.obj.mainObjectAdder(temp, "freeText", e.target.name, "freeText");
  }

  function handleCollapse(id) {
    var question = document.getElementById(id);
    var btns = question.querySelector("#collapse-button");
    btns.innerHTML == "-" ? (btns.innerHTML = "+") : (btns.innerHTML = "-");
    var answers = question.querySelectorAll(".question-div");
    answers.forEach((answer) => {
      var display = answer.style.display == "none" ? "block" : "none";

      answer.style.display = display;
    });
  }

  function handleCollapseForAll() {
    var allQuestions = document.getElementsByClassName("all-questions");

    for (let question of allQuestions) {
      var answers = question.querySelectorAll(".question-div");
      answers.forEach((answer) => {
        var display = answer.style.display == "none" ? "block" : "none";
        answer.style.display = display;
      });
    }
    allQUestionView == "See Only Questions"
      ? setAllQUestionView("See All")
      : setAllQUestionView("See Only Questions");
  }

  useEffect(() => {
    var namee = document.querySelectorAll(".select-category");

    if (props.obj.categoryStore.lenght !== 0) {
      namee.forEach((item) => {
        while (item.firstChild) {
          item.removeChild(item.firstChild);
        }
      });

      // Object.keys(props.obj.categoryStore).map(async (key,ele)=>{
      for (let key of Object.keys(props.obj.categoryStore)) {
        if (namee?.length) {
          namee.forEach(async (item1, index) => {
            let name = document.createElement("option");
            name.value = props.obj.categoryStore[key]["categoryName"];
            name.textContent = props.obj.categoryStore[key]["categoryName"];
            if (
              name.value ==
              props.obj.mainObj["questions"][`question${index}`]?.categoryName
            ) {
              const att = document.createAttribute("selected");
              name.setAttributeNode(att);
            }
            namee[index].appendChild(name.cloneNode(true));
          });
        }
      }
    }
    setLength(props.obj.categoryStore.lenght);
  }, [props.obj.newCategoryCreated]);

  function addQuestion() {
    setHtml((prevState) => {
      let name = Object.assign({}, prevState); // creating copy of state variable jasper
      name["question" + questionCounter] = (
        <>
          <div id={"question" + questionCounter}>
            <div id="singleQuestion" className="question">
              <label className="form-label">Question</label>

              <input
                id={"question" + questionCounter}
                type="text"
                name="categoryField"
                onChange={(e) => categoryValueAdder(e, "question")}
                placeholder="Question"
                className="form-control mb-3 pt-3 pb-3"
                required
              />
            </div>

            <label className=" form-label" hidden></label>
            <select
              name="selectCategory"
              className="select-category"
              id={"question" + questionCounter}
              onChange={(e) => categoryValueAdder(e, "categoryName")}

              // onChange={handleCategoryChange}
            >
              <option>Select Category</option>
              {Object.keys(props.obj.categoryStore).map((key, index) => {
                return (
                  <option value={props.obj.categoryStore[key]["categoryName"]}>
                    {props.obj.categoryStore[key]["categoryName"]}
                  </option>
                );
              })}
            </select>

            {/* <select className='text-type' id={"freeText" + questionCounter} name={"question" + questionCounter}

                        onChange={handleFreeTextChange}
                    >

                        <option value="0" >Answer Options</option>
                        <option value="1" >Free Text</option>

                    </select> */}
            {/* defaultChecked={this.state.chkbox} onChange={ } */}
            <input
              id={"freeText" + questionCounter}
              name={"question" + questionCounter}
              type="checkbox"
              class="free-text-check"
              onChange={handleFreeTextChange}
            />
            <label className="form-label" class="free-text-label">
              Free Text
            </label>

            {/* <div className='text-area-div' id={"freeTextField" + questionCounter} hidden>
                        <label className="form-label">Answer</label>
                        <textarea ></textarea>
                    </div> */}
            {/* <h5 className='add-answer-text' id={"answer" + questionCounter} name={"question" + questionCounter} onClick={(e) => addHtmlAnswer(e)} >+ Answer</h5> */}
            <button
              className="add-answer-text"
              id={"answer" + questionCounter}
              name={"question" + questionCounter}
              onClick={(e) => addHtmlAnswer(e)}
            >
              Add Answer
            </button>

            <br />
          </div>
        </>
      );

      ++questionCounter;
      return name;
    });
  }

  function addHtmlAnswer(e) {
    var qstnCounter = e.target.getAttribute("name");
    qstnCounter = qstnCounter.split("question");
    qstnCounter = qstnCounter[1];
    setHtmlAnswer((prevState) => {
      let name = Object.assign({}, prevState); // creating copy of state variable jasper
      name["answer" + answerCounter] = (
        <>
          <div className="question-div">
            <label className="form-label" hidden>
              Answer
            </label>
            <input
              id={"question" + qstnCounter + "-answer" + answerCounter}
              type="text"
              name="categoryField"
              onChange={(e) => answerAdder(e, "answer")}
              placeholder="Answer"
              className="form-control mb-3 pt-3 pb-3 answers-field"
              required
            />
            <>
              {props.obj.getMainObj().scoringType == 1 ? (
                <>
                  <label className="form-label" hidden>
                    Points
                  </label>
                  <input
                    id={"question" + qstnCounter + "-answer" + answerCounter}
                    type="number"
                    onChange={(e) => answerAdder(e, "point")}
                    placeholder="points"
                    min="0"
                    max="10"
                    className="form-control mb-3 pt-3 pb-3 answers-field-points"
                    required
                  ></input>
                </>
              ) : (
                <>
                  <label className="form-label" hidden>
                    Type
                  </label>
                  <select
                    className="form-control mb-3 pt-3 pb-3 answers-field-points"
                    id={"question" + qstnCounter + "-answer" + answerCounter}
                    onChange={(e) => answerAdder(e, "point")}
                  >
                    <option value={0}>False</option>
                    <option value={10}>True</option>
                  </select>
                </>
              )}
            </>
            {/* <select value={optionsState}>
                        <option value="A">Apple</option>
                        <option value="B">Banana</option>
                        <option value="C">Cranberry</option>
                    </select> */}
          </div>
        </>
      );

      ++answerCounter;
      return name;
    });
  }
  function answerAdder(e, property) {
    props.obj.mainObjectAdder(e, "questions", e.target.id, property);
  }

  async function search(e) {
    const allQuestions = await document.getElementsByClassName("all-questions");

    for (let singleQuestion of allQuestions) {
      document.getElementById(singleQuestion.id).style.display = "block";
      var inputElements = singleQuestion.querySelectorAll("input");
      var fieldTxt = inputElements[0].value.toLowerCase();
      var contains = fieldTxt.includes(e.target.value.toLowerCase());
      // var tempDoc = new DOMParser().parseFromString(str, "text/html")
      if (contains == true) {
      } else {
        document.getElementById(singleQuestion.id).style.display = "none";
      }
    }
  }

  return (
    <div
      style={{ textAlign: "start" }}
      className="question-content"
      hidden={props.obj.tabSelected == "QUESTIONS" ? false : true}
    >
      <div class="wrapper">
        <div>
          <h3>#3 - Questions</h3>
        </div>
        <div>
          {" "}
          <button
            className="QuestionButtonClass"
            onClick={() => handleCollapseForAll()}
          >
            {allQUestionView}
          </button>
        </div>
        <div>
          {" "}
          <input
            type="search"
            style={{ padding: "10px", marginTop: "5px" }}
            placeholder="Search"
            className="search-for-question"
            onChange={search}
          />
        </div>
      </div>

      <div>
        {/* <h3>Questions </h3> */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.obj.showTab("LAYOUT");
          }}
          className="formClass"
        >
          {Object.keys(html).map(function (topkey, i) {
            return (
              <div
                style={{ display: "block" }}
                id={"all-questions-" + i}
                className="all-questions"
              >
                <button
                  id="collapse-button"
                  onClick={() => handleCollapse("all-questions-" + i)}
                >
                  -
                </button>

                {html[topkey]}
                {Object.keys(htmlAnswer).map(function (key, i) {
                  {
                    var temp =
                      htmlAnswer[
                        key
                      ].props.children.props.children[1].props.id.split("-")[0];
                    if (topkey == temp) {
                      return htmlAnswer[key];
                    } else {
                      return;
                    }
                  }
                })}
              </div>
            );
          })}
          <button onClick={addQuestion}>Add a Question</button>
          <br />
          <button type="submit">Save Test & Close</button>
        </form>
      </div>
    </div>
  );
}
export default QuestionStep;
