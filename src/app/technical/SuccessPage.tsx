"use client";

import { FC } from 'react';
import StatusDisplayCard from '../components/StatusDisplayCard';

const successLines = [
    { text: "> TRANSMISSION STATUS: COMPLETE", className: "text-[#0F9D58]" },
    { text: "> Authenticating credentials...", className: "text-[#fdd663]" },
    { text: "> Verification successful.", className: "text-gray-400" },
    { text: "> Your application has been received.", className: "text-[#8ab4f8]" },
    { text: "> Stand by for further instructions.", className: "text-[#f28b82]" },
];

const SuccessPage: FC = () => {
    return (
        <StatusDisplayCard
            status="success"
            lines={successLines}
            buttonText="CLOSE SESSION"
            onButtonClick={() => (window.location.href = '/')}
        />

    );
};

export default SuccessPage;
