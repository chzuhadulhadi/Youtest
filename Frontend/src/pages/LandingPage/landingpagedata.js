import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  getQuestionaireHistoryList,
  getResult,
} from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { frontEndPath } from "../../apiCalls/apiRoutes";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
function LandingPageData() {
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState();
  const [currentRecords, setCurrentRecord] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [dto, setDto] = useState({
    limit: 50,
    page: 1,
  });
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
    apiCall("post", getQuestionaireHistoryList, dto, true)
      .then((res) => {
        const filteredData = res.data.data.rows.filter(value => value.landingPageData?.email);
        console.log(filteredData);
        console.log("res", filteredData[0]?.landingPageData);
        
        setTotalDataLenght(filteredData.length);
        setTotalPages(Math.ceil(filteredData.length / postsPerPage));
        setCurrentRecord(filteredData);
        getResultScore(filteredData);
      })
      .catch((er) => console.log(""));
  }
  useEffect(() => {
    getAllHistoryListing();
  }, []);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
    setDto({ ...dto, page: selected + 1 });
  };
  function getTestStatus(testObj) {
    var status = "";
    if (testObj.testStart == null) {
      status = "Test Not started";
    } else if (testObj.testStart != null && testObj.testEnd == null) {
      status = "Test Started";
    } else if (testObj.testStart != null && testObj.testEnd != null) {
      status = "Test Ended";
    }
    return status;
  }

  async function getResultScore(allRows) {
    for (let singleRow of allRows) {
      apiCall("post", getResult, { id: singleRow.id }).then((res) => {
        if (res.status == 200) {
          const data = res.data.data;

          if (data.id && data.resultStats) {
            // console.log("data.resultStats", data.resultStats)
            setResultsWithIds((prevState) => {
              let name = Object.assign({}, prevState); // creating copy of state variable jasper
              name[singleRow.id] = (
                data.resultStats?.totalPercentage /
                data.resultStats?.totalCategories
              ).toFixed(1);

              return name; // return new object jasper object
            });
            // console.log("res", resultsWithIds);
          }
        }
      });
    }
  }
  // Function to export the table data to Excel
  function exportToExcel() {
    const transformedData = transformDataForExport(currentRecords);

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `LandingPageData-${date.toLocaleDateString('en-GB')}.xlsx`);
  }

  // Function to transform data for export
  function transformDataForExport(data) {
    // select only the columns where a email is present
    data = data.filter((value) => value.landingPageData?.email);
    return data.map((ele, index) => ({
      "#": index + 1,
      "First Name": ele.landingPageData.firstName,
      "Last Name": ele.landingPageData.lastName,
      Email: ele.userEmail,
      "Phone No": ele.landingPageData.phoneNumber,
      "Email OK":
        ele.landingPageData.termAndCondition === true ? "Agree" : "Disagree",
      Test: `Test Link: ${frontEndPath}filltest/${ele.id}`,
      "Test Date": new Date(ele.createdAt)
        .toLocaleDateString('en-GB')
        .padStart(10, "0"),
      Status: getTestStatus(ele),
      Score: `${resultsWithIds[ele.id]} %`,
      "Result Link": `Result Link: /resultpage/${ele.id}`,
    }));
  }

  return (
    <div className="questionaireHistory w-[90%] mx-auto">
      <button
        className="w-1/2 md:w-1/4 mt-2"
        style={{ position: "relative", right: "20px" }}
        onClick={exportToExcel}
      >
        {" "}
        Export Data
      </button>
      <div className="overflow-x-auto w-full">
        <table className="table mt-4" id="myTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">PhoneNo</th>
              <th scope="col">Email OK</th>
              <th scope="col">Test</th>
              <th scope="col">Test Date</th>
              <th scope="col">Status</th>
              <th scope="col">Score</th>
              <th scope="col">Result Link</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords
              ?.filter((value) => value.landingPageData?.email)
              .map((ele, index) => {
                console.log("ele.landingPageData", ele.landingPageData);
                return (
                  <tr key={index}>
                    <td style={{ fontSize: "14px" }}>{ele.id}</td>
                    <td style={{ fontSize: "14px" }}>
                      {ele.landingPageData.firstName}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {ele.landingPageData.lastName}
                    </td>
                    <td style={{ fontSize: "14px" }}>{ele.userEmail}</td>
                    <td style={{ fontSize: "14px" }}>
                      {ele.landingPageData.phoneNumber}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {ele.landingPageData.termAndCondition == true
                        ? "Agree"
                        : "Disagree"}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <a
                        target="blank"
                        style={{ textDecoration: "underline" }}
                        href={frontEndPath + "filltest/" + ele.id}
                      >
                        Test Link
                      </a>
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {new Date(ele.createdAt)
                        .toLocaleDateString('en-GB')
                        .padStart(10, "0")}
                    </td>
                    <td style={{ fontSize: "14px" }}>{getTestStatus(ele)}</td>
                    <td style={{ fontSize: "14px" }}>
                      {resultsWithIds[ele.id]} %
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <a
                        target="blank"
                        style={{ textDecoration: "underline" }}
                        href={"/resultpage/" + ele.id}
                      >
                        See Result
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {totalDataLenght > postsPerPage && (
        <ReactPaginate
          onPageChange={paginate}
          pageCount={totalPages}
          nextLabel="next >"
          pageRangeDisplayed={3}
          previousLabel="< previous"
          breakLabel={"..."}
          breakClassName={'break-me'}
          marginPagesDisplayed={5}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
}
export default LandingPageData;
