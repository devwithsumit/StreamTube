// Mock videos data
export const mockVideos = [
    {
        id: '1',
        title: 'Building a Modern React App with Vite and TypeScript - Complete Tutorial',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        duration: '24:15',
        views: '125K',
        uploadTime: '2 days ago',
        channel: {
            name: 'TechMaster Pro',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            verified: true
        }
    },
    {
        id: '2',
        title: 'Amazing Nature Documentary: Wildlife in 4K Ultra HD',
        thumbnail: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?w=400&h=225&fit=crop',
        duration: '45:30',
        views: '2.3M',
        uploadTime: '1 week ago',
        channel: {
            name: 'Nature Explorer',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        }
    },
    {
        id: '3',
        title: 'Top 10 JavaScript Tips Every Developer Should Know in 2024',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
        duration: '18:42',
        views: '89K',
        uploadTime: '3 days ago',
        channel: {
            name: 'CodeWithSarah',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
            verified: false
        }
    },
    {
        id: '4',
        title: 'Epic Gaming Montage - Best Moments of 2024',
        thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=225&fit=crop',
        duration: '12:08',
        views: '456K',
        uploadTime: '5 days ago',
        channel: {
            name: 'GameZone Official',
            avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        }
    },
    {
        id: '5',
        title: 'Relaxing Piano Music for Study and Work - 2 Hours',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
        duration: '2:15:30',
        views: '1.8M',
        uploadTime: '1 day ago',
        channel: {
            name: 'Peaceful Sounds',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            verified: false
        }
    },
    {
        id: '6',
        title: 'Cooking Masterclass: Perfect Italian Pasta from Scratch',
        thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=225&fit=crop',
        duration: '32:45',
        views: '234K',
        uploadTime: '4 days ago',
        channel: {
            name: 'Chef Marco',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        }
    },
    {
        id: '7',
        title: 'Travel Vlog: Exploring Hidden Gems in Japan',
        thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=225&fit=crop',
        duration: '28:12',
        views: '567K',
        uploadTime: '6 days ago',
        channel: {
            name: 'Wanderlust Adventures',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            verified: false
        }
    },
    {
        id: '8',
        title: 'Fitness Challenge: 30-Day Transformation Results',
        thumbnail: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?w=400&h=225&fit=crop',
        duration: '15:33',
        views: '892K',
        uploadTime: '2 days ago',
        channel: {
            name: 'FitLife Coach',
            avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        }
    }
];

//Mock Video data / video
export const mockVideo = {
    id: '1',
    title: "Building a Modern React Application with Advanced Hooks and State Management",
    description: `
        In this comprehensive tutorial, we'll dive deep into building a modern React application using the latest features and best practices. We'll cover advanced hooks, state management patterns, performance optimization techniques, and how to structure your components for maximum reusability.
        What you'll learn:
        • Advanced React Hooks (useCallback, useMemo, useReducer)
        • Context API for state management
        • Custom hooks for reusable logic
        • Performance optimization techniques
        • Component composition patterns
        • Testing strategies for React applications

        This tutorial is perfect for developers who have a basic understanding of React and want to take their skills to the next level. We'll build a real-world application from scratch, implementing features like user authentication, data fetching, and responsive design.

        Resources mentioned in the video:
        - React Documentation: https://reactjs.org
        - Testing Library: https://testing-library.com
        - GitHub Repository: https://github.com/example/react-tutorial

        Don't forget to subscribe for more React tutorials and web development content!
    `,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1280&h=720&fit=crop",
    duration: "24:35",
    views: 125000,
    likes: 8500,
    dislikes: 120,
    uploadDate: "2024-01-15",
    uploadTime: "3 days ago",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    channel: {
        id: "tech-channel-1",
        name: "TechMaster Pro",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        subscribers: "2.4M",
        verified: true,
        isSubscribed: false
    },
    tags: ["React", "JavaScript", "Web Development", "Tutorial", "Programming"],
    category: "Education"
};
//Mock Video data / related videos

export const mockRelatedVideos = [
    {
        id: "2",
        title: "Advanced JavaScript Concepts Every Developer Should Know",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop",
        duration: "18:42",
        views: 89000,
        uploadTime: "1 week ago",
        channel: {
            name: "CodeMaster",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            verified: true
        }
    },
    {
        id: "3",
        title: "CSS Grid vs Flexbox: When to Use Each Layout Method",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=180&fit=crop",
        duration: "15:20",
        views: 156000,
        uploadTime: "5 days ago",
        channel: {
            name: "DesignDev",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: false
        }
    },
    {
        id: "4",
        title: "Node.js Backend Development Complete Course",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=320&h=180&fit=crop",
        duration: "2:45:30",
        views: 234000,
        uploadTime: "2 weeks ago",
        channel: {
            name: "BackendGuru",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            verified: true
        }
    },
    {
        id: "5",
        title: "Database Design Fundamentals for Web Developers",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=320&h=180&fit=crop",
        duration: "32:15",
        views: 67000,
        uploadTime: "4 days ago",
        channel: {
            name: "DataExpert",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            verified: false
        }
    },
    {
        id: "6",
        title: "TypeScript for React Developers - Complete Guide",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&h=180&fit=crop",
        duration: "41:28",
        views: 198000,
        uploadTime: "1 week ago",
        channel: {
            name: "TypeScriptPro",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: true
        }
    }
];

