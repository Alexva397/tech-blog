const router = require('express').Router()
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'body', 'user_id', 'post_id', 'createdAt'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });
        
        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newpost', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
      res.render('newpost', {
        logged_in: req.session.logged_in
      });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
});

router.get('/newuser', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('newUser');
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    }
    else {
        res.status(204).redirect('/');
    }
});

module.exports = router;
  