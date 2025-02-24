import { Fragment } from 'react';

import Form from '../../Components/FormPage/Form';

const Landing =()=>{

    return (
        <Fragment>
            <h5>
                Welcome to your own Expense Tracker
            </h5>
        <h6>
            Please fill in the below form to start tracking
        </h6>
        <Form/>
        </Fragment>
    )

}

export default Landing;