import { useState } from 'react';
import { useRouter } from 'next/router';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState("");
    const router = useRouter(); // Get the router object

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            try {
                let response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                });

                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    let errorResponse = await response.json();
                    setError(errorResponse.error);
                    return;
                }

                // If response is ok, extract user_id from response and navigate to the user page
                const responseData = await response.json();
                const userId = responseData.user_id;
                router.push(`/user/${userId}`); // Navigate to the user page
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        } else {
            setError("All fields are required!");
        }
    };

    return (
        <div>
            <h2 className='bg-gray-400'>Login</h2>
            <form onSubmit={handleSubmit}>
                {error ? <div className='alert-error text-red-600'>{error}</div> : null}
                <div>
                    <label>Username:</label>
                    <input
                        className='border-2 rounded-md'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className='border-2 rounded-md'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button className='border-2 bg-gray-200' type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
