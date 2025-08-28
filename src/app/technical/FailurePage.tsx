"use client";

import { FC } from 'react';
import StatusDisplayCard from '../components/StatusDisplayCard';

const failureLines = [
    { text: "> INITIATING TRANSMISSION...", className: "text-gray-400" },
    { text: "> Connecting to server...", className: "text-[#fdd663]" },
    { text: "> ERROR: CONNECTION FAILED", className: "text-[#f28b82] font-bold" },
    { text: "> Check the Required Fields -> Else Retry Transmission", className: "text-gray-400" },
    { text: "> Application submission terminated.", className: "text-gray-400" },
];

const FailurePage: FC = () => {
    return (

        <StatusDisplayCard
            status="failure"
            lines={failureLines}
            buttonText="RETRY TRANSMISSION"
            onButtonClick={() => window.location.reload()} // Or your desired action
        />


    );
};


export default FailurePage;
