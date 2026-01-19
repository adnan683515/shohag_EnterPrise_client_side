import ReduxAuthHoook from "../../../Hooks/ReduxAuthHoook";
import Transection from "../../Transection/Transection";


const Deshboard = () => {



    const user = ReduxAuthHoook()
    console.log(user)



    return (
        <div>
            <Transection></Transection>
        </div>
    );
};

export default Deshboard;