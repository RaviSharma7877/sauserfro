import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

interface UserDetailsProps {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    values: {
        [key: string]: string; // Adjust this based on the actual structure of `values`
        name: string;
        username: string;
        avatarUrl: string;
        email: string;
        role: string;
        password: string;
        confirmPassword: string;
    };
}

const validationKeys = ['length', 'digit', 'lower', 'upper', 'special', 'noSpace'] as const;
type ValidationKey = typeof validationKeys[number];

const UserDetails: FC<UserDetailsProps> = ({ nextStep, prevStep, handleChange, values }) => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [passwordValidations, setPasswordValidations] = useState<Record<ValidationKey, boolean>>({
        length: false,
        digit: false,
        lower: false,
        upper: false,
        special: false,
        noSpace: false
    });
    const [showValidations, setShowValidations] = useState<Record<ValidationKey, boolean>>({
        length: true,
        digit: true,
        lower: true,
        upper: true,
        special: true,
        noSpace: true
    });

    useEffect(() => {
        const { password } = values;
        const validations: Record<ValidationKey, boolean> = {
            length: password.length >= 8,
            digit: /[0-9]/.test(password),
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            special: /[@#$%^&+=]/.test(password),
            noSpace: !/\s/.test(password)
        };
        setPasswordValidations(validations);

        Object.keys(validations).forEach(key => {
            const k = key as ValidationKey;
            if (validations[k]) {
                setTimeout(() => {
                    setShowValidations(prev => ({ ...prev, [k]: false }));
                }, 500);
            } else {
                setShowValidations(prev => ({ ...prev, [k]: true }));
            }
        });
    }, [values.password]);

    const validate = () => {
        let tempErrors: Record<string, string> = {
            password: '',
            confirmPassword: ''
        };
        if (!values.password) tempErrors.password = "Password is required";
        if (values.password && values.password.length < 8) tempErrors.password = "Password must be at least 8 characters";
        if (!values.confirmPassword) tempErrors.confirmPassword = "Confirm password is required";
        if (values.password !== values.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
        setErrors(tempErrors);
        return !Object.values(tempErrors).some(errorMessage => errorMessage);
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
                // Call handleContinue if validation passes
                handleContinue();

                // Show initial toast with progress bar
                handleToast("Processing your data...", "It will take only few seconds");

                // Simulate progress

                // Example API call
                const formData = {
                    'name': values.name,
                    'username': values.username,
                    'avatarUrl': values.avatarUrl,
                    'email': values.email,
                    'role': values.role,
                    'password': values.password,
                };

                const response = await fetch('http://localhost:9999/users', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    // Show success toast once progress reaches 100%
                    setTimeout(() => {
                        handleToast("Congratulation🎉", "You are successfully part of us");
                        router.push('/login');
                    }, 1000); // Delay for better UX
                }



                // Handle success or navigate to the next step if needed

            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        }
    };

    const handleContinue = () => {
        nextStep();
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
                    <h2 className="text-2xl font-bold">Choose a password</h2>
                    <p>Must be at least 8 characters.</p>
                </div>
                <div className="mb-2 w-full">
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        className="w-full"
                        type="password"
                        placeholder="Choose a password"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    <ul className="text-sm mt-1">
                        <TransitionGroup>
                            {validationKeys.map(key => (
                                showValidations[key] && (
                                    <CSSTransition key={key} timeout={500} classNames="fade">
                                        <li className={`text-gray-500 ${passwordValidations[key] ? 'line-through' : ''}`}>
                                            <input type="checkbox" checked={passwordValidations[key]} readOnly className='mr-1' />
                                            {getValidationMessage(key)}
                                        </li>
                                    </CSSTransition>
                                )
                            ))}
                        </TransitionGroup>
                    </ul>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                        id="confirmPassword"
                        className="w-full"
                        type="password"
                        placeholder="Confirm password"
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <div className="flex justify-between w-full">
                    <Button onClick={prevStep}>Back</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

const getValidationMessage = (key: ValidationKey) => {
    switch (key) {
        case 'length':
            return 'At least 8 characters';
        case 'digit':
            return 'Contains a digit';
        case 'lower':
            return 'Contains a lower case letter';
        case 'upper':
            return 'Contains an upper case letter';
        case 'special':
            return 'Contains a special character';
        case 'noSpace':
            return 'No spaces';
        default:
            return '';
    }
};

export default UserDetails;
