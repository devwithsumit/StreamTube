// Calculate password strength
export const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 20;
    return strength;
};

export const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const getPasswordStrengthColor = (passwordStrength) => {
    if (passwordStrength <= 20) return 'bg-error';
    if (passwordStrength <= 40) return 'bg-warning';
    if (passwordStrength <= 60) return 'bg-warning';
    if (passwordStrength <= 80) return 'bg-warning';
    return 'bg-success';
};

export const getPasswordStrengthText = (passwordStrength) => {
    if (passwordStrength <= 20) return 'Weak';
    if (passwordStrength <= 40) return 'Fair';
    if (passwordStrength <= 60) return 'Good';
    if (passwordStrength <= 80) return 'Better';
    return 'Strong';
};