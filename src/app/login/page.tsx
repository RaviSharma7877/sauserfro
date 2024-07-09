"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import Link from 'next/link';

interface ValidationState {
    length: boolean;
    digit: boolean;
    lower: boolean;
    upper: boolean;
    special: boolean;
    noSpace: boolean;
}

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
        form?: string;
    }>({});
    const [showValidations, setShowValidations] = useState<ValidationState>({
        length: true,
        digit: true,
        lower: true,
        upper: true,
        special: true,
        noSpace: true
    });

    useEffect(() => {
        const { password } = values;
        const validations = {
            length: password.length >= 8,
            digit: /[0-9]/.test(password),
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            special: /[@#$%^&+=]/.test(password),
            noSpace: !/\s/.test(password)
        };

        Object.keys(validations).forEach(key => {
            if (validations[key as keyof ValidationState]) {
                setTimeout(() => {
                    setShowValidations(prev => ({ ...prev, [key]: false }));
                }, 500);
            } else {
                setShowValidations(prev => ({ ...prev, [key]: true }));
            }
        });
    }, [values.password]);

    const handleChange = (prop: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const validate = () => {
        let tempErrors: Record<string, string> = {};
        if (!values.username) tempErrors.username = "Email is required";
        if (!values.password) tempErrors.password = "Password is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleToast = (header: string, message: string) => {
        toast(header, {
            description: (
                <>
                    <p>{message}</p>
                    <p>Sunday, December 03, 2023 at 9:00 AM</p>
                </>
            ),
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                handleToast("Processing your login...", "It will take only few seconds");

                var authHeader = "Basic " + btoa(values.username + ":" + values.password);

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", authHeader);

                // Send the GET request to the /signIn endpoint
                const response = await fetch('http://localhost:8888/signIn', {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                });

                if (response.ok) {
                    setTimeout(() => {
                        handleToast("Welcome back! 🎉", "Login successful");
                    }, 1000);
                    var token = response.headers.get("Authorization");
                    console.log("Token stored:", token);
                } else {
                    console.log("Error:", response.status);
                    handleToast("Login failed", "Wrong password");
                }
            } catch (error :any) {
                console.error('Error:', error);
                setErrors({ ...errors, form: error.message });
            }
        }
    };

    return (
        <div className="p-6 w-full h-full flex justify-center items-center bg-white">
            <div className='flex flex-col justify-center items-center leading-[40px]  min-w-[30%]'>
                <div className='border flex justify-center items-center w-14 h-14 rounded-sm shadow-md space-y-2 my-2'>
                    <span className="material-symbols-outlined">
                        lock
                    </span>
                </div>
                <div className='max-w-lg leading-10'>
                    <h2 className="text-2xl font-bold">Login to your account</h2>
                </div>
                <div className="mb-2 w-full">
                    <label htmlFor="username">Email</label>
                    <Input
                        id="username"
                        className="w-full"
                        type="text"
                        placeholder="Enter your email"
                        value={values.username}
                        onChange={handleChange('username')}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        className="w-full"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
                </div>
                <div className="flex justify-between w-full flex-col">
                    <p className='text-sm my-2'>Don't have an account <Link href={`/signup`} className='text-blue-700'>Sign Up</Link></p>
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
