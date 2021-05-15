const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth =  require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Post,
                    attributes: ['title', 'id', 'createdAt', 'body'],
                },
            ],
        });

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('dashboard', { 
            user,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;