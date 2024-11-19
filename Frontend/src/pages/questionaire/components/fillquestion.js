import { saveUserTest, serverImageUrl } from "../../../apiCalls/apiRoutes";
import { apiCall } from "../../../apiCalls/apiCalls";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Countdown from "react-countdown";

var categoryData;
var questionCount = 1;

function FillQuestion(questionData) {
  const divStyle = {
    textColor: {
      color: questionData.questionData.layout.textColor,
      background: questionData.questionData.layout.backgroundColor,
      textAlign: questionData?.language == "english" ? "left" : "right",
      padding: "20px",
    },
    answerColor: {
      color: questionData.questionData.layout.answerColor,
      textAlign: questionData?.language == "english" ? "left" : "right",
    },
    logoBackgroundColor: {
      backgroundColor: questionData.questionData.layout.backgroundColor,
    },
    question: {
      color: questionData.questionData.layout.questionTextColor,
      background: questionData.questionData.layout.questionBackgroundColor,
      width: "100%",
    },
  };

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

  const testObj = questionData.questionData;
  const [temp, setTemp] = useState(testObj.testObj);
  categoryData = testObj.testObj;

  var [showDiv, setShowDiv] = useState(1);
  var [totalQuestion, setTotalQUestion] = useState(1);
  const [questionTimer, setQuestionTimer] = useState(Date.now());

  function handleChange(key, questionKey, answer, e) {
    setTemp((prevState) => {
      let name = Object.assign({}, prevState);
      try {
        name[key][questionKey]["selectAnswer"] = answer;
      } catch {
        name[key][questionKey] = answer;
      }
      apiCall("post", saveUserTest, { id: testObj.id, testObj: name })
        .then((res) => {
          if (res.status == 200) {
            // showToastMessage("User test saved Successfully ", "green", 1);
          } else {
          }
        })
        .catch((err) => {
          showToastMessage(err?.response?.data?.message, "red", 2);
        });
      return name; // return new object jasper object
    });
  }

  function next() {
    ++questionCount;
    setShowDiv(++showDiv);
    // Reset timer for next question
    if (showDiv <= totalQuestion) {
      setQuestionTimer(Date.now());
    }
  }

  function prev() {
    --questionCount;
    setShowDiv(--showDiv);
    setQuestionTimer(Date.now());
  }

  function handleTimeUp() {
    if (showDiv < totalQuestion) {
      next();
    } else {
      // If no more questions, end test
      const endButton = document.querySelector(".end-button");
      if (endButton) {
        endButton.click();
      }
    }
  }
  console.log(questionTimer);

  var count = 0;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    let questionCount = 0;
    Object.keys(categoryData).map(function (key) {
      {
        if (
          !categoryData[key]["freeText"] &&
          !categoryData[key]["freeText"] == 1
        ) {
          Object.keys(categoryData[key]).map(function (questionKey) {
            {
              ++questionCount;
            }
          });
        }
      }
    });
    setTotalQUestion(questionCount);
  }, [questionData.questionData.testObj]);

  const [renderControl, setRenderControl] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      selectPressed(e.key);
    });
  }, []);

  function selectPressed(pressedKey) {
    if (pressedKey != 0) {
      const input = document.querySelectorAll(
        ".radio-" + pressedKey + "question" + (questionCount - 1)
      );
      for (let singleRadio of input) {
        const name = singleRadio.getAttribute("name");
        if (name == "question" + (questionCount - 1)) {
          singleRadio.click();
          document.getElementById("nextButton")?.click();
        }
      }
    }
  }

  return (
    <div style={divStyle.textColor} className="fill-question">
      {questionData.questionData.layout.imageUrl && (
        <img
          className="test-logo"
          src={serverImageUrl + questionData.questionData.layout.imageUrl}
          style={{ padding: "20px" }}
        />
      )}
      {Object.keys(categoryData).map(function (key) {
        {
          const regexPattern = /answer[0-9]/;
          if (
            !categoryData[key]["freeText"] ||
            categoryData[key]["freeText"] == 0
          ) {
            return (
              <div>
                {Object.keys(categoryData[key]).map(function (questionKey) {
                  {
                    ++count;
                  }
                  return (
                    <>
                      {/* One By one case */}
                      {testObj.orientation == 1 && (
                        <div
                          key={count}
                          hidden={showDiv == count ? false : true}
                        >
                          {key !== "No Category" && <h2>{key}</h2>}
                          {categoryData[key][questionKey]["timeLimit"] && (showDiv == count) && (
                            <h2>
                              <Countdown
                                date={
                                  questionTimer +
                                  categoryData[key][questionKey]["timeLimit"] *
                                  1000
                                }
                                onComplete={handleTimeUp}
                                autoStart={true}
                              />
                            </h2>
                          )}
                          {categoryData[key][questionKey]["image"] &&
                            categoryData[key][questionKey]["image"] != "" && (
                              <img
                                height={"200px"}
                                width={"200px"}
                                src={
                                  serverImageUrl +
                                  categoryData[key][questionKey]["image"]
                                }
                              />
                            )}
                          <div style={divStyle.question} className="question">
                            <h4>
                              {questionData?.language == "english"
                                ? `Question ${count}:`
                                : ""}

                              {categoryData[key][questionKey]["question"]}
                              {questionData?.language != "english"
                                ? `:שאלה ${count}`
                                : ""}
                            </h4>
                          </div>
                          <br />
                          {!categoryData[key][questionKey]["freeText"] ||
                            categoryData[key][questionKey]["freeText"] == 0 ||
                            Object.keys(categoryData[key][questionKey]).includes(
                              "answer0"
                            ) ? (
                            Object.keys(categoryData[key][questionKey]).map(
                              function (answers, index) {
                                if (answers.includes("answer")) {
                                  return (
                                    <div
                                      style={divStyle.answerColor}
                                      className="radio-answer"
                                    >
                                      <p>
                                        <input
                                          className={
                                            "radio-" + (index + 1) + questionKey
                                          }
                                          id={answers}
                                          type="radio"
                                          checked={
                                            temp[key][questionKey][
                                            "selectAnswer"
                                            ] === answers
                                          }
                                          value={questionKey}
                                          name={questionKey}
                                          onChange={(e) =>
                                            handleChange(
                                              key,
                                              questionKey,
                                              answers,
                                              e
                                            )
                                          }
                                        />{" "}
                                        {categoryData[key][questionKey][
                                          answers
                                        ]["image"] &&
                                          categoryData[key][questionKey][
                                          answers
                                          ]["image"] != "" && (
                                            <img
                                              height={"200px"}
                                              width={"200px"}
                                              src={
                                                serverImageUrl +
                                                categoryData[key][questionKey][
                                                answers
                                                ]["image"]
                                              }
                                            />
                                          )}
                                        {
                                          categoryData[key][questionKey][
                                          answers
                                          ]["answer"]
                                        }
                                      </p>
                                    </div>
                                  );
                                }
                              }
                            )
                          ) : (
                            <textarea
                              className="text-answer"
                              onChange={(e) =>
                                handleChange(
                                  key,
                                  questionKey,
                                  e.target.value,
                                  e
                                )
                              }
                            ></textarea>
                          )}
                          <div className="prev-next">
                            {1 - showDiv != 0 && !((categoryData[key]['question' + (showDiv - 1)]?.timeLimit || 0) > 0) && (
                              <button onClick={prev}>Prev</button>
                            )}
                            {showDiv < totalQuestion && (
                              <button id="nextButton" onClick={next}>
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* single case */}
                      {testObj.orientation == 0 && (
                        <div key={count}>
                          <div style={divStyle.question} className="question">
                            <h4>
                              {questionData?.language != "english"
                                ? `  שאלה :`
                                : ""}
                              {categoryData[key][questionKey]["image"] &&
                                categoryData[key][questionKey]["image"] !=
                                "" && (
                                  <img
                                    height={"200px"}
                                    width={"200px"}
                                    src={
                                      serverImageUrl +
                                      categoryData[key][questionKey]["image"]
                                    }
                                  />
                                )}
                              {questionData?.language == "english"
                                ? `Question ${count}:`
                                : ""}
                              {categoryData[key][questionKey]["question"]}
                            </h4>
                          </div>
                          <br />
                          <div className="radio-answer-all-single">
                            {!categoryData[key][questionKey]["freeText"] ||
                              categoryData[key][questionKey]["freeText"] == 0 ? (
                              Object.keys(categoryData[key][questionKey]).map(
                                function (answers) {
                                  if (answers.includes("answer")) {
                                    return (
                                      <div
                                        style={divStyle.answerColor}
                                        className="radio-answer "
                                      >
                                        <p>
                                          {questionData?.language == "hebrew"
                                            ? categoryData[key][questionKey][
                                            answers
                                            ]["answer"]
                                            : " "}{" "}
                                          {categoryData[key][questionKey][
                                            answers
                                          ]["image"] &&
                                            categoryData[key][questionKey][
                                            answers
                                            ]["image"] != "" && (
                                              <img
                                                height={"200px"}
                                                width={"200px"}
                                                src={
                                                  serverImageUrl +
                                                  categoryData[key][
                                                  questionKey
                                                  ][answers]["image"]
                                                }
                                              />
                                            )}
                                          <input
                                            id={answers}
                                            type="radio"
                                            checked={
                                              temp[key][questionKey][
                                              "selectAnswer"
                                              ] === answers
                                            }
                                            value={questionKey}
                                            name={questionKey}
                                            onChange={(e) =>
                                              handleChange(
                                                key,
                                                questionKey,
                                                answers,
                                                e
                                              )
                                            }
                                          />{" "}
                                          {questionData?.language == "english"
                                            ? categoryData[key][questionKey][
                                            answers
                                            ]["answer"]
                                            : " "}
                                        </p>
                                      </div>
                                    );
                                  }
                                }
                              )
                            ) : (
                              <textarea
                                className="text-answer"
                                onChange={(e) =>
                                  handleChange(
                                    key,
                                    questionKey,
                                    e.target.value,
                                    e
                                  )
                                }
                              ></textarea>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            );
          } else if (
            Object.keys(categoryData[key]).some((key) =>
              /answer[0-9]/.test(key)
            )
          ) {
            return (
              <>
                <div style={divStyle.question} className="question">
                  <h4>
                    {questionData?.language == "english"
                      ? `Question ${count}:`
                      : ""}
                    {categoryData[key]["image"] &&
                      categoryData[key]["image"] != "" && (
                        <img
                          height={"200px"}
                          width={"200px"}
                          src={serverImageUrl + categoryData[key]["image"]}
                        />
                      )}
                    {categoryData[key]["question"]}
                    {questionData?.language != "english"
                      ? `:שאלה ${count}`
                      : ""}
                  </h4>
                </div>
                <div className="radio-answer-all">
                  {Object.keys(categoryData[key]).map(function (
                    answers,
                    index
                  ) {
                    if (answers.includes("answer")) {
                      return (
                        <div
                          style={divStyle.answerColor}
                          className="radio-answer"
                        >
                          <p>
                            <input
                              className={"radio-" + (index + 1) + key}
                              id={answers}
                              type="radio"
                              checked={temp[key]["selectAnswer"] === answers}
                              value={key}
                              name={key}
                              onChange={(e) =>
                                handleChange(key, "selectAnswer", answers, e)
                              }
                            />{" "}
                            {categoryData[key][answers]["image"] &&
                              categoryData[key][answers]["image"] != "" && (
                                <img
                                  height={"200px"}
                                  width={"200px"}
                                  src={
                                    serverImageUrl +
                                    categoryData[key][answers]["image"]
                                  }
                                />
                              )}
                            {categoryData[key][answers]["answer"]}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            );
          } else {
            return (
              <div className="free-text-div">
                <div style={divStyle.question} className="question">
                  <h4>
                    Question:
                    {categoryData[key]["question"]}
                    {categoryData[key]["image"] &&
                      categoryData[key]["image"] != "" && (
                        <img
                          height={"200px"}
                          width={"200px"}
                          src={serverImageUrl + categoryData[key]["image"]}
                        />
                      )}
                  </h4>
                </div>

                <textarea
                  className="text-answer"
                  onChange={(e) =>
                    handleChange(key, "selectAnswer", e.target.value, e)
                  }
                ></textarea>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
export default FillQuestion;
