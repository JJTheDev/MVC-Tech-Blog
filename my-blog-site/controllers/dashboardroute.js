const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Helper function to get post data
const getPostData = (singlePost, postId, userId) => {
  const attributes = ['id', 'title', 'content', 'created_at'];
  const include = [
    {
      model: Comment,
      attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
      include: { model: User, attributes: ['username'] },
    },
    { model: User, attributes: ['username'] },
  ];
  const order = [['created_at', 'DESC']];

  if (singlePost) {
    return Post.findOne({ where: { id: postId }, attributes, include });
  }

  return Post.findAll({ where: { userId: userId }, attributes, include, order });
};

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await getPostData(false, null, req.session.userId);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await getPostData(true, req.params.id);
    const post = postData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: true, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { username: req.session.username });
});

module.exports = router;
