
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route   GET api/coding/tracks
// @desc    Get all coding tracks
// @access  Public
router.get('/tracks', async (req, res) => {
  try {
    // Mock data for now - will be replaced with database queries
    const tracks = [
      {
        trackId: 'dsa-track',
        title: 'Data Structures & Algorithms',
        description: 'Master essential data structures and algorithms concepts for technical interviews',
        progress: 32,
        totalProblems: 45,
        solvedProblems: 14,
        sections: [] // sections would be populated from DB
      },
      {
        trackId: 'web-dev-track',
        title: 'Web Development',
        description: 'Learn modern web development with React, Node.js, and related technologies',
        progress: 15,
        totalProblems: 30,
        solvedProblems: 5,
        sections: [] // sections would be populated from DB
      },
      {
        trackId: 'java-track',
        title: 'Java Programming',
        description: 'Master Java programming language and related frameworks',
        progress: 8,
        totalProblems: 25,
        solvedProblems: 2,
        sections: [] // sections would be populated from DB
      }
    ];
    
    res.json(tracks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/coding/problems/:id
// @desc    Get problem by ID
// @access  Public
router.get('/problems/:id', async (req, res) => {
  try {
    // Mock data - will be replaced with database lookup
    const problem = {
      id: req.params.id,
      title: 'Two Sum',
      difficulty: 'easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        'Only one valid answer exists.'
      ],
      starterCode: {
        javascript: 'function twoSum(nums, target) {\n  // Your code here\n}\n',
        python: 'def two_sum(nums, target):\n    # Your code here\n    pass\n',
        java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}'
      }
    };
    
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/coding/submissions
// @desc    Submit solution for a problem
// @access  Private
router.post('/submissions', 
  [
    auth,
    [
      check('problemId', 'Problem ID is required').not().isEmpty(),
      check('language', 'Language is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { problemId, language, code } = req.body;
      
      // Mock submission result - in production, this would be processed by a judge system
      const result = {
        status: Math.random() > 0.3 ? 'accepted' : 'wrong_answer',
        executionTime: Math.floor(Math.random() * 500) + 50,
        memoryUsed: Math.floor(Math.random() * 10) + 5,
        testCases: [
          { input: '[2,7,11,15], 9', output: '[0,1]', passed: true },
          { input: '[3,2,4], 6', output: '[1,2]', passed: Math.random() > 0.3 }
        ]
      };
      
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   POST api/coding/ai/review
// @desc    Get AI code review
// @access  Private
router.post('/ai/review', auth, async (req, res) => {
  try {
    const { code, language } = req.body;
    
    // Mock AI response - in production, this would call an AI service
    setTimeout(() => {
      const review = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        feedback: "Your code is well-structured but could be optimized for better performance.",
        suggestions: [
          "Consider using a hash map to improve time complexity",
          "Add error handling for edge cases",
          "Use more descriptive variable names"
        ],
        detailedScores: [
          { category: "Code Structure", score: Math.floor(Math.random() * 20) + 70 },
          { category: "Performance", score: Math.floor(Math.random() * 20) + 70 },
          { category: "Readability", score: Math.floor(Math.random() * 20) + 80 },
          { category: "Best Practices", score: Math.floor(Math.random() * 20) + 75 }
        ]
      };
      
      res.json(review);
    }, 1000); // Simulate API delay
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/coding/rooms
// @desc    Get collaborative coding rooms
// @access  Private
router.get('/rooms', auth, async (req, res) => {
  try {
    // Mock rooms data - would come from database
    const rooms = [
      { id: 'room1', title: 'DSA Problem Solving', participants: 3, language: 'javascript', isActive: true },
      { id: 'room2', title: 'Web Dev Project', participants: 5, language: 'javascript', isActive: true },
      { id: 'room3', title: 'Java Coding Session', participants: 2, language: 'java', isActive: false }
    ];
    
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
