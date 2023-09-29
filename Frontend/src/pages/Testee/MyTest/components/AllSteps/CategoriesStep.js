import React, { Component, useEffect, useState } from "react";

// import '../../style.css'
import "./steps.css";
import Modal from "react-bootstrap/Modal";

var categoryCounter = 0;
function CategoriesStep(props) {
  const [categoryadder, setCategoryAdder] = useState(0);
  const [html, setHtml] = useState({});
  const [categoryHaveData, setCategoryHaveData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState({
    noOfQuestions: null,
    categoryName: ""
  })

  const [originalCat, setOriginalCat] = useState({
    noOfQuestions: null,
    categoryName: ""
  })


  useEffect(() => {
    if (Object.keys(props.obj.categoryStore).length > 0) {
      setCategoryHaveData(true);
    } else {
      setCategoryHaveData(false);
    }
  }, [props.obj.categoryStore]);
  const categoryValueAdder = (e, name) => {
    props.obj.setCategoryStore((prev) => {
      let prevObj = Object.assign({}, prev);
      prevObj[categoryCounter]
        ? (prevObj[categoryCounter] = { ...prevObj[categoryCounter] })
        : (prevObj[categoryCounter] = { categoryName: "", noOfQuestion: 0 });
      prevObj[categoryCounter][name] = e.target.value;

      return {
        ...prevObj,
      };
    });
    return 0;
  };
  function addCategory(e) {
    e.preventDefault();
    document.getElementById("category-form").reset();
    ++categoryCounter;
    props.obj.addCategoryStoreToMain();
    props.obj.setNewCategoryCreated(categoryadder + 1)
    setCategoryAdder(categoryadder + 1)
  }
  function deleteCategory(e) {
    setCategoryHaveData(false);
    delete props.obj.categoryStore[e.target.id];
    setTimeout(() => {
      setCategoryHaveData(true);
    }, 30);
  }

  const editFunctionality = (e) => {
    setSelectedCategory(e);
    const catName = document.getElementById("categoryName" + e.index)
    const catQuestionNo = document.getElementById("noOfQuestions" + e.index)

    const Name = catName?.innerText
    const QsNo = catQuestionNo?.innerText
    setSelectedCat({
      categoryName: Name,
      noOfQuestions: QsNo
    })

    setOriginalCat({
      categoryName: Name,
      noOfQuestions: QsNo
    })

    setShowEditModal(true);
  };

  const handleClose = () => setShowEditModal(false);

  const editHandler = (e, selectedOne) => {

    //Remove previous 

    setSelectedCat((prev) => {
      return { ...prev, [e.target.id]: e.target.value }
    })
    var slctedone = document.getElementById(selectedOne + selectedCategory?.index)
    slctedone.innerHTML = e.target.value
    props.obj.setCategoryStore((prev) => {
      let prevObj = Object.assign({}, prev);
      prevObj[selectedCategory?.index]
        ? (prevObj[selectedCategory?.index] = { ...prevObj[selectedCategory?.index] })
        : (prevObj[selectedCategory?.index] = { categoryName: "", noOfQuestion: 0 });
      prevObj[selectedCategory?.index][selectedOne] = e.target.value;

      return {
        ...prevObj,
      };
    });
  }

  function handleCategoryEditForm() {
    props.obj.setNewCategoryCreated(categoryadder + 1)
    setCategoryAdder(categoryadder + 1)
    props.obj.addCategoryStoreToMain();
    Object.keys(props.obj.mainObj.questions).map((key) => {
      if (props.obj.mainObj.questions[key].categoryName == originalCat.categoryName) {
        props.obj.mainObj.questions[key].categoryName = selectedCat.categoryName
      }
    })

  }
  return (
    <div
      className="categories-content"
      hidden={props.obj.tabSelected == "CATEGORIES" ? false : true}
    >
      <div className="leftHalf" style={{ float: "left" }}>
        <Modal show={showEditModal} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="questionSetter">
              <label className="form-label">Name of Category</label>
              <input
                id="categoryName"
                type="text"
                name="categoryField"
                value={selectedCat?.categoryName}
                onChange={(e) => editHandler(e, "categoryName")}
                className="form-control mb-3 pt-3 pb-3"
              />
              <label className="form-label">No of Questions</label>
              <input
                id="noOfQuestions"
                type="number"
                value={selectedCat?.noOfQuestions}
                onChange={(e) => editHandler(e, "noOfQuestions")}
                className="form-control mb-3 pt-3 pb-3"
              ></input>
              <button onClick={handleCategoryEditForm}>Submit</button>
            </div >
          </Modal.Body >
        </Modal >
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            props.obj.showTab("QUESTIONS");
          }}
          className="formClass mt-5"
        >
          <h3>#2 - Categories</h3>
          <div className="questionSetter">
            <label className="form-label">Name of Category</label>
            <input
              id={"category"}
              type="text"
              name="categoryField"
              onChange={(e) => categoryValueAdder(e, "categoryName")}
              placeholder="Name Of Category"
              className="form-control mb-3 pt-3 pb-3"
            />
            <label className="form-label">No of Questions</label>
            <input
              id={"category"}
              type="number"
              onChange={(e) => categoryValueAdder(e, "noOfQuestion")}
              placeholder="No Of Qs"
              className="form-control mb-3 pt-3 pb-3"
            ></input>

            <br />
          </div>
          <button
            onClick={(e) => {
              addCategory(e);
            }}
          >
            Save Category
          </button>

          {/* {Object.keys(html).map(function (key, i) {
                        <button>Add Question</button>
                        return html[key]
                    })
                    } */}
          <br />
          <button>Save Test & Close</button>
        </form>
      </div >

      {
        //Table
      }
      < div className="rightHalf" style={{ float: "right" }
      }>
        {categoryHaveData && (
          <>
            <h2>Categories Created</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">No of Qs</th>
                  <th scope="col">Actions</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {Object.keys(props.obj.categoryStore).map((key, index) => {
                  return (
                    <tr key={index}>
                      <td id={"categoryName" + index} name="categoryName">
                        {props.obj.categoryStore[key]["categoryName"]}
                      </td>
                      <td id={"noOfQuestions" + index} name="noOfQuestions">
                        {props.obj.categoryStore[key]["noOfQuestion"]}
                      </td>
                      <td>
                        <span
                          style={{ color: 'blue' }}
                          className="btn"
                          id={key}
                          onClick={deleteCategory}
                        >
                          Delete
                        </span>
                        |
                        <span
                          style={{ color: 'blue' }}
                          className="btn"
                          id={key}
                          onClick={(e) => {
                            editFunctionality({
                              index: index
                            });
                          }}
                        >
                          Edit
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div >
    </div >
  );
}

export default CategoriesStep;
