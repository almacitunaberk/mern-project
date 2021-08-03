const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @acess   Private
router.post('/', [
    auth,
    [
        check('text', 'Text is required').notEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id,
            avatar: user.avatar,            
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    } 
});

// @route   GET api/posts
// @desc    Get all posts
// @acess   Private
router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/posts/:post_id
// @desc    Get a post by id
// @acess   Private
router.get('/:post_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.json(post);        
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjetId') {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a Post by Id
// @acess   Private
router.delete('/:post_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });            
        }        
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await post.remove();
        res.json({ msg: "Post removed" });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjetId') {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/posts/likes/:post_id
// @desc    Like a Post by ID
// @acess   Private
router.put('/likes/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Already liked" });
        } 
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a Post by ID
// @acess   Private
router.put('/unlike/:post_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not been liked yet" });
        }
        
        // Get the remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
        
    } catch (error) {        
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Post not found "});
        }
        res.status(500).send("Server Error");        
    }
});

module.exports = router;