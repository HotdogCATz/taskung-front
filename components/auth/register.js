import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from "@nextui-org/react";


function Register() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        Avatar: '',
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter(); // Get the router object

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            try {
                // Fetch the avatar URL
                const avatarResponse = await fetch(`https://api.thecatapi.com/v1/images/search`);
                const avatarData = await avatarResponse.json();
                const avatarUrl = avatarData[0].url;
                console.log("url", avatarUrl);

                let response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        Avatar: avatarUrl
                    }),
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
                    username: "",
                    password: "",
                    Avatar: ""
                })
                const responseData = await response.json();
                const userId = responseData.ID;
                setMessage("Register successfully! User ID: " + userId);
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        } else {
            return setError("All fields are required!");
        }
        console.log("form data: ", formData);
    };

    const publicAcc = async () => {
        try {
            let response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: 'test_user',
                    password: '1234'
                }),
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
                username: "",
                password: "",
            })
            // If response is ok, extract user_id from response and navigate to the user page
            const responseData = await response.json();
            const userId = responseData.user_id;
            setMessage("Register successfully!");

            router.push(`/user/${userId}`); // Navigate to the user page
        } catch (error) {
            setError(error.toString()); // Convert error object to string
        }

    };

    return (
        <div>
            <h2 className='text-center text-white text-lg'>Sing up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className='mt-4 w-full h-[44px] border-2 rounded-md px-4'
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className='mt-2 w-full h-[44px] border-2 rounded-md px-4'
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {error ? <div className='mt-2 alert-error text-red-500'>{error}</div> : null}
                {message ? <div className='mt-2 alert-message text-green-500'>{message}</div> : null}
                <div className=''>
                    <Button color="primary" type="submit" className='mt-2 w-full h-[48px]'>
                        Sign up
                    </Button>
                    <p className='text-center text-white'>or</p>
                    <Button color="success" onPress={publicAcc} className='mt-2 w-full h-[48px] text-white'>
                        Continue as Public Account
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Register;