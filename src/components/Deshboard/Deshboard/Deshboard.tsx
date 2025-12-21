import ReduxAuthHoook from "../../../Hooks/ReduxAuthHoook";


const Deshboard = () => {



    const user = ReduxAuthHoook()
    console.log(user)



    return (
        <div>
            desh board home page
        </div>
    );
};

export default Deshboard;