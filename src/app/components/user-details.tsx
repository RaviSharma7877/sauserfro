import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import googlesvg from '../../../public/googlesvg.svg';
import Image from 'next/image';

const roles = [
    { value: 'SUBACCOUNT_USER', label: 'Subaccount User' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MANAGER', label: 'Manager' }
];

interface UserDetailsProps {
    nextStep: () => number;
    prevStep: () => number;
    handleChange: (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    values: {
        [key: string]: string; // Adjust this based on the actual structure of `values`
        name: string;
        username: string;
        avatarUrl: string;
        email: string;
        role: string;
    };
}

const UserDetails: FC<UserDetailsProps> = ({ nextStep, prevStep, handleChange, values }) => {
    const [errors, setErrors] = useState({
        name: '',
        username: '',
        avatarUrl: '',
        email: '',
        role: ''
    });

    const validate = () => {
        let tempErrors = {
            name: '',
            username: '',
            avatarUrl: '',
            email: '',
            role: ''
        };
    
        console.log(values.name);
        console.log(values.username);
        console.log(values.avatarUrl);
        console.log(values.email);
        console.log(values.role);
    
        if (!values.name) tempErrors.name = "Name is required";
        if (!values.username) tempErrors.username = "Username is required";
        if (!values.avatarUrl) tempErrors.avatarUrl = "Invalid URL format";
        if (!values.email) {
            tempErrors.email = "Email is required";
        } else if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(values.email)) {
            tempErrors.email = "Email format is invalid";
        }
        if (!values.role) tempErrors.role = "Role is required";
    
        setErrors(tempErrors);
    
        // Check if any error messages are populated
        return !Object.values(tempErrors).some(errorMessage => errorMessage);
    };
    

    const handleContinue = () => {
        console.log("hiii")
        if (validate()) {
            nextStep();
            console.log(nextStep());
        }
    };

    return (
        <div className="p-6 w-full h-full flex justify-center items-center bg-white">
            <div className='leading-[30px] min-w-[30%]'>
                <div className='flex flex-col justify-center items-center leading-[40px]'>
                    <div className='border flex justify-center items-center w-14 h-14 rounded-sm shadow-md space-y-2 my-2'>
                        <span className="material-symbols-outlined">
                            flag
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-[30px]">Your details</h2>
                    <p className='text-sm leading-[30px]'>Please provide your details.</p>
                </div>
                <div className='max-w-lg w-full'>
                    <Button className="w-full">
                        <Image src={googlesvg} alt='google svg' width={20} height={20} /> 
                        <p className='px-2'>Sign up with Google</p>
                    </Button>
                    <p className="text-center">OR</p>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <Input
                            id="name"
                            className="w-full"
                            type="text"
                            placeholder="Enter your name"
                            value={values.name}
                            onChange={handleChange('name')}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            className="w-full"
                            type="text"
                            placeholder="Enter your username"
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="avatarUrl">Avatar URL</label>
                        <Input
                            id="avatarUrl"
                            className="w-full"
                            type="text"
                            placeholder="Enter your avatar URL"
                            value={values.avatarUrl}
                            onChange={handleChange('avatarUrl')}
                        />
                        {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            className="w-full"
                            type="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            className="w-full border py-2 px-1 rounded"
                            value={values.role}
                            onChange={handleChange('role')}
                        >
                            <option value="">Select a role</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                    <div className="flex justify-between w-full">
                        <Button onClick={prevStep}>Back</Button>
                        <Button onClick={handleContinue}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
