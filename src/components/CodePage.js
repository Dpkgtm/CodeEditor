import Editor from './Editor';
import  React ,{ useEffect, useState ,useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {ScreenCapture} from 'react-screen-capture';

import 'bootstrap/dist/css/bootstrap.min.css';
function CodePage(props) {
  const  history=useHistory();
  const[html, setHTML]=useLocalStorage('html', '');
  const[css, setCSS]=useLocalStorage('css', '');
  const[js, setJS]=useLocalStorage('js', '');
  const[srcDoc,setSrcDoc]=useState('');
  const[screenCapture,setScreenCapture]=useState('');
  const topPane=useRef()
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
        `)
    },300)
    return ()=>clearTimeout(timeout)
  },[html,css,js])

  // function captureImage(e){
  //   let canvas=document.createElement('canvas');
  //   console.log("height of pane",topPane.current.style.height);
  //   console.log("window width",window.screen.width);
  //   canvas.height=topPane.current.style.height;
  //   canvas.width=window.screen.width;
  //   let tool=canvas.getContext("2d");
  //          // tool.drawImage(videoElem,0,0);
  //           let url=canvas.toDataURL();
  //           let a=document.createElement("a");
  //           a.download="file.png";
  //           a.href=url;
  //           a.click();
  //           a.remove();
  // }

  const handleScreenCapture=(val)=>{
    setScreenCapture(val);
  }

  const handleSave = () => {
    const screenCaptureSource = screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.jpg';
    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
    setTimeout(()=>{
      setScreenCapture('');
    },900)
    
  };
  const  toTextFile=()=>{
    const element=document.createElement("a");
    const file =new Blob([srcDoc], {type: 'text/plain'});
    element.href=URL.createObjectURL(file);
    element.download="myFile.txt";
    element.click();
  }

  function handleChat(){
    history.push("/main");
  }
  return (
  <>
<ScreenCapture onEndCapture={(val)=>handleScreenCapture(val)}>
{({ onStartCapture }) => (
  <>
 
 <div style={{display:"flex",width:"100vw",height:"4rem",backgroundColor:"hsl(225, 6%, 35%)",justifyContent:"center"}}>
      <h1 style={{color:'grey',position:"absolute",left:"2rem" ,fontSize:"40px"}}>CODEONLY</h1>
        <button type="button" className="btn btn-outline-dark" onClick={()=>{onStartCapture()}}>Capture-Screen</button>
       
        <button type="button" className="btn btn-outline-dark" style={{marginLeft:"1rem",marginRight:"1rem"}} onClick={()=>{handleChat()}}>Chat</button>
        
       { html &&<button type="button" className="btn btn-outline-dark" onClick={()=>{toTextFile()}}>Download-Code</button>}
       {screenCapture&& <button type="button" className="btn btn-outline-dark" onClick={()=>{handleSave()}}>Download-Captured</button>}
        </div>
  <div  ref={topPane} style={{ resize:"vertical",overflow: "auto"}}
  className="pane top-pane">
    <Editor
      language="xml"
      displayName="HTML"
      value={html}
      onChange={setHTML}/>
    <Editor
      language="css"
      displayName="CSS"
      value={css}
      onChange={setCSS}/>
    <Editor
      language="javascript"
      displayName="JS"
      value={js}
      onChange={setJS}/>

  </div>
 
 <div className="pane">
    <iframe
      srcDoc={srcDoc}
      title='output'
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      />
  </div>
  </>
  )}
</ScreenCapture>
  
  </>
  )
}
export default CodePage;