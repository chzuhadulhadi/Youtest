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
import { createMyTest } from '../../../apiCalls/apiRoutes';
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

function CreateTest() {
  const [newCategoryCreated, setNewCategoryCreated] = useState(0)
  const navigate = useNavigate()

  const [tabSelected, setTabSelected] = useState("PROPERTIES");
  const [categoryStore, setCategoryStore] = useState({});
  // const [mainObj, setMainObj] = useState({
  //   orientation: 0,
  //   scoringType: 0,
  //   randomOrder: 0,
  //   questions: {}
  // });

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
    mainObj = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [questionNo]: {
          ...mainObj[property][questionNo],
          [type]: e.target.value
        }
      }
    }
    console.log("main", mainObj)
  }

  function addCategoryStoreToMain() {
    mainObj = {
      ...mainObj,
      categoryStore
    }
    console.log("main", mainObj)

  }


  function mainObjectAdderForProperties(e, property) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    if (property == 'beforeTestText' || property == 'afterTestText') {
      mainObj = {
        ...mainObj,
        [property]: e
      }
    }
    else {
      mainObj = {
        ...mainObj,
        [property]: e.target.value
      }
    }

    console.log("main", mainObj)
  }

  function mainObjectAdderForLayout(e, property, name, value) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    console.log(e, property, name, value)
    mainObj = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: value
      }
    }
    console.log("main", mainObj)
  }
  function mainObjectAdderForResultStructure(e, property, name) {
    mainObj = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: e.target.checked
      }
    }
    console.log("main", mainObj)
  }
  function mainObjectAdderForAutomaticText(e, property, name) {
    mainObj = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [e.target.id]: {
          ...mainObj[property][e.target.id],
          [name]: e.target.value
        }
      }
    }
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
      <PropertiesStep obj={{ mainObjectAdderForProperties, showTab, tabSelected, mainObj, handleSaveTest, apiCallToCreateTest }} />
      <CategoriesStep obj={{ mainObjectAdder, showTab, tabSelected, setCategoryStore, categoryStore, addCategoryStoreToMain, setNewCategoryCreated, mainObj }} />
      <QuestionStep obj={{ mainObjectAdder, showTab, tabSelected, setCategoryStore, categoryStore, mainObj, mainObjectAdder, getMainObj, newCategoryCreated }} />
      <TestLayout obj={{ mainObjectAdder, showTab, tabSelected, mainObjectAdderForLayout }} />
      <ResultStructureStep obj={{ showTab, tabSelected, mainObjectAdderForResultStructure }} />
      <AutomaticText obj={{ mainObjectAdderForAutomaticText, showTab, tabSelected, categoryStore, apiCallToCreateTest }} />

    </div>
  </>

  )
}

export default CreateTest;