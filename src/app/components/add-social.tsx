import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"; // Import Sooner from Schadcn UI (hypothetical import)
import Loader from './loader'; // Import the Loader component

const messages = [
    "Thanks for your patience.",
    "Please wait while we process your request...",
    "We appreciate your patience.",
    "Almost done, hang tight!",
    "Processing your information..."
];

interface AddSocialProps {
    prevStep: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        [key: string]: any;
    };
}

const AddSocial: React.FC<AddSocialProps> = ({ prevStep, handleChange, values }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [companySaved, setCompanySaved] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCompany = () => {
        setShowPopup(true);
    };

    const handleViewCompany = () => {
        // Logic to view company details (replace with actual navigation)
        console.log("View Company Details");
    };

    const handleCompleteSignUp = () => {
        setLoading(true);
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            setLoading(false);
            toast("Sign up completed successfully!");
        }, 2000); // Simulated API call delay
    };

    return (
        <div className="p-6 w-full h-full flex justify-center items-center bg-white">
            {loading && <Loader messages={messages} />}
            <div className='min-w-[30%] leading-10'>
                <h2 className="text-2xl font-bold">Add your Company</h2>
                <p>Register your company to our platform.</p>
                {/* Buttons after saving company */}
                {companySaved && (
                    <div className="flex justify-between my-3 w-full">
                        <Button onClick={handleViewCompany} className='w-full'>View Company</Button>
                    </div>
                )}
                <div className="flex justify-between">
                    <Button onClick={prevStep}>Back</Button>
                    {!companySaved ? (
                        <Button onClick={handleAddCompany}>Add Company</Button>
                    ) : (
                        <Button onClick={handleCompleteSignUp}>Complete Sign Up</Button>
                    )}
                </div>
            </div>

            {/* Call the popup component */}
        </div>
    );
};

export default AddSocial;
