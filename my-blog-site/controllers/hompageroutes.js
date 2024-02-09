const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

// Helper function to get post data
const getPostData = (singlePost, postId) => {
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

  return Post.findAll({ attributes, include, order });
};

router.get('/', async (req, res) => {
  try {
    const postData = await getPostData(false);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await getPostData(true, req.params.id);
    const post = postData.get({ plain: true });
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
