import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import { TourProvider } from '@reactour/tour'
import { components } from '@reactour/tour'
import { Icon } from "@mui/material";


const steps = [
  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling.',
    position: "top",
  },
  {
    selector: '.pageSection',
    content: 'This is the main area which shows how your page will look like live changes.',
    position: 'right',
  },
  // {
  //   selector: '#formsubmitbutton',
  //   content: '',
  //   position:"top"
  // },
  {
    selector: '#mainNav1',
    content: 'This is Section 1.Click on the text Section 1 to open the side editor.',
    position:"bottom"
  },
  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of Section 1.',
    position: "top",
  },

  {
    selector:".textEditorClass",
    content: 'This is the text editor with tools from which you can change the text styling.',
    position: "top",
  },

  {
    selector: '#mainNav2',
    content: 'This is Section 2. Click on the text Section 2 to open the side editor.',
    position:"bottom"

  },

  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of Section 2.',
    position: "top",
  },
  {
    selector: '#mainNav3',
    content: 'This is Section 3. Click on the text Section 3 to open the side editor.',
    position:"bottom"

  },

  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of Section 3.',
    position: "top",
  },


  {
    selector: '#mainNav4',
    content: 'This is Section 5. Click on the text Section 5 to open the side editor.',
    position:"bottom"

  },

  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of Section 5.',
    position: "top",
  },
  {
    selector: '#mainNav5',
    content: 'This is Section 6. Click on the text Section 6 to open the side editor.',
    position:"top"

  },

  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of Section 6.',
    position: "top",
  },
  {
    selector: '#mainNav6',
    content: 'This is the contact section. You can change the styling and give heading to it. click anywhere in here to open side editor and change styling.',
    position:"top"
  },
  {
    selector: '.das',
    content: 'This is the side editor with tools from which you can change the styling of the contact section.',
    position: "top",
  }
];



 
function Close({ onClick }) {
  return (
    <Icon
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 3,
        top: 3,
        width: "1.5em",
        height: "1.5em",
        cursor: 'pointer',
      }}
    >
      x
    </Icon>
  )
}
 

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
      />
     <TourProvider steps={steps} components={{  Close }} disableDotsNavigation={true} disableKeyboardNavigation={true}>
      <Router />
      </TourProvider>
    </BrowserRouter>
  );
}

export default App;
