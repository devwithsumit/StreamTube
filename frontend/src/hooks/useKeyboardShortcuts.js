import { useEffect } from "react";

export const useKeyboardShortcuts = () => {
    useEffect(() => {
        // Keyboard shortcuts
        const handleKeyPress = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    // Toggle play/pause
                    break;
                case 'f':
                    // Toggle fullscreen
                    break;
                case 'm':
                    // Toggle mute
                    break;
                case 'ArrowLeft':
                    // Seek backward
                    break;
                case 'ArrowRight':
                    // Seek forward
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);
}