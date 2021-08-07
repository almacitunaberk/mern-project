import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileExperience = ({ experience: { company, from, current, to, location, title, description}}) => {
    return (
        <Fragment>            
            <div>
                <h3 class="text-dark">{company}</h3>
                <p>
                    <Moment format="YYYY/MM/DD">{from}</Moment> {' - '}
                        {current ? 
                            ' Current' : 
                            <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
                <p><strong>Position: </strong>{title}</p>
                <p>
                <strong>Description: </strong> {description}
                </p>
             </div>                   
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
