import React, { type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface Authprops {
    children: ReactNode
}

const Authprovider = ({ children }: Authprops) => {



    const contextInformation = {
        name: "Adnan"
    }

    return (
        <AuthContext value={contextInformation}>
            {children}
        </AuthContext>
    );
};

export default Authprovider;