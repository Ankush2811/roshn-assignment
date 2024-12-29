
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import "./UserListPage.css";
import { UserContext } from "../../context/UserContext";

const UserListPage: React.FC = () => {
    const { state, dispatch } = useContext(UserContext);
    const { users, loading, error } = state;
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const usersPerPage = 5;

    useEffect(() => {
        const loadUsers = async () => {
            dispatch({ type: "FETCH_USERS_REQUEST" });
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
            } catch (err: any) {
                dispatch({ type: "FETCH_USERS_FAILURE", payload: err.message });
            }
        };

        if (users.length === 0) {
            loadUsers();
        }
    }, [dispatch, users.length]);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => setCurrentPage(page);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    return (
        <div className="user-list-page">
            <h1 style={{ fontSize: "30px", color: "#ff8c42" }}>Users List</h1>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={handleSearch}
                className="search-bar"
            />
            <Table
                data={paginatedUsers}
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

