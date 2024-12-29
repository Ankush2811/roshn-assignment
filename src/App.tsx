import React from "react";
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
    
);

export default App;

