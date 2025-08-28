import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
    Text
} from '@react-email/components';
import * as React from 'react';

interface ConfirmationEmailProps {
    applicantName: string;
}

export const ConfirmationEmail: React.FC<Readonly<ConfirmationEmailProps>> = ({ applicantName }) => (
    <Html>
        <Head />
        <Preview>GDG On Campus TIU Application Received</Preview>
        <Tailwind>
            <Body className="bg-gray-100 font-sans">
                <Container className="bg-white border border-gray-200 rounded-lg mx-auto p-8 my-8 max-w-xl">
                    <Heading className="text-2xl font-bold text-gray-800">
                        Thank You for Your Application, {applicantName}!
                    </Heading>
                    <Text className="text-base text-gray-600">
                        We have successfully received your application for the GDG On Campus TIU Core Team.
                    </Text>
                    <Text className="text-base text-gray-600">
                        Our team will carefully review your submission and get back to you soon regarding the next steps.
                    </Text>
                    <Text className="text-base text-gray-600 mt-6">
                        Best Regards,
                        <br />
                        The GDG On Campus TIU Team
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default ConfirmationEmail;
