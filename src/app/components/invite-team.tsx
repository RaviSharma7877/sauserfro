import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InviteTeamProps {
    nextStep: () => void;
    prevStep: () => void;
}

const InviteTeam: React.FC<InviteTeamProps> = ({ nextStep, prevStep }) => {
    const [emails, setEmails] = useState(['']);
    const [errors, setErrors] = useState(['']);

    const handleEmailChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
    };

    const addEmailField = () => {
        setEmails([...emails, '']);
    };

    const removeEmailField = (index: number) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };

    const validate = () => {
        const tempErrors: ("" | "Email is required" | "Invalid email format")[] = emails.map(email => {
            if (!email) return "Email is required";
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) return "Invalid email format";
            return "";
        });
        setErrors(tempErrors);
        return tempErrors.every(error => error === "");
    };

    const handleContinue = () => {
        if (validate()) {
            nextStep();
        }
    };

    return (
        <div className="p-6 w-full h-full flex justify-center items-center bg-white">
            <div className='max-w-lg leading-10  min-w-[30%]'>
                <div className='flex flex-col justify-center items-center leading-[40px]'>
                    <div className='border flex justify-center items-center w-14 h-14 rounded-sm shadow-md space-y-2 my-2'>
                        <span className="material-symbols-outlined">
                            group_add
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold">Invite your team</h2>
                    <p>Start collaborating with your team.</p>
                </div>
                <div>
                    <label htmlFor="emails">Team Member Emails</label>
                    {emails.map((email, index) => (
                        <div key={index} className="flex flex-col">
                            <div className='flex items-center mb-2'>
                            <Input
                                className="w-full mr-2"
                                type="email"
                                placeholder="Enter team member's email"
                                value={email}
                                onChange={(event) => handleEmailChange(index, event)}
                            />
                            <Button className="w-10" onClick={() => removeEmailField(index)}>X</Button>
                            </div>
                            {errors[index] && <p className="text-red-500 text-sm pb-2">{errors[index]}</p>}
                        </div>
                    ))}
                </div>
                <Button className="w-full mb-4" onClick={addEmailField}>+ Add more</Button>
                <div className="flex justify-between">
                    {/* <Button onClick={prevStep}>Back</Button> */}
                    <Button onClick={handleContinue}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default InviteTeam;
