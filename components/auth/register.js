import { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        avatar: 'https://cataas.com/cat'
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            try {
                let response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                    })
                    // Check if the response is ok (status code 200-299)
                    if (!response.ok) {
                        let errorResponse = await response.json();
                        setError(errorResponse.error);
                        setMessage(""); // Clear any success message
                        return;
                    }


                    setFormData({
                        username : "",
                        password : "",
                    })
                    setMessage("Register successfully!");
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        }else{
            return setError("All fields are required!");
        }

    };

    return (
        <div>
        <h2 className='bg-gray-400'>Register</h2>
        <form onSubmit={handleSubmit}>
            {error ? <div className='alert-error text-red-600'>{error}</div> : null}
            {message ? <div className='alert-message text-green-600'>{message}</div> : null}
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
            <button className='border-2 bg-gray-200' type="submit">Register</button>
        </form>
        </div>
    );
}

export default Register;