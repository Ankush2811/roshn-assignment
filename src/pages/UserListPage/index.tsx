// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchUsers, User } from "../../utils/api";
// import Loader from "../../components/Loader";
// import Table from "../../components/Table";
// import Pagination from "../../components/Pagination";

// const UserListPage: React.FC = () => {
//    const [users, setUsers] = useState<User[]>([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState<string | null>(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const usersPerPage = 5;

//    useEffect(() => {
//        const loadUsers = async () => {
//            setLoading(true);
//            setError(null);
//            try {
//                const data = await fetchUsers<User[]>("https://jsonplaceholder.typicode.com/users");
//                setUsers(data);
//            } catch (err: any) {
//                setError(err.message);
//            } finally {
//                setLoading(false);
//            }
//        };

//        loadUsers();
//    }, []);

//    const handlePageChange = (page: number) => setCurrentPage(page);

//    if (loading) return <Loader />;
//    if (error) return <div>Error: {error}</div>;

//    const startIndex = (currentPage - 1) * usersPerPage;
//    const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

//    return (
//        <div>
//            <h1>User List</h1>
//            <Table
//                data={paginatedUsers}
//                renderRow={(user) => (
//                    <tr key={user.id}>
//                        <td>{user.id}</td>
//                        <td>
//                            <Link to={`/user/${user.id}`}>{user.name}</Link>
//                        </td>
//                        <td>{user.email}</td>
//                    </tr>
//                )}
//            />
//            <Pagination
//                currentPage={currentPage}
//                totalPages={Math.ceil(users.length / usersPerPage)}
//                onPageChange={handlePageChange}
//            />
//        </div>
//    );
// };

// export default UserListPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, User } from "../../utils/api";
import Loader from "../../components/Loader";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import "./UserListPage.css";

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const usersPerPage = 5;

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchUsers<User[]>("https://jsonplaceholder.typicode.com/users");
                setUsers(data);
                setFilteredUsers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(value) ||
                    user.email.toLowerCase().includes(value)
            )
        );
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => setCurrentPage(page);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    return (
        <div className="user-list-page">
            <h1 style={{fontSize:"30px",color:"#ff8c42"}}>Users List</h1>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={handleSearch}
                className="search-bar"
            />
            <Table
                data={paginatedUsers}
                // style={{color:"#ff8c42"}}
                renderRow={(user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.company.name}</td>
                    </tr>
                )}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserListPage;
