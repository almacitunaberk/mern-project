import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
    const edus = education.map(ed => (
        <tr key={ed._id}>
            <td>{ed.school}</td>
            <td className="hide-sm">{ed.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{ed.from}</Moment> - {' '} {
                    ed.to === null ? (' Now') : 
                    (<Moment format="YYYY/MM/DD">{ed.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteEducation(ed._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>                
            </thead>
            <tbody> 
                { edus }
            </tbody>
        </Fragment>
    )
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {
    deleteEducation
})(Education);
