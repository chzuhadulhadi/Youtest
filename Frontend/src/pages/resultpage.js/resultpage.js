
import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react';
import Charts from './chart';
import Button from 'react-bootstrap/Button';
import { getResult } from '../../apiCalls/apiRoutes'
import { apiCall } from "../../apiCalls/apiCalls";
import TableRows from './components/tablerows';

function ResultPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [uuid, setUuid] = useState();
  const [invalidResult, setInvalidResult] = useState(0);
  const [formObj, setFormObj] = useState({});
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const url = window.location.href.split("/");
    setUuid(url[url.length - 1]);
    apiCall('post', getResult, { id: url[url.length - 1] })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.data;
          setFormObj(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name = data;
            return name;                                 // return new object jasper object
          })

          setCategoryData(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name = data.testObj;
            return name;                                 // return new object jasper object
          })
        }
        else {

        }
      }).catch((e) => {
        console.log(e)
        setInvalidResult(1);
      })

  }, [])

  function getTestStatus(testObj) {
    console.log("testObj", testObj)
    var status = "";
    if (testObj.testStart == null) {
      status = "The Test has Not started"
    }
    else if (testObj.testStart != null && testObj.testEnd == null) {
      status = "The Test is in progress"
    }
    else if (testObj.testStart != null && testObj.testEnd != null) {
      status = "The Test is complete"
    }
    return status;
  }

  return (
    <div className='resultpage'>
      {(!invalidResult && formObj && formObj.id) && (
        <div>
          <div className='result-header'>
            <h1 style={{ textAlign: 'center' }}>
              {formObj.userEmail}
            </h1>
            <h5>{getTestStatus(formObj)}</h5>
            <h5>
              The Examinee answered {' '}
              {formObj.resultStats.totalAnswer} {' '}

              questions out of {formObj.resultStats.totalQuestion}
              {''} Duration : {''} {formObj.resultStats.timeTakenForTest} {' Mins'}
            </h5>
          </div>
          <table class="table result-table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Percentage</th>
                {/* <th scope="col">Remarks</th> */}

              </tr>
            </thead>

            <TableRows data={formObj} />
            <tbody>
              <tr style={{ "background-color": "yellow" }}><td>Total</td>
                <td> {(formObj.resultStats.totalPercentage / formObj.resultStats.totalCategories) ? (formObj.resultStats.totalPercentage / formObj.resultStats.totalCategories) : 0}
                  {" "}%
                </td>
              </tr>
            </tbody>
          </table>


          {/* Automatic text */}
          <div className='automatic-text'>
            <h6>
              Examinee Comments
            </h6>
          </div>

          <div>
            {formObj.result &&
              formObj.result.map(function (categories) {
                return (
                  <div>
                    {categories.text}
                  </div>
                )
              })
            }
          </div>
          {/* Automatic text ends */}


          <div className='chart'>
            <Charts dataRecieved={formObj.result} />
          </div>

          <div class="examinee-comments">
            <h5>Examinee Comments</h5>
            {

              Object.keys(categoryData).map(function (key) {
                return (
                  <div className='examinee-comments-box'>
                    {Object.keys(categoryData[key]).map(function (questionKey) {
                      return (
                        <>{categoryData[key][questionKey]["freeText"] == 1 && (
                          <>
                            {categoryData[key][questionKey]["question"]}
                            <br />
                            {categoryData[key][questionKey]["selectAnswer"]}
                          </>
                        )
                        }
                        </>

                      )
                    })}
                  </div>
                )
              })
            }

          </div>
        </div>
      )
      }
      {
        (invalidResult == 1) && <div>
          No result available
        </div>
      }

      <div className='terms-of-use'>
        <h6>
          Terms of Use
        </h6>
      </div>

      <div className='copyright'>
        <h6>
          TestFactory.online@2023
        </h6>
      </div>

    </div >
  )
}
export default ResultPage