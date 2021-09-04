import  React ,{ useEffect, useState } from 'react';
import MainChat from './components/chat/MainChat';
import CodePage from './components/CodePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
function App() { 
  return (
  <>
  <Router>
    <AuthContextProvider>
      <Switch>
          <Route  path="/main" component={MainChat}/>
          <Route  path="/" component={CodePage}/>
      </Switch>
    </AuthContextProvider>
  </Router>
</>
  )
}

export default App;


// <div className="header" style={{height:"3rem", backgroundColor:"white"}}>
// <button onClick={(e)=>{ handleChat(e)}}>chat</button>
// </div>
// <div style={{ resize:"vertical",overflow: "auto"}}
//  className="pane top-pane">
//   <Editor
//     language="xml"
//     displayName="HTML"
//     value={html}
//     onChange={setHTML}/>
//   <Editor
//     language="css"
//     displayName="CSS"
//     value={css}
//     onChange={setCSS}/>
//   <Editor
//     language="javascript"
//     displayName="JS"
//     value={js}
//     onChange={setJS}/>

// </div>

// <div className="pane">
//   <iframe
//     srcDoc={srcDoc}
//     title='output'
//     sandbox="allow-scripts"
//     frameBorder="0"
//     width="100%"
//     height="100%"
//   />
// // </div>
// const[html, setHTML]=useLocalStorage('html', '');
// const[css, setCSS]=useLocalStorage('css', '');
// const[js, setJS]=useLocalStorage('js', '');
// const[srcDoc,seteSrcDoc]=useState('');

// const handleChat=(e)=>{
//   console.log(this);
//   history.push("/main")
// }
// useEffect(()=>{
//   const timeout=setTimeout(()=>{
//     seteSrcDoc(`
//       <html>
//         <body>${html}</body>
//         <style>${css}</style>
//         <script>${js}</script>
//       </html>
//       `)
//   },300)
//   return ()=>clearTimeout(timeout)
// },[html,css,js])