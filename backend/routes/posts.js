const express = require('express');
const router = express.Router(); 
//temporary in memory storage until database is initialized
let posts = [];
//Create post 
router.post("/", (req,res) => {
    const { title,content, userId } = req.body;

    if (!title || !content || !userId ) {
        return res.status(400).json({
            error: "title, content and userId are required fields"
        });
    }
    const newPost = {
        id: Date.now(),
        title, 
        content,
        userId,
        createdAt: new Date()
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});
//Get all posts
router.get("/", (req,res) => {
    res.json(posts);
});

//Get single post
router.get("/:id", (req,res) =>{
    const postId = Number(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
});

//Delete post
router.delete("/:id", (req,res) => {
    const postId = Number(req.params.id);
    const postExists = posts.some(p => p.id === postId);
    if(!postExists) {
        return res.status(404).json({ error: "Post not found" });
    }
    posts = posts.filter(p => p.id !== postId);
    res.json({ message: "Post deleted" });
});

module.exports = router;