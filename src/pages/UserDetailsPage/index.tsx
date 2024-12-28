// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { fetchUsers, User } from "../../utils/api";
// import Loader from "../../components/Loader";

// const UserDetailsPage: React.FC = () => {
//    const { id } = useParams<{ id: string }>();
//    const [user, setUser] = useState<User | null>(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState<string | null>(null);

//    useEffect(() => {
//        const loadUser = async () => {
//            setLoading(true);
//            setError(null);
//            try {
//                const data = await fetchUsers<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
//                setUser(data);
//            } catch (err: any) {
//                setError(err.message);
//            } finally {
//                setLoading(false);
//            }
//        };

//        loadUser();
//    }, [id]);

//    if (loading) return <Loader />;
//    if (error) return <div>Error: {error}</div>;

//    return (
//        <div>
//            <h1>User Details</h1>
//            <p>Name: {user?.name}</p>
//            <p>Email: {user?.email}</p>
//            <p>Phone: {user?.phone}</p>
//            <p>Website: {user?.website}</p>
//            <Link to="/">Back to User List</Link>
//        </div>
//    );
// };

// export default UserDetailsPage;



import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUsers, User } from "../../utils/api";
import Loader from "../../components/Loader";
import "./UserDetailPage.css";

const UserDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchUsers<User>(
                    `https://jsonplaceholder.typicode.com/users/${id}`
                );
                setUser(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="user-details-page">
            <div className="user-details-card">
                <h1 className="user-details-title">User Details</h1>
                <div className="user-details-content">
                    <p>
                        <strong>Name:</strong> {user?.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user?.phone}
                    </p>
                    <p>
                        <strong>Website:</strong>{" "}
                        <a
                            href={`http://${user?.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="user-details-link"
                        >
                            {user?.website}
                        </a>
                    </p>
                </div>
                <Link to="/" className="back-button">
                    Back to User List
                </Link>
            </div>
        </div>
    );
};

export default UserDetailsPage;
