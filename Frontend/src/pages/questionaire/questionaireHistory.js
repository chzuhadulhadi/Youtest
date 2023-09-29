import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getQuestionaireHistoryList, getResult } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
function QuestionaireHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState();
  const [currentRecords, setCurrentRecord] = useState([]);
  const [dto, seDto] = useState({
    limit: 10,
    page: 1
  })
  const date = new Date();
  const [selectedField, setSelectedField] = useState(1);

  const [resultsWithIds, setResultsWithIds] = useState({});


  function searchParam() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[selectedField];
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

  function getAllHistoryListing() {
    apiCall('post', getQuestionaireHistoryList, dto, true)
      .then((res) => {
        setTotalDataLenght(res?.data?.data?.count)
        setCurrentRecord(res?.data?.data?.rows)
        getResultScore(res?.data?.data?.rows)
      })
      .catch(er => console.log)
  }
  useEffect(() => {
    getAllHistoryListing()
  }, [])

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  function getTestStatus(testObj) {
    var status = "";
    if (testObj.testStart == null) {
      status = "Test Not started"
    }
    else if (testObj.testStart != null && testObj.testEnd == null) {
      status = "Test Started"
    }
    else if (testObj.testStart != null && testObj.testEnd != null) {
      status = "Test Ended"
    }
    return status;
  }

  async function getResultScore(allRows) {
    for (let singleRow of allRows) {
      apiCall('post', getResult, { "id": singleRow.id })
        .then((res) => {
          if (res.status == 200) {
            const data = res.data.data;

            if (data.id && data.resultStats) {
              console.log("data.resultStats", data.resultStats)
              setResultsWithIds(prevState => {
                let name = Object.assign({}, prevState);  // creating copy of state variable jasper
                name[singleRow.id] = (data.resultStats?.totalPercentage / data.resultStats?.totalQuestion).toFixed(1);

                return name;                                 // return new object jasper object
              })
              // console.log("res", resultsWithIds);
            }
          }
        })
    }

  }

  return (
    <div className="questionaireHistory">
      <input
        type="text"
        placeholder="Search ..."
        id="myInput"
        onChange={searchParam}
      />
      <select
        onChange={(e) => {
          setSelectedField(e.target.value);
        }}
      >
        <option value="1">Name</option>
        <option value="2">Date created</option>
        <option value="3">Analytics</option>
      </select>
      <table className="table" id="myTable">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">created</th>
            <th scope="col">Time Taken</th>
            <th scope="col">status</th>
            <th scope="col">Score</th>


            {/* <th scope="col">Orientation</th> */}
            {/* <th scope="col">Time Limit</th> */}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            currentRecords?.map((ele, index) => {
              return (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.userEmail}</td>
                  <td>{ele.createdAt}</td>
                  <td>{((Math.abs(new Date(ele.testEnd) - new Date(ele.testStart))) / 1000 / 60).toFixed(2)} Min</td>
                  {/* {console.log("getResultScore(ele.id) ", getResultScore(ele.id))}
                  {console.log("getTestStatus(ele)(ele.id) ", getTestStatus(ele))} */}

                  <td>{getTestStatus(ele)}</td>
                  <td>{resultsWithIds[ele.id]} %</td>



                  {/* <td>{ele.orientation}</td> */}
                  {/* <td>{ele.timeLimit}</td> */}
                  {/* <td>View | Edit | Delete</td>
                   */}
                  <td ><a target="blank" style={{ textDecoration: "underline" }} href={"/resultpage/" + ele.id}>See Result</a></td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
      <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(totalDataLenght / postsPerPage)}
        previousLabel={"<"}
        nextLabel={">"}
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeLinkClassName={"active"}
      />
    </div >
  );
}
export default QuestionaireHistory;
