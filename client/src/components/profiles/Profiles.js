import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles();        
    }, []);

    return (
        <Fragment>
         {loading ? 
            <Spinner /> : 
                <Fragment>
                    <h1 className="large text-primary">Profiles</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop">Browse and Connect with Developers</i>
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                        ) : <h4>No profiles found</h4> }                    
                    </div>
                </Fragment>
         }
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {
    getAllProfiles
})(Profiles);
