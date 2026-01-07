const prisma = require('../config/prisma');

const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Get Profile Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getProfile };
