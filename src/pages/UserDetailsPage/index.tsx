
import React, { useState, useEffect } from "react";
import { Text } from "@radix-ui/themes"
import { useParams, Link } from "react-router-dom";
import { fetchUsers, User } from "../../services/api";
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
                    <Text className="user-details-text">
                        <strong>Name:</strong> {user?.name}
                    </Text>
                    <Text className="user-details-text">
                        <strong>Email:</strong> {user?.email}
                    </Text>
                    <Text className="user-details-text">
                        <strong>Phone:</strong> {user?.phone}
                    </Text>
                    <Text className="user-details-text">
                        <strong>Address:</strong> {`${user?.address?.suite}, ${user?.address?.street}, ${user?.address?.city}`}
                    </Text>
                    <Text className="user-details-text">
                        <strong>Company:</strong> {user?.company?.name}
                    </Text>
                    <Text className="user-details-text">
                        <strong>Website:</strong>{" "}
                        <a
                            href={`http://${user?.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="user-details-link"
                        >
                            {user?.website}
                        </a>
                    </Text>
                </div>
                <Link to="/" className="back-button">
                    Back to User List
                </Link>
            </div>
        </div>
    );
};

export default UserDetailsPage;
