import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import './style.css'


import StepsHeader from './components/StepsHeader';
import PropertiesStep from './components/AllSteps/PropertiesStep';
import CategoriesStep from './components/AllSteps/CategoriesStep';
import QuestionStep from './components/AllSteps/QuestionStep';
import AutomaticText from './components/AllSteps/automaticText';
import TestLayout from './components/AllSteps/layout';
import ResultStructureStep from './components/AllSteps/ResultStructureStep';
import SideBar from '../../mainComponent/SideBar';
import { apiCall } from '../../../apiCalls/apiCalls';
import { createMyTest, getMyTest, getMySingleTest } from '../../../apiCalls/apiRoutes';
import { toast } from "react-toastify";


var mainObj = {
  orientation: 0,
  scoringType: 0,
  randomOrder: 0,
  timeLimit: "",
  questions: {},
  resultStructure: {
    tableSummary: false,
    graph: false

  },
  automaticText: {

  },
  freeText: {}
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

// function convertData(retObj) {
//   const obj = {
//     questions: {}
//   };

//   // Iterate through the categories and questions in retObj
//   for (const category in retObj) {
//     if (typeof retObj[category] === 'object') {
//       for (const questionId in retObj[category]) {
//         if (typeof retObj[category][questionId] === 'object') {
//           // Check if it's a free text question
//           if (retObj[category][questionId].freeText === 1) {
//             obj.questions[questionId] = {
//               question: retObj[questionId]?.question
//             };
//           } else {
//             // It's a category with multiple choice questions
//             obj.questions[questionId] = {
//               categoryName: category
//             };
//           }

//           // Iterate through the answer keys
//           for (const answerKey in retObj[category][questionId]) {
//             if (answerKey !== 'question' && answerKey !== 'category') {
//               const answerObj = retObj[category][questionId][answerKey];
//               const answerId = `${questionId}-answer-${answerKey}`;
//               obj.questions[answerId] = {
//                 answer: answerObj.answer,
//                 point: answerObj.points
//               };
//             }
//           }
//         }
//       }
//     }
//   }

//   return obj;
// }



function EditTest(props) {
  console.log(props);
  var queryParameters = new URLSearchParams(window.location.search);
  var testId = queryParameters.get("id");
  console.log(testId);
  const [newCategoryCreated, setNewCategoryCreated] = useState(0)
  const navigate = useNavigate()
  const [dto, setDto] = useState({
    id: testId
  });
  const [tabSelected, setTabSelected] = useState("PROPERTIES");
  const [categoryStore, setCategoryStore] = useState({});
  const [mainObj, setMainObj] = useState(
    {
      orientation: 0,
      scoringType: 0,
      randomOrder: 0,
      timeLimit: "",
      questions: {},
      resultStructure: {
        tableSummary: false,
        graph: false
      },
      automaticText: {
      },
      freeText: {}
    });
  useEffect(() => {
    getTestData();
  }, []);
  const getTestData = () => {
    apiCall("post", getMySingleTest, { id: testId })
      .then((response) => {
        if (response.status == 200) {
          // console.log(response?.data?.data?.rows[0]);
          // const converted = convertData(response?.data?.data?.rows[0]);
          // console.log(converted);
          // mainObj = {
          // ...response?.data?.data?.rows[0],
          // ...converted
          // };
          setMainObj(response?.data?.data);
          console.log(response?.data?.data);
          // return response?.data?.data?.rows[0];
          // setData(response?.data?.data?.rows);
          // setShowTable(true);
          // setTotalDataLenght(response?.data?.data?.count);
        } else {
          // setShowTable(false);
          return {};
        }
      })
      .catch((err) => {
        // setShowTable(false);
        console.log(err);
      });
  };

  function apiCallToCreateTest(draft) {
    apiCall('post', createMyTest, mainObj)
      .then((res) => {
        showToastMessage("Test created Successfully ", "green", 1);
        navigate('/dashboard/mytest')
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      })
  }

  function showTab(tab) {
    setTabSelected(tab)
  }
  function mainObjectAdder(e, property, questionNo, type) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [questionNo]: {
          ...mainObj[property][questionNo],
          [type]: e.target.value
        }
      }
    }
    setMainObj(main);
    // console.log("main", mainObj)
  }

  function addCategoryStoreToMain() {
    let main = {
      ...mainObj,
      categoryStore
    }
    console.log("main", mainObj)
    setMainObj(main);
  }


  function mainObjectAdderForProperties(e, property) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    if (property == 'beforeTestText' || property == 'afterTestText') {
      let main = {
        ...mainObj,
        [property]: e
      }
      setMainObj(main);
    }
    else {
      let main = {
        ...mainObj,
        [property]: e.target.value
      }
      setMainObj(main);
    }

    // console.log("main", mainObj)
  }

  function mainObjectAdderForLayout(e, property, name, value) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    // console.log(e, property, name, value)
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: value
      }
    }
    setMainObj(main);
    // console.log("main", mainObj)
  }
  function mainObjectAdderForResultStructure(e, property, name) {
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: e.target.checked
      }
    }
    setMainObj(main);
    // console.log("main", mainObj)
  }
  function mainObjectAdderForAutomaticText(e, property, name) {
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [e.target.id]: {
          ...mainObj[property][e.target.id],
          [name]: e.target.value
        }
      }
    }
    setMainObj(main);
    console.log("main", mainObj)
  }

  function getMainObj() {
    return mainObj
  }

  function handleSaveTest(e) {
    console.log("called")
    e.preventDefault();
    navigate('/dashboard/mytest')

  }

  return (<>
    <SideBar />
    <div className='dashboard-content'>

      <StepsHeader obj={{ setTabSelected, tabSelected, showTab, mainObjectAdder }} />
      <PropertiesStep obj={{ mainObjectAdderForProperties, showTab, tabSelected, mainObj, handleSaveTest, apiCallToCreateTest,mainObj }} />
      <CategoriesStep obj={{ mainObjectAdder, showTab, tabSelected, setCategoryStore, categoryStore, addCategoryStoreToMain, setNewCategoryCreated, mainObj }} />
      <QuestionStep obj={{ mainObjectAdder, showTab, tabSelected, setCategoryStore, categoryStore, mainObj, mainObjectAdder, getMainObj, newCategoryCreated }} />
      <TestLayout obj={{ mainObjectAdder, showTab, tabSelected, mainObjectAdderForLayout }} />
      <ResultStructureStep obj={{ showTab, tabSelected, mainObjectAdderForResultStructure }} />
      <AutomaticText obj={{ mainObjectAdderForAutomaticText, showTab, tabSelected, categoryStore, apiCallToCreateTest }} />

    </div>
  </>

  )
}

export default EditTest;