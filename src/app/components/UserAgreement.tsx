import { Button } from '@/components/ui/button';
import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { Textarea } from "@/components/ui/textarea"

interface UserDetailsProps {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (field: string, value: string | boolean) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { value: any } }) => void;
    values: {
        [key: string]: string | boolean | undefined; // Adjust this based on the actual structure of `values`
        name: string;
        username: string;
        avatarUrl: string;
        email: string;
        role: string;
        password: string;
        confirmPassword: string;
        userAgreementAccepted?: boolean; // Add this field to the values structure
    };
}

const UserAgreement: FC<UserDetailsProps> = ({ nextStep, prevStep, handleChange, values }) => {
    const dummyAgreementText = `
        Welcome to our application!

        Please read the following terms and conditions carefully before using our services. By using our services, you agree to comply with and be bound by these terms. If you do not agree to these terms, please do not use our services.

        1. Acceptance of Terms
        By accessing or using our services, you agree to be bound by these terms and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services.

        2. Changes to Terms
        We reserve the right to modify or replace these terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any such changes constitutes your acceptance of the new terms.

        3. User Responsibilities
        You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use and enjoyment of our services.

        4. Privacy Policy
        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.

        5. Termination
        We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these terms.

        6. Contact Us
        If you have any questions about these terms, please contact us at support@example.com.

        By clicking "Next," you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
    `;

    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        // Update the formValues with the acceptance state
        handleChange('userAgreementAccepted', isAccepted)({ target: { value: isAccepted } });
    }, [isAccepted, handleChange]);

    const validate = () => {
        let tempErrors = {};
        return Object.keys(tempErrors).length === 0;
    };

    const handleContinue = () => {
        if (validate()) {
            nextStep();
        }
    };

    return (
        <div className="p-6 w-full h-full flex justify-center items-center bg-white">
            <div className='leading-[30px] min-w-[30%]'>
                <div className='flex flex-col justify-center items-center leading-[40px]'>
                    <div className='border flex justify-center items-center w-14 h-14 rounded-sm shadow-md space-y-2 my-2'>
                        <span className="material-symbols-outlined">
                            gavel
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-[30px]">Terms & Conditions</h2>
                    <p className='text-sm leading-[30px]'>Read the tearms & conditions before procceding.</p>
                </div>
                <Textarea
                    name="userAgreement"
                    readOnly
                    value={dummyAgreementText}
                    placeholder="User Agreement"
                    rows={30}
                    cols={120}
                    className="no-resize"
                />
                <p>By selecting "Accept," you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.</p>
                <div className="mt-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="agreement"
                            value="accept"
                            checked={isAccepted}
                            onChange={() => setIsAccepted(!isAccepted)} // Toggle the state
                            className="form-checkbox"
                        />
                        <span className="ml-2">Accept and let's get started!</span>
                    </label>
                </div>
                <div className="buttons mt-4">
                    <Button onClick={handleContinue} disabled={!isAccepted}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default UserAgreement;
