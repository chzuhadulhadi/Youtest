import "./listing.css";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { apiCall } from "../../apiCalls/apiCalls";
import {
  addMailingList,
  getMailingList,
  getMailingListUser,
  deleteMailingList,
  updateMailingList,
  addMailingListUser,
  deleteUserInMailingListApi,
  editUserOfMailingList
} from "../../apiCalls/apiRoutes";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddUserInList() {
  <ToastContainer
    position="bottom-center"
    autoClose={2000}
    hideProgressBar={true}
  />;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [mailingLists, setMailingList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [totalDataLenght, setTotalDataLenght] = useState(40);
  const [rendControl, setRendControl] = useState(false);
  const [listDto, setListDto] = useState({
    name: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editListDto, setEditListDto] = useState({
    id: null,
    name: "",
  });

  const [addNewUserInList, setAddNewUserInList] = useState({
    name: "",
    email: "",
    mailingListId: null,
  });

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

  const submitHandler = (e) => {
    e.preventDefault();
    apiCall("post", addMailingList, listDto, true)
      .then((res) => {
        console.log(res);
        showToastMessage("Mailing List added Successfully ", "green", 1);
        setForceRender(!forceRender);
        setShow(false);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    getAllMailingList();
  }, [currentPage, forceRender]);

  const [mailingListData, setMailingListData] = useState({
    limit: postsPerPage,
    page: currentPage,
  });

  const getAllMailingList = () => {
    apiCall("post", getMailingList, mailingListData, true)
      .then((res) => {
        setMailingList(res?.data?.data?.rows);
        setTotalDataLenght(res?.data?.data?.count);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const addNewMailingList = () => {
    return (
      <Modal.Body>
        <form className="userform" onSubmit={submitHandler}>
          <h4> Add name of new in mailing list</h4>
          <input
            type="text"
            onChange={(e) => {
              setListDto({ name: e.target.value });
            }}
            placeholder="Name..."
            className="form-control"
            required
          />
          <button type="submit" className="btn btn-primary center">
            Submit
          </button>
        </form>
      </Modal.Body>
    );
  };
  function getMailingListUserFunction() {
    apiCall(
      "post",
      getMailingListUser,
      {
        id: parseInt(addNewUserInList.mailingListId),
        limit: 1000,
        page: 1,
      },
      true
    )
      .then((res) => {
        setUsersList(res.data.data);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
        console.log(err);
      });
  }
  useEffect(() => {
    addNewUserInList.mailingListId &&
      apiCall(
        "post",
        getMailingListUser,
        {
          id: parseInt(addNewUserInList.mailingListId),
          limit: 1000,
          page: 1,
        },
        true
      )
        .then((res) => {
          setUsersList(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          showToastMessage(err?.response?.data?.message, "red", 2);
          console.log(err);
        });
  }, [addNewUserInList.mailingListId]);
  const newUsersubmitHandler = (e) => {
    e.preventDefault();
    setRendControl(!rendControl);
    addNewUserInList.mailingListId = addNewUserInList.mailingListId;
    apiCall("post", addMailingListUser, addNewUserInList, true)
      .then((res) => {
        console.log(res.data);
        showToastMessage("New user Added Successfully", "green", 1);
        // setShow(false)
        getMailingListUserFunction();
        setRendControl(!rendControl);
      })
      .then((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const setValuesForAddUserInMailingList = (e) => {
    setAddNewUserInList((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const addNewUserInMailingList = () => {
    return (
      <Modal.Body>
        <form className="userform" onSubmit={newUsersubmitHandler}>
          <h4> Add user in mailing list</h4>
          <input
            type="text"
            onChange={(e) => {
              setValuesForAddUserInMailingList(e);
            }}
            id="name"
            placeholder="Name..."
            className="form-control mb-2"
            required
          />
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setValuesForAddUserInMailingList(e);
            }}
            placeholder="Email..."
            className="form-control"
            required
          />
          <button type="submit" className="btn btn-primary center">
            Submit
          </button>
        </form>
        <h3> Users List</h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {console.log("usersList", usersList)}
              {usersList?.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{isEdit[index] ? <input type="text" /> : res?.name}</td>
                    <td>{res?.email}</td>
                    <td>
                      <span id={index} onClick={() => {
                        clickDetector("Edit User In Mailing List", 'editUserInMailingList' , res?.id , res)
                      }}>
                        edit
                      </span>{" "}
                      |{" "}
                      <span
                        id={res?.id}
                        onClick={(e) => {
                          deleteUsersFromMailingList(e.target.id);
                        }}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    );
  };

  const editMailingList = () => {
    return (
      <Modal.Body>
        <form className="userform" onSubmit={editUsersubmitHandler}>
          <h4> Edit mailing list</h4>
          <input
            type="text"
            onChange={(e) => {
              setEditListDto({ name: e.target.value });
            }}
            id="name"
            placeholder="Name..."
            className="form-control"
            required
          />

          <button type="submit" className="btn btn-primary center">
            Submit
          </button>
        </form>
      </Modal.Body>
    );
  };
  const editUsersubmitHandler = (e) => {
    e.preventDefault();
    editListDto.id = addNewUserInList.mailingListId;
    apiCall("post", updateMailingList, editListDto, true)
      .then((res) => {
        showToastMessage("Mailing List updated Successfully", "green", 1);
        setForceRender(!forceRender);
        setShow(false);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const deleteUserInMailingList = () => {
    return (
      <div style={{ display: "flex" }}>
        <button
          className="btn btn-primary w-50"
          onClick={() => {
            apiCall(
              "post",
              deleteMailingList,
              { id: addNewUserInList.mailingListId },
              true
            )
              .then((res) => {
                showToastMessage(
                  "Mailing List deleted Successfully",
                  "green",
                  1
                );
                setForceRender(!forceRender);
                setShow(false);
              })
              .catch((err) => {
                showToastMessage(err?.response?.data?.message, "red", 2);
              });
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-primary w-50"
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </button>
      </div>
    );
  };

  const deleteUsersFromMailingList = (data) => {
    apiCall("post", deleteUserInMailingListApi, { id: data }, true)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickDetector = (title, tabtoshow, selectedId,queryObj) => {
    if (tabtoshow =="editUserInMailingList"){
      console.log(queryObj)
      setIsEdit({
        id: queryObj?.id,
        name: queryObj?.name,
        email: queryObj?.email
      })
    }
    selectedId && (addNewUserInList.mailingListId = selectedId);
    console.log(selectedId);
    setModalTitle(title);
    setSelectedTab(tabtoshow);
    setShow(true);
  };

  const editUserInFormSubmitHandler = (e) => {
    e.preventDefault();
    apiCall("post", editUserOfMailingList, { isEdit }, true)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editUserMailingList = () => {
    return (
      <Modal.Body>
        <form className="userform" onSubmit={editUserInFormSubmitHandler}>
          <input
            type="text"
            onChange={(e) => {
              setIsEdit({ name: e.target.value });
            }}
            value={isEdit["name"]}
            className="form-control"
            required
          />
          <input
            type="email"
            onChange={(e) => {
              setIsEdit({ email: e.target.value });
            }}
            value={isEdit["email"]}
          />
          <button type="submit" className="btn btn-primary center">
            Submit
          </button>
        </form>
      </Modal.Body>
    );
  };
  return (
    <div className="userlist">
      <div className="mainsection">
        <div className="Pricing_sec" id="pricing">
          <div className="Center">
            <h2>Mailing List</h2>

            <div className="Line"></div>
            <Button
              variant="primary"
              onClick={() => {
                clickDetector("Add New Mailing List", "addMailingList");
              }}
            >
              Create New Mailing List
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              {selectedTab == "addMailingList" && addNewMailingList()}
              {selectedTab == "addNewUserInMailingList" &&
                addNewUserInMailingList()}
              {selectedTab == "deleteUserInMailingList" &&
                deleteUserInMailingList()}
              {selectedTab == "editMailingList" && editMailingList()}
              {selectedTab == "editUserInMailingList" && editUserMailingList()}
            </Modal>

            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mailing List Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mailingLists?.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{element.name}</td>
                        <td>
                          <span
                            className="btn"
                            style={{
                              backgroundColor: "#FF9000",
                              color: "white",
                            }}
                            onClick={() => {
                              clickDetector(
                                "Users in Mailing List",
                                "addNewUserInMailingList",
                                element.id
                              );
                            }}
                          >
                            view
                          </span>
                          |
                          <span
                            className="btn"
                            style={{
                              backgroundColor: "#FF9000",
                              color: "white",
                            }}
                            onClick={() => {
                              clickDetector(
                                "Are you sure You want to Delete",
                                "deleteUserInMailingList",
                                element.id
                              );
                            }}
                          >
                            {" "}
                            delete{" "}
                          </span>{" "}
                          |{" "}
                          <span
                            className="btn"
                            style={{
                              backgroundColor: "#FF9000",
                              color: "white",
                            }}
                            onClick={() => {
                              clickDetector(
                                "Edit the user in List",
                                "editMailingList",
                                element.id
                              );
                            }}
                          >
                            Edit{" "}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className=" paginate">
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
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddUserInList;
