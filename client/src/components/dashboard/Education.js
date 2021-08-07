import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = ({ educations }) => {
    const edus = educations.map(ed => (
        <tr key={ed.id}>
            <td>{ed.school}</td>
            <td className="hide-sm">{ed.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{ed.from}</Moment> - {' '} {
                    ed.to === null ? (' Now') : 
                    (<Moment format="YYYY/MM/DD">{ed.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2"> Education Credentials </h2>
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
};

export default connect()(Education);
