
import { React, useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { apiCall } from "../../apiCalls/apiCalls";
import { logoUploader, local, addLandingPage, getLandingPage } from "../../apiCalls/apiRoutes";
import "./style.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { json } from "react-router-dom";
import { formToJSON } from "axios";
function EditLandingPage(params) {
  const [id, setId]= useState(0)
  var queryParameters = new URLSearchParams(window.location.search);
  var emailToDeal = queryParameters.get("id");
  
  const navigate = useNavigate()
  const [showBox, setShowBox] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState();
  const [itemShowSelect, setItemShowSelect] = useState("");
  const [showChangeColor, setShowChangeColor] = useState(false);
  const [showPicEditor, setShowPicEditor] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [imageId, setImageId] = useState('');
  const [showPicAdder, setShowPicAdder] = useState(false);
  const [elementAttribute, setElementAttributes] = useState({
    paragraphTextContent: "",
    headingTextContent: "",
    imageUrl: "",
  });

  const [beforeTextState, setBeforeTextState] = useState(() =>
    EditorState.createEmpty()
  );
  const [beforeTestTextHtml, setBeforeTestTextHtml] = useState();
  useEffect(() => {
    let html = convertToHTML(beforeTextState.getCurrentContent());
    setBeforeTestTextHtml(html);
  }, [beforeTextState]);

  useEffect(() => {
    setBeforeTestTextHtml('')
    setBeforeTextState(() =>
      EditorState.createEmpty())
  }, [showTextEditor])

useEffect(()=>{
apiCall('post', getLandingPage, {limit: 2, page: 1 , id:emailToDeal})
.then((res)=>{
document.getElementById('appendData').innerHTML = res?.data?.data?.rows[0]?.html
console.log('res?.data?.data?.rows[0]?.html',res?.data?.data?.rows[0]?.html)
}).catch((err)=>{
  console.log(err)
})
})

  const editTextEditorFunction = (e) => {
    console.log("texteditorfunction");
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
  function addNewElement(nav) {
    setItemShowSelect("elements");
    setSelectedDiv(nav);
    setShowBox(true);
    document.querySelector(".dashboard").style.width = "15%";
    document.querySelector(".dashboard").style.display = "block";
    document.querySelector(".pageSection").style.width = "60%";
  }

  window.addEventListener("load", (event) => {
    setTimeout(() => {
      const nav1 = document.querySelector('#mainNav1')
nav1.addEventListener('click',(e)=>{
  addNewElement('p')
})
    }, 300);

  });

  function adderFunction(params) {
    setItemShowSelect("attribute");
    setShowBox(false);
    setShowPicAdder(true);
    setShowTextEditor(false)
  }

  const editImageFunctionality = (e) => {
    setImageId(e.target.id)
    setShowPicEditor(true)
  };

  const [selectedFile, setSelectedFile] = useState(null);
 
  const imageUploaderFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        let url = local + res.data.data;
        var newimg = document.createElement("img");
        newimg.src = url;
        newimg.id = selectedDiv + "img" + Math.random(1000);
        newimg.onclick = editImageFunctionality;
        var appendTo = document.getElementById(selectedDiv);
        appendTo.appendChild(newimg);
        setShowPicAdder(false);
        showToastMessage("Logo uploaded Successfully ", "green", 1);

      })
      .then((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      });
  };

  const imageEditorFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        let url = local + res.data.data;
        document.getElementById(imageId).src = url
        setShowPicEditor(false)
      })
      .then((err) => {
        console.log(err);
      });
  };

  const getImageFunction = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const hideFunctionality = () => {
    document.querySelector(".dashboard").style.width = "0%";
    document.querySelector(".dashboard").style.display = "none";
    document.querySelector(".pageSection").style.width = "90%";
  };

  const changeBackgroundColor = (e) => {
    const selectedOne = document.getElementById(selectedDiv);
    selectedOne.style.background = e.target.value
    var allnodes = selectedOne.childNodes
    allnodes.forEach((ele) => {
      ele.style.color = "white"
    })
  }
  const changeFontColor = (e) => {
    const selectedOne = document.getElementById(selectedDiv);
    selectedOne.childNodes.forEach((ele) => {
      ele.style.color = e.target.value
    })
  }

  const [namingConvention, setNamingConvention] = useState({
    mainNav1: 'Section 1',
    mainNav2: 'Section 2',
    mainNav3: "Section 3",
    mainNav4: "Section 5",
    mainNav5: 'Section 6',
  })

  const savePageFunctionality = () => {
    const fullhtml = document.querySelector('.sectionToGet').innerHTML
    console.log(fullhtml)
    apiCall('post', addLandingPage, {
      html: fullhtml
    })
      .then((res) => {
        if (res.status == 200) {
          showToastMessage("Landing Page added Successfully ", "green", 1);
          navigate('/dashboard/landing-pages')
        }
      }).catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      })
  }

  return (
    <div className="fullWidth">
      <div className="dashboard">
        <h2> {namingConvention[selectedDiv]} </h2>
        <h5 onClick={() => {
          setShowTextEditor(true);
          setShowPicAdder(false);
        }}> Add text </h5>
        <h5 onClick={() => {
          adderFunction("img");
        }}>Add image</h5>
        <h5
          onClick={() => {
            setShowChangeColor(true)
          }}
        >Change Colors</h5>

        <h5 onClick={hideFunctionality}>Close sidear</h5>
      </div>
      <div className="pageSection">
        <div className="sectionToGet">
          <div className="textEditorClass"
            style={showTextEditor ? { display: "block" } : { display: "none" }}
          >
            <div onClick={() => { setShowTextEditor(false) }} className="closebutton">X</div>
            <Editor
              editorState={beforeTextState}
              onEditorStateChange={setBeforeTextState}
              id="afterTestText"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <button
              onClick={() => {
                const selectedOne = document.getElementById(selectedDiv);
                const newDiv = document.createElement("div");
                newDiv.innerHTML = beforeTestTextHtml;
                newDiv.onclick = editTextEditorFunction();
                newDiv.className = "dynamicDivClass";
                newDiv.id = "texteditor" + Math.random(10);
                // selectedOne.appendChild(newDiv);
                selectedOne.innerHTML = beforeTestTextHtml;
                setShowTextEditor(false)
              }}
            >
              Save
            </button>
          </div>
          <div
            className="textEditorClass"
            style={showPicAdder ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowPicAdder(false) }} className="closebutton">X</div>
            <form onSubmit={imageUploaderFunction} style={{ textAlign: "center" }}>
              <h2>Please choose a file</h2>
              <input className="form-control-file m-5 " type="file" onChange={getImageFunction} required /><br />
              <button type="submit"> Upload Image </button>
            </form>
          </div>

          <div
            className="textEditorClass"
            style={showPicEditor ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowPicEditor(false) }} className="closebutton">X</div>
            <form onSubmit={imageEditorFunction} style={{ textAlign: "center" }}>
              <h2>Please choose a file</h2>
              <input className="form-control-file m-5 " type="file" onChange={getImageFunction} required /><br />
              <button type="submit"> Upload Image </button>
            </form>
          </div>

          <div
            className="textEditorClass"
            style={showChangeColor ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowChangeColor(false) }} className="closebutton">X</div>
            <div className="m-5" style={{ textAlign: 'center' }}>
              <h2>Please Select Color</h2>
              <label className="mt-4">Background Color</label><br />
              <input className="form-control-file m-2" type="color" onChange={changeBackgroundColor} required /><br />

              <label className="mt-4">Font Color</label><br />
              <input className="form-control-file m-2" type="color" onChange={changeFontColor} required /><br />
              <button onClick={() => { setShowChangeColor(false) }}> Save </button>
            </div>
          </div>
         
          {showBox && (
            <div
              style={{
                display: "inline-block",
                top: "10px",
                backgroundColor: "yellow",
                position: "fixed",
              }}
            >
            </div>
          )}
          
              <section id="appendData" ></section>
          

          
        </div>
        <button className="btn btn-primary" onClick={() => { savePageFunctionality() }}>Save Landing page</button>
      </div>
    </div>
  )
}

export default EditLandingPage;