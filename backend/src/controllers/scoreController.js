const prisma = require('../config/prisma');

const calculateBurnoutScore = async (req, res) => {
    try {
        const { workHours, breakCount, stressLevel } = req.body;

        if (workHours === undefined || breakCount === undefined || stressLevel === undefined) {
            return res.status(400).json({
                message: 'Please provide workHours, breakCount, and stressLevel'
            });
        }

        if (workHours < 0 || breakCount < 0 || stressLevel < 0 || stressLevel > 10) {
            return res.status(400).json({
                message: 'Invalid input values. workHours and breakCount must be >= 0, stressLevel must be 0-10'
            });
        }

        const rawScore = ((workHours * 10) + (stressLevel * 5)) / (breakCount + 1);
        const score = Math.min(Math.max(rawScore, 0), 100);

        let status;
        if (score > 70) {
            status = 'High Risk';
        } else if (score > 40) {
            status = 'Moderate Risk';
        } else {
            status = 'Low Risk';
        }

        const burnoutScore = await prisma.burnoutScore.create({
            data: {
                userId: req.userId,
                workHours,
                breakCount,
                stressLevel,
                score,
                status,
            },
        });

        res.status(201).json({
            message: 'Burnout score calculated successfully',
            data: {
                id: burnoutScore.id,
                score: Math.round(score * 100) / 100,
                status,
                workHours,
                breakCount,
                stressLevel,
                createdAt: burnoutScore.createdAt,
            },
        });
    } catch (error) {
        console.error('Calculate Burnout Score Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserScores = async (req, res) => {
    try {
        const scores = await prisma.burnoutScore.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });

        res.status(200).json({
            message: 'Scores retrieved successfully',
            data: scores,
        });
    } catch (error) {
        console.error('Get User Scores Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { calculateBurnoutScore, getUserScores };
