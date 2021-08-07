import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? 
            <Spinner /> : 
            <Fragment>
                <h1 class="large text-primary">
                    Posts
                </h1>
                <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>

                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}

                <div class="post-form">
                    <div class="bg-primary p">
                        <h3>Say Something...</h3>
                    </div>
                    <form class="form my-1">
                        <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                        ></textarea>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>
            </Fragment>
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPosts
})(Posts);
