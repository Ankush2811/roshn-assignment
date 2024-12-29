// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React from "react";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => (
    <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<UserListPage />} />
                <Route path="/user/:id" element={<UserDetailsPage />} />
            </Routes>
        </Router>
    </UserProvider>
    // <Provider store={store}>
    // <Router>
    //     {/* <Switch> */}
    //     <Route path="/" element={<UserListPage />} />
    //   <Route path="/user/:id" element={<UserDetailsPage />} />
    //         {/* <Route exact path="/" component={UserListPage} /> */}
    //         {/* <Route path="/user/:id" component={UserDetailsPage} /> */}
    //     {/* </Switch> */}
    // </Router>
    // </Provider>
);

export default App;

