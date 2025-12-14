import React from 'react';
import AuthHook from '../../../Hooks/AuthHook';

const Deshboard = () => {


    const userInfo = AuthHook()
    console.log(userInfo)

    
    return (
        <div>
            desh board home page
        </div>
    );
};

export default Deshboard;