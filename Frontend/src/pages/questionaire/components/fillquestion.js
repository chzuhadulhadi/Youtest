import { saveUserTest } from '../../../apiCalls/apiRoutes'
import { apiCall } from "../../../apiCalls/apiCalls";
import React, { useEffect } from 'react';
import { useState } from "react";
import { toast } from "react-toastify";

var categoryData;
var questionCount = 1;


function FillQuestion(questionData) {
console.log("questionData",questionData)
    const divStyle = {
        textColor: { color: questionData.questionData.layout.textColor },
        answerColor: { color: questionData.questionData.layout.answerColor },
        logoBackgroundColor: { backgroundColor: questionData.questionData.layout.backgroundColor },
        question: { color: questionData.questionData.layout.questionTextColor, background: questionData.questionData.layout.questionBackgroundColor },
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
    const [temp, setTemp] = useState(testObj.testObj)
    categoryData = testObj.testObj;

    var [showDiv, setShowDiv] = useState(1);
    var [totalQuestion, setTotalQUestion] = useState(1);

    function handleChange(key, questionKey, answer, e) {
        setTemp(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name[key][questionKey]["selectAnswer"] = answer;
            return name;                                 // return new object jasper object
        })

        // Save object on backend
        apiCall('post', saveUserTest, { id: testObj.id, testObj: categoryData })
            .then((res) => {
                if (res.status == 200) {
                    // showToastMessage("User test saved Successfully ", "green", 1);
                }
                else {

                }
            }).catch((err) => {
                showToastMessage(err?.response?.data?.message, "red", 2);

            })
    }

    function next() {
        console.log("next clicked")
        ++questionCount;
        setShowDiv(++showDiv)
    }
    function prev() {
        console.log("prev clicked")

        --questionCount;
        setShowDiv(--showDiv)
    }
    var count = 0;

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    // useEffect(() => {
    //     setIsLoaded(true);
    // }, []);

    // useEffect(() => {
    //     if (isLoaded) {
    //         setIsPageLoaded(true);
    //     }
    // }, [isLoaded]);
    // const [pressedKey, setPressedKey] = useState(0)
    const [renderControl, setRenderControl] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            console.log("pressed")

            // setPressedKey(e.key)
            selectPressed(e.key)
        })
    }, [])

    function selectPressed(pressedKey) {
        if (pressedKey != 0) {
            const input = document.querySelectorAll(".radio-" + pressedKey + "question" + (questionCount - 1))
            for (let singleRadio of input) {
                const name = singleRadio.getAttribute("name");
                if (name == "question" + (questionCount - 1)) {
                    singleRadio.click();
                    document.getElementById('nextButton')?.click();

                }

            }

        }
    }

    return (
        <div style={divStyle.textColor} className='fill-question'>
            <h1>{testObj.name}</h1>
            {Object.keys(categoryData).map(function (key) {
                {
                    {console.log("categoryData[key]",categoryData)}

                    if (!categoryData[key]["freeText"] && !categoryData[key]["freeText"] == 1) {

                        return (
                            <div>
                                {Object.keys(categoryData[key]).map(function (questionKey) {

                                    {
                                        ++count;
                                    }
                                    return (
                                        <>
                                            {/* One By one case */}
                                            {testObj.orientation == 1 && <div key={count} hidden={(showDiv == count) ? false : true}>
                                                <h2>{key}</h2>

                                                <div style={divStyle.question} className='question'>
                                                    <h4>
                                                        Question:
                                                        {
                                                            categoryData[key][questionKey]["question"]
                                                        }

                                                    </h4>
                                                </div>
                                                <br />
                                                {
                                                    (!categoryData[key][questionKey]["freeText"] || categoryData[key][questionKey]["freeText"] == 0) ? (

                                                        Object.keys(categoryData[key][questionKey]).map(function (answers, index) {
                                                            if (answers.includes("answer")) {
                                                                return (<div style={divStyle.answerColor} className='radio-answer'>
                                                                    <p>
                                                                        <input className={"radio-" + (index + 1) + questionKey} id={answers} type="radio" checked={temp[key][questionKey]["selectAnswer"] === answers} value={questionKey} name={questionKey} onChange={(e) => handleChange(key, questionKey, answers, e)} />
                                                                        {/* <input type="radio" value={questionKey} name={questionKey} onChange={()=>categoryData[key][questionKey]["selectAnswer"]=answers} /> */}
                                                                        {" "}{categoryData[key][questionKey][answers]["answer"]}
                                                                    </p>

                                                                </div>)
                                                            }

                                                        })
                                                    ) : <textarea className='text-answer' onChange={(e) => categoryData[key][questionKey]["selectAnswer"] = e.target.value}></textarea>
                                                }
                                                <div className="prev-next">
                                                    {(totalQuestion - showDiv) != 0 && <button onClick={prev}>Prev</button>}
                                                    {(showDiv) <= totalQuestion + 1 && <button id="nextButton" onClick={next}>Next</button>}
                                                </div>

                                            </div>}

                                            {/* single case */}
                                            {testObj.orientation == 0 && <div key={count} >
                                                <div style={divStyle.question} className='question'>
                                                    <h4>
                                                        Question:
                                                        {
                                                            categoryData[key][questionKey]["question"]
                                                        }

                                                    </h4>
                                                </div>
                                                {/* <div className='question'></div> */}
                                                <br />
                                                <div className='radio-answer-all-single'>
                                                    {
                                                        (!categoryData[key][questionKey]["freeText"] || categoryData[key][questionKey]["freeText"] == 0) ? (

                                                            Object.keys(categoryData[key][questionKey]).map(function (answers) {
                                                                if (answers.includes("answer")) {
                                                                    return (<div style={divStyle.answerColor} className='radio-answer '>
                                                                        <p>
                                                                            <input id={answers} type="radio" checked={temp[key][questionKey]["selectAnswer"] === answers} value={questionKey} name={questionKey} onChange={(e) => handleChange(key, questionKey, answers, e)} />
                                                                            {/* <input type="radio" value={questionKey} name={questionKey} onChange={()=>categoryData[key][questionKey]["selectAnswer"]=answers} /> */}
                                                                            {" "}{categoryData[key][questionKey][answers]["answer"]}
                                                                        </p>

                                                                    </div>)
                                                                }

                                                            })
                                                        ) : <textarea className='text-answer' onChange={(e) => categoryData[key][questionKey]["selectAnswer"] = e.target.value}></textarea>
                                                    }
                                                </div>
                                            </div >}
                                        </>
                                    )
                                })}
                            </div>)
                    }
                    else {
                        return <div className='free-text-div'>
                            <div style={divStyle.question} className='question'>
                                <h4>
                                    Question:
                                    {
                                        categoryData[key]["question"]
                                    }

                                </h4>
                            </div>
                            <textarea className='text-answer' ></textarea>
                        </div>
                    }
                }
            })
            }

        </div >
    )
}
export default FillQuestion;
