import { useEffect, useState } from "react";
import { getMailingList, sendMailingList } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

var testTime = 0;
var NoOfQuestions = 0;
var testNames = "";
function SendTestFunctionality({ testId }) {
  const navigate = useNavigate();

  const [mailingListData, setMailingListData] = useState("");
  const [formDataForMailingIndividual, setFormDataForMailingIndividual] =
    useState({
      email: "",
    });
  const [tempObject, setTempObject] = useState({});
  const [mailingUserArray, setmailingUserArray] = useState([]);
  const [mailingListArray, setMailingListArray] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  var emailToDeal = [];

  useEffect(() => {
    testId.map((ele) => {
      ele.map((val) => {
        console.log(val, "dasljdkjsakdjasiojeow");
        emailToDeal.push(val.id);
        testTime += parseInt(val.timeLimit);
        NoOfQuestions += parseInt(val.NoOfQuestions);
        testNames += val.nameOfTest;
      });
    });

    console.log(
      emailToDeal,
      "email to deal ",
      testTime,
      "testtime",
      NoOfQuestions,
      "NoOfQuestions",
      testNames,
      "testNames"
    );
  }, []);

  const [dto, setDto] = useState({
    id: emailToDeal,
    emails: mailingUserArray,
    mailingList: mailingListArray,
  });
  console.log(testId, "testid(((())))");
  const sendMailFunction = async () => {
    if (mailingUserArray.length > 0 || mailingListArray.length > 0) {
      try {
        setShowEditModal(true);
      } catch (err) {
        showToastMessage(err.message, "red", 2);
      }
    } else {
      showToastMessage(
        "Please Select a mailing List or add participants",
        "red",
        2
      );
    }
  };

  const getMailingLists = () => {
    apiCall(
      "post",
      getMailingList,
      {
        limit: 10,
        page: 1,
      },
      true
    )
      .then((res) => {
        console.log(res.data, "OOOOOOOOOOOOOOOOOOOO");
        setMailingListData(res.data.data.rows);
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMailingLists();
  }, []);
  const mailToIndividuals = (e) => {
    e.preventDefault();
    setShowTable(false);
    let temp = { ...formDataForMailingIndividual };
    mailingUserArray.push(temp);
    setTimeout(() => {
      setShowTable(true);
    }, 1);
    setFormDataForMailingIndividual({
      email: "",
    });
    e.target.reset();
  };
  const addToArray = (e) => {
    e.target.checked == true
      ? mailingListArray.push(e.target.id)
      : mailingListArray.indexOf(e.target.id) != -1
        ? mailingListArray.splice(mailingListArray.indexOf(e.target.id))
        : console.log(mailingListArray);
    console.log(mailingListArray);
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

  const handleClose = () => setShowEditModal(false);

  useEffect(() => {
    if (mailingUserArray.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, mailingUserArray);

  const [showMailingLists, setShowMailingLists] = useState(false);
  return (
    <div className="sendTestMain">
      <Modal show={showEditModal} onHide={handleClose} animation={false}>
        <Modal.Body className="mt-5" style={{ textAlign: "center" }}>
          <h5>Name of the Test</h5>
          <p>{testNames}</p>
          <h5>The shipment will be made to </h5>
          {mailingUserArray.length !== 0 &&
            mailingUserArray.map((ele) => {
              return <>{ele.email}</>;
            })}

          <h5>The test has {NoOfQuestions} questions</h5>
          <h5>
            {" "}
            {testTime
              ? `The time limit for the test is ${testTime} minutes`
              : "The test is not Limited to time"}{" "}
          </h5>
          <h5 className="mb-5">You can add message to the receipt</h5>
          <textarea
            className="w-100"
            style={{ height: "14vh" }}
            placeholder="Enter a note"
            id="note"
            onChange={(e) => {
              setDto((prev) => {
                return { ...prev, ["note"]: e.target.value };
              });
            }}
          />
          <button
            onClick={async () => {
              const resp = await apiCall("post", sendMailingList, dto, true);
              if (resp.status === 200) {
                showToastMessage("Test's send successfully", "green", 1);
                // setShowEditModal(false)
                window.location.reload()
                // navigate('/dashboard/mytest', { sent: 'true' })


              } else {
                showToastMessage(
                  "Server Error Please try again later",
                  "red",
                  2
                );
              }
            }}
          >
            Send
          </button>
        </Modal.Body>
      </Modal>
      <div>
        <h3 className="m-5">Step 2 Selection of recipient(s)</h3>
        <div>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <form onSubmit={mailToIndividuals}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                 <div className="w-25 m-2">
                  <label for="exampleFormControlInput1">
                    Enter email of Testee
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="form-control m-auto"
                    onChange={(e) => {
                      formDataForMailingIndividual["email"] = e.target.value;
                    }}
                    required
                  />
                </div>
                <div className="w-25 m-2">
                  <label for="exampleFormControlInput1">
                    Enter name of Testee (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="form-control m-auto"
                    onChange={(e) => {
                      formDataForMailingIndividual["name"] = e.target.value;
                    }}
                  />
                </div>
               
                <div>
                  <button type="submit">Add</button>
                </div>
                <h4>Or </h4>
                <button
                  onClick={() => {
                    setShowMailingLists(true);
                  }}
                >
                  Select a mailing list
                </button>
              </div>
            </form>
          </div>

          <div className="w-100">
            {showMailingLists && (
              <div>
                <h3>Mailing List</h3>
                {mailingListData.length !== 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mailingListData?.map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{ele.name}</td>
                            <td>
                              <input
                                type="checkbox"
                                id={ele.id}
                                onClick={(e) => {
                                  addToArray(e);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    <button className="btn btn-primary">
                      Create mailing List
                    </button>
                  </div>
                )}
              </div>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {mailingUserArray.length > 0 &&
                  mailingUserArray.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td
                          id={index}
                          onClick={(e) => {
                            setShowTable(false);
                            mailingUserArray.splice(index, 1);
                            console.log(mailingUserArray);
                            setTimeout(() => {
                              setShowTable(true);
                            }, 1);
                          }}
                        >
                          delete
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          sendMailFunction();
        }}
      >
        Send
      </button>
    </div>
  );
}
export default SendTestFunctionality;
