import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}) => {
    return (
        <div className="mb-4">
            <h2 className="text-center text-white text-3xl font-extrabold block font-sans antialiased leading-snug tracking-normal">
                {heading}
            </h2>
            <p className="mt-4 text-center text-sm text-white">
                {paragraph} {' '}
                <Link to={linkUrl} className="ml-2 font-medium text-purple-600 hover:text-purple-900">
                    {linkName}
                </Link>
            </p>
        </div>
    );
}

export default Header;