//Mock Video data / Comments
export const mockComments = [
    {
        id: "1",
        author: {
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            verified: false
        },
        content: "This is exactly what I was looking for! The explanation of useCallback and useMemo was crystal clear. Thanks for the great content!",
        timestamp: "2 hours ago",
        likes: 45,
        replies: [
            {
                id: "1-1",
                author: {
                    name: "TechMaster Pro",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                    verified: true,
                    isChannelOwner: true
                },
                content: "Thanks Alex! I\'m glad you found it helpful. Make sure to check out the GitHub repo for the complete code examples.",
                timestamp: "1 hour ago",
                likes: 12
            }
        ]
    },
    {
        id: "2",
        author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: false
        },
        content: "Could you make a follow-up video about testing these custom hooks? I\'m struggling with that part of my project.",
        timestamp: "4 hours ago",
        likes: 23,
        replies: []
    },
    {
        id: "3",
        author: {
            name: "Mike Rodriguez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            verified: false
        },
        content: "Great tutorial! One question though - at 15:30, why did you choose useReducer over useState for that particular case?",
        timestamp: "6 hours ago",
        likes: 18,
        replies: [
            {
                id: "3-1",
                author: {
                    name: "DevExpert",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                    verified: false
                },
                content: "Not the creator, but useReducer is better when you have complex state logic with multiple sub-values or when the next state depends on the previous one.",
                timestamp: "5 hours ago",
                likes: 8
            }
        ]
    }
];

// Mock credentials for testing
export const mockCredentials = {
    admin: { email: 'admin@streamtube.com', password: 'admin123' },
    users: [
        { email: 'sumit2410kushwaha@gmail.com', password: `hjkl;'`, firstName: 'Sumit', lastName: 'Kushwah',}
    ],
    creator: { email: 'creator@streamtube.com', password: 'creator123' },
};

// Mock Subscription data
export const subscriptionVideos = [
    {
        id: 'sub-1',
        title: 'Weekly Tech News Roundup - What You Missed This Week',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop',
        duration: '15:30',
        views: '45K',
        uploadTime: '2 hours ago',
        channel: {
            name: 'TechMaster Pro',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            verified: true
        },
        isNew: true
    },
    {
        id: 'sub-2',
        title: 'Amazing Cooking Tips That Will Change Your Life',
        thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=225&fit=crop',
        duration: '22:15',
        views: '128K',
        uploadTime: '4 hours ago',
        channel: {
            name: 'Chef Marco',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        },
        isNew: true
    },
    {
        id: 'sub-3',
        title: 'Epic Gaming Moments - You Won\'t Believe What Happened',
        thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=225&fit=crop',
        duration: '18:45',
        views: '89K',
        uploadTime: '6 hours ago',
        channel: {
            name: 'GameZone Official',
            avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face',
            verified: true
        },
        isNew: true
    },
    {
        id: 'sub-4',
        title: 'Travel Guide: Hidden Gems You Must Visit',
        thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=225&fit=crop',
        duration: '25:12',
        views: '67K',
        uploadTime: '8 hours ago',
        channel: {
            name: 'Wanderlust Adventures',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            verified: false
        },
        isNew: false
    }
];
export const subscribedChannels = [
    {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        hasNewContent: true,
        isLive: false
    },
    {
        name: 'Chef Marco',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face',
        hasNewContent: true,
        isLive: false
    },
    {
        name: 'GameZone Official',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face',
        hasNewContent: false,
        isLive: true
    },
    {
        name: 'Wanderlust Adventures',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        hasNewContent: true,
        isLive: false
    },
    {
        name: 'Peaceful Sounds',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        hasNewContent: false,
        isLive: false
    }
];

// Mock search results data
export const mockSearchResults = [
    {
        id: '1',
        title: 'React Tutorial for Beginners - Complete Course 2024',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        duration: '3:45:20',
        views: '2.1M',
        uploadTime: '6 months ago',
        channel: {
            name: 'CodeMaster',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            verified: true,
            subscribers: '1.2M'
        },
        description: 'Learn React from scratch with this comprehensive tutorial. Perfect for beginners who want to master modern web development.',
        type: 'video'
    },
    {
        id: '2',
        title: 'JavaScript ES6+ Features Explained',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
        duration: '28:15',
        views: '856K',
        uploadTime: '3 weeks ago',
        channel: {
            name: 'WebDev Pro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            verified: false,
            subscribers: '450K'
        },
        description: 'Explore the latest JavaScript features including arrow functions, destructuring, async/await, and more.',
        type: 'video'
    },
    {
        id: 'channel-1',
        title: 'TechTalks Channel',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
        subscribers: '2.5M',
        videoCount: '1,234',
        description: 'Weekly tech discussions, product reviews, and industry insights from Silicon Valley experts.',
        type: 'channel',
        recentVideos: [
            { title: 'iPhone 15 Pro Review', views: '1.2M', uploadTime: '2 days ago' },
            { title: 'AI Revolution in 2024', views: '890K', uploadTime: '1 week ago' }
        ]
    },
    {
        id: 'playlist-1',
        title: 'Full Stack Development Bootcamp',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        videoCount: 45,
        creator: 'DevAcademy',
        description: 'Complete full stack development course covering HTML, CSS, JavaScript, React, Node.js, and databases.',
        type: 'playlist',
        totalDuration: '12:30:00'
    },
    {
        id: '3',
        title: 'CSS Grid Layout Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
        duration: '1:15:30',
        views: '423K',
        uploadTime: '2 months ago',
        channel: {
            name: 'CSS Wizard',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
            verified: true,
            subscribers: '890K'
        },
        description: 'Master CSS Grid with practical examples and real-world projects. Build responsive layouts like a pro.',
        type: 'video'
    },
    {
        id: '4',
        title: 'Node.js Backend Development',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
        duration: '2:20:45',
        views: '1.8M',
        uploadTime: '4 months ago',
        channel: {
            name: 'Backend Guru',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            verified: true,
            subscribers: '2.1M'
        },
        description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Includes authentication and deployment.',
        type: 'video'
    }
];