
export const useGenerateMoreVideos = ()=>{
    
    const generateMoreVideos = (startId = 9) => {
        const categories = ['Tech', 'Gaming', 'Music', 'Cooking', 'Travel', 'Fitness', 'Education'];
        const newVideos = [];

        for (let i = 0; i < 8; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            newVideos.push({
                id: (startId + i).toString(),
                title: `${category} Content - Amazing Video Tutorial ${startId + i}`,
                thumbnail: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=225&fit=crop`,
                duration: `${Math.floor(Math.random() * 30) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                views: `${Math.floor(Math.random() * 999)}K`,
                uploadTime: `${Math.floor(Math.random() * 7) + 1} days ago`,
                channel: {
                    name: `${category} Channel ${Math.floor(Math.random() * 100)}`,
                    avatar: `https://images.unsplash.com/photo-${1400000000000 + Math.floor(Math.random() * 100000000)}?w=40&h=40&fit=crop&crop=face`,
                    verified: Math.random() > 0.5
                }
            });
        }

        return newVideos;
    };
    return generateMoreVideos;
}