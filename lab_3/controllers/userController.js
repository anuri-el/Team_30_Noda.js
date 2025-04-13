const userService = require('../services/userService');

exports.getUserDashboard = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await userService.getUserById(userId);
        if (!user) return res.status(404).send('User not found');

        res.render('user_dashboard', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
};