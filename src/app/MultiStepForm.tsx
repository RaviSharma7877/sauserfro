"use client"

import React, { useState } from 'react';
import UserDetails from './components/user-details';
import UserPassword from './components/user-password';
import Sidebar from './components/Sidebar';
import UserAgreement from './components/UserAgreement';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        avatarUrl: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (input: any) => (e: { target: { value: any; }; }) => {
        setFormValues({ ...formValues, [input]: e.target.value });
    };

    const handleContinue = () => {
        nextStep();
    };

    const getStepComponent = () => {
        switch (step) {
            case 1:
                return (
                    <UserAgreement // Add the UserAgreement step
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={formValues} prevStep={function (): void {
                            throw new Error('Function not implemented.');
                        } }                    />
                );
            case 2:
                return (
                    <UserDetails
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={formValues}
                    />
                );
            case 3:
                return (
                    <UserPassword
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={formValues}
                    />
                );
            
            default:
                return (
                    <UserAgreement
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={formValues} prevStep={function (): void {
                            throw new Error('Function not implemented.');
                        } }                    />
                );
        }
    };

    return (
        <div className="flex w-full h-full">
            <Sidebar step={step} />
            <div className="flex w-full h-screen">
                {getStepComponent()}
                
            </div>
        </div>
    );
};

export default MultiStepForm;
