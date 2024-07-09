import React, { FC } from 'react';

interface SidebarProps {
    step: number;
}

const Sidebar: FC<SidebarProps> = ({ step }) => {
    return (
        <div className="w-[35%] p-6 bg-gray-50 mx-auto flex flex-col justify-between">
            <div className='h-[60%] flex flex-col justify-around'>
                <div className='flex items-center'>
                    <div className='w-5 h-5 mx-2 border-blue-800 rounded-full border-[3px]' />
                    <h2 className="text-xl font-bold">Sarvam</h2>
                </div>
                <ul className="space-y-2  items-start">
                    <li className={`p-2 flex justify-start  items-start ${step >= 1 ? 'opacity-100 text-blue-700' : 'opacity-40'}`}>
                        <span className="material-symbols-outlined">
                            task_alt
                        </span>
                        <div className='px-2 text-sm text-black'>
                        <h5 className='font-bold'>Legal Agrement</h5>
                        <p>Please accept the legal agrement</p>
                        </div>
                    </li>
                    <li className={`p-2 flex justify-start  items-start ${step >= 2 ? 'opacity-100 text-blue-700' : 'opacity-40'}`}>
                        <span className="material-symbols-outlined">
                            task_alt
                        </span>
                        <div className='px-2 text-sm text-black'>
                        <h5 className='font-bold'>Your details</h5>
                            <p>Please provide your name and email</p> 
                        </div>
                    </li>
                    <li className={`p-2 flex justify-start items-start ${step >= 3 ? 'opacity-100 text-blue-700' : 'opacity-40'}`}>
                        <span className="material-symbols-outlined">
                            task_alt
                        </span>
                        <div className='px-2 text-sm text-black'>
                            <h5 className='font-bold'>Choose a password</h5>
                            <p>Must be at least 8 characters</p>
                        </div>
                    </li>
                   
                </ul>
            </div>
            <div className='flex justify-between'>
                <p>&copy; Sarvam 2024</p>
                <p className='flex items-center'>
                    <span className="material-symbols-outlined">
                        mail
                    </span> sarvam@gmail.com</p>
            </div>
        </div>
    );
};

export default Sidebar;
