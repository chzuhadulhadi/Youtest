import "./style.css";
import { apiCall } from "../../apiCalls/apiCalls";
import Modal from "react-bootstrap/Modal";
import {
  getLandingPage,
  updateLandingPage,
  deleteLandingPage,
  getMailingList,
  getMyTest,
  linkTest,
  viewAttachedTests,
  pathToViewTest
} from "../../apiCalls/apiRoutes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoutes } from "react-router-dom";
import ReactPaginate from "react-paginate";
function Paper() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [MailingListDTO, setMailingListDTO] = useState({
    limit: 10,
    page: 1,
  });
  const [getAllTestsAttached, setGetAllTestsAttached] = useState({
      limit:10,
      page:1,
      id:1
  })
  const [modalHandler, setModalHandler] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [elementId, setElementId] = useState("");
  const [responseMailingList, setResponseMailingList] = useState([]);
  const [allLandingPages, setAllLandingPages] = useState([]);
  const [rendControl, setRendControl] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState(30);
  const [currentRecords, setCurrentRecord] = useState([]);
  const [isEdit, setIsEdit] = useState({});
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

  const getAllLandingPages = () => {
    apiCall(
      "post",
      getLandingPage,
      {
        limit: postsPerPage,
        page: currentPage,
      },
      true
    )
      .then((res) => {
        setAllLandingPages(res.data.data.rows);
        setTotalDataLenght(res.data.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMailingListData = () => {
    apiCall("post", getMyTest, MailingListDTO, true)
      .then((res) => {
        setResponseMailingList(res?.data?.data?.rows);
        setTotalDataLenght(res?.data?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllLandingPages();
  }, [rendControl, currentPage]);

  useEffect(() => {
    getMailingListData();
  }, [rendControl]);

const getAllAttachedTest = async() =>{

  apiCall('post' , viewAttachedTests , getAllTestsAttached , true)
  .then((res)=>{
console.log(res.data.data.rows,"dadii")
setCurrentRecord(res?.data?.data?.rows)
  }).catch((err)=>{
    console.log(err)
  })
}

  const deleteModal = () => {
    return (
      <Modal.Body>
        <h3>Are you sure ? </h3>
        <button
          onClick={() => {
            deleteLandingPageFunction();
          }}
        >
          Yes
        </button>{" "}
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </button>
      </Modal.Body>
    );
  };
var array = []
const checkboxFunctionality = (e) =>{
if(e.target.checked){
  array.push(e.target.id)
}
else{
 const indexs=  array.indexOf(e.target.id)
 array.splice(indexs,1)
}
}


const showAttachedTestModal = () =>{
  return (
    <Modal.Body>
      <h3>List of attached tests </h3>
      <table style={{width:"100%"}} >
        <thead>
          <tr style={{textAlign:'center'}}>
            <th>
              No
            </th>
            <th>
              User
            </th>
            <th>
              Email Id
            </th>
            <th>
              Link
            </th>
          </tr>
        </thead>
    <tbody>
      
{
  (currentRecords.length !== 0 ) ? 
  currentRecords.map((ele,index)=>{
    console.log(ele,"pop")
    const url = pathToViewTest + "/"+ele?.userTest?.id
    return(
<tr key={index}>
<td>{index} </td>
<td>{ele?.userTest?.user?.fullName} </td>
<td>{ele?.userTest?.user?.email}</td>
<td style={{color:'blue', cursor:"pointer"}} onClick={()=>{window.location.replace(url)}}>{url}</td>
</tr>
    )
  })

  : <p>No attached Test</p>
}
</tbody>
</table>

      <button
        onClick={() => {
          setShow(false);
        }}
      >
        Cancel
      </button>
    </Modal.Body>
  );
}

  const showModalForLink = () =>{
    return (
      <Modal.Body>
        <h3>Select the test </h3>
        {responseMailingList.length ? (
                      responseMailingList.map((res) => {
                        console.log(res);
                        return (
                        <>
                       <label>{res?.name} <input type="checkbox" onChange={checkboxFunctionality} id={res.id}/></label>
                      </>)
                      })
                    ) : (
                      <div></div>
                    )}
        <button
          onClick={() => {
           if (array == []){
            showToastMessage("Please select one Test", "red", 2);
           }
           else{
            apiCall('post',linkTest, {id : array ,landingPageId : 1},true)
            .then((res)=>{
              showToastMessage("Linked Successfully", "green", 1);
            })
            .catch((err)=>{
              showToastMessage(err?.response?.data?.message, "red", 2);
            })
           }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </button>
      </Modal.Body>
    );
  }

  const editLandingPage = () => {
    apiCall("post", editLandingPage, { id: elementId }, true)
      .then((res) => {
        console.log(res);
        showToastMessage("Landing page updated Successfully ", "green", 1);

        setRendControl(!rendControl);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const deleteLandingPageFunction = () => {
    apiCall("post", deleteLandingPage, { id: elementId }, true)
      .then((res) => {
        console.log(res);
        showToastMessage("Landing page deleted Successfully ", "green", 1);
        setRendControl(!rendControl);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectChangeFunctionality = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
  };
  const showFunction = (param) => {
    document.getElementById("htmlDiv").innerHTML = param;
  };

  var element = document.getElementsByName("formfieldDynamic");
  if (element) {
    console.log(element);
  }

  const editModal = () => {
    return <Modal.Body></Modal.Body>;
  };

  return (
    <div className="paper">
      <h1>Landing pages</h1>

      <button
        onClick={() => {
          navigate("/dashboard/landingpage");
        }}
      >
        Create Landing page
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        {modalHandler == "deleteModal" && deleteModal()}
        {modalHandler == "editModal" && editModal()}
        {modalHandler == "linkModal" && showModalForLink()}
        {modalHandler == "showAttachedTestModal" && showAttachedTestModal()}
      </Modal>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {allLandingPages.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <span
                    id={ele?.html}
                    onClick={() => {
                      showFunction(ele?.html);
                    }}
                  >
                    View Html
                  </span>
                </td>
                <td style={{ width: "15vw" }}>
                  <span onClick={()=>{
                    setModalHandler("linkModal");
                    setShow(true);
                  }}>
                   Link Tests
                   
                  </span> | 
                  <span
                    onClick={() => {
                      setModalHandler("deleteModal");
                      setShow(true);
                      setElementId(ele.id);
                      setModalTitle("Delete an entry ?");
                    }}
                  >
                    Delete
                  </span>
                  |
                  <span
                    onClick={() => {
                      navigate(`/dashboard/editLandingPage/?id=${ele?.id}`);
                    }}
                  >
                    Edit
                  </span>
                  | <span 
                  onClick={()=>{
                    setModalHandler("showAttachedTestModal");
                    setShow(true);
                    getAllTestsAttached['id'] = ele?.id
                    setModalTitle("Total attached Test");
                    getAllAttachedTest()
                  }}>
                    View Attached Tests
                  </span>
                </td>
              </tr>
            );
          })}
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
      </div>

      <div id="htmlDiv"></div>
    </div>
  );
}
export default Paper;
