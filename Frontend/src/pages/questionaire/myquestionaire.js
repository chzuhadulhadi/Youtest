import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./style.css";
import { apiCall } from "../../apiCalls/apiCalls";
import {
  getMailingList,
  getMailingListUser,
  getMyTest,
} from "../../apiCalls/apiRoutes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import SendTestFunctionality from "./sendTestFunctionality";
import { elements } from "chart.js";
function MyQuestionaire() {
  const [show, setShow] = useState(false);
  const [arrayLenght, setArrayLenght] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState();
  const [sendTest, setSendTest] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [userDataToDisplay, setUserDataToDisplay] = useState({
    id: null,
    nameOfTest: "",
    NoOfQuestions: null,
    timeLimit: 0,
  });
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  var testArray = [];
  const [userDataArray, setUserDataArray] = useState([]);

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

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const [dto, setDto] = useState({
    limit: postsPerPage,
    page: currentPage,
  });
  const getTestData = () => {
    apiCall("post", getMyTest, dto)
      .then((response) => {
        if (response.status == 200) {
          setData(response?.data?.data?.rows);
          setShowTable(true);
          setTotalDataLenght(response?.data?.data?.count);
        } else {
          setShowTable(false);
        }
      })
      .catch((err) => {
        setShowTable(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getTestData();
  }, [currentPage]);



  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const sendTestButtonCapture = () => {
sendButtonDisable ? alert("Please select at least one Test List") : 
    setSendTest(true);
  };

  function searchParam(e) {
    console.log(e.target.value);
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function questionCount(ele) {
    console.log("data received",ele)
    var total = 0;
    Object.keys(ele.testObj).map(function (key, i) {
      Object.keys(ele.testObj[key]).map(function (questions, i) {
        ++total;

      })
    });
    return total;
  }

  function checkboxFunctionality(data, e) {
    const name = data?.name;
    var obj = {
      id: data?.id,
      nameOfTest: data?.name,
      timeLimit: data?.timeLimit,
      
    };
    if (e.target.checked) {
      obj = {...obj,NoOfQuestions: questionCount(data)}
      // console.log("userDataToDisplay",data)

      // console.log("userDataToDisplay",obj)
      const newobj = {...obj}
          testArray.push(newobj);  
          setUserDataArray(oldArray => [...oldArray, testArray]);
          // console.log("newobj",newobj)
    } else {

      const indexx =  testArray.indexOf(userDataToDisplay)
      testArray.splice(indexx, 1)
    }
    setArrayLenght(testArray.length)
  }

  useEffect(() => {
    (arrayLenght !== 0) ? setSendButtonDisable(false) : setSendButtonDisable(true)
  }, [arrayLenght])

  return (
    <>
      {sendTest === false ? (
        <div className="myquestionairemain">
          <div className="questionaireTable">
            <h1>Tests List</h1>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/dashboard/mytest/createtest");
              }}
            >
              Create a new Test
            </Button>
            <input
              type="search"
              onChange={searchParam}
              placeholder="Search ... "
              className="searchInput"
              id="myInput"
            />
            <>
              <table class="table" id="myTable">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Sr No.</th>
                    <th>name</th>
                    <th>No of questions</th>
                    <th>Time in Mins</th>


                    {/* <th>orientation</th>
                  <th>Introductory Message</th>
                  <th>Ending Message</th>
                  <th> Scoring Type</th>
                  <th> Random Order</th>
                  <th>Time Limit</th>
                 */}
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 && data?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>{ele.name}</td>
                        <td>{ele.orientation == 0 ? "Single" : "One By One"}</td>
                        <td
                          dangerouslySetInnerHTML={{ __html: ele.beforeTestText }}
                        >
                        </td>
                        <td
                          dangerouslySetInnerHTML={{ __html: ele.afterTestText }}
                        ></td>
                        <td>{ele.scoringType == 0 ? "Answers could be only totally right or totally wrong" : "Answers could be right, wrong and the shades that in between"}</td>
                        <td>{ele.randomOrder == 0 ? "Random" : "Sequence"}</td>
                        <td>{ele.timeLimit}</td> */}
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                checkboxFunctionality(ele, e);
                              }}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{ele.name}</td>
                          <td>{questionCount(ele)}</td>
                          <td>{ele.timeLimit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <button
                   
                    onClick={(e) => {
                      sendTestButtonCapture()
                    }}
                  >
                    Send Test
                  </button>
                </table>
            </>
          </div>
        </div>
      ) : (
        <SendTestFunctionality testId={userDataArray} />
      )}
    </>
  )
}
export default MyQuestionaire;