import React from 'react'
import { Link } from 'react-router-dom'

const FooterLinks = () => {
    return (
        <div className="mt-8 text-center space-x-4 text-xs text-text-secondary">
            <Link to="#" className="hover:text-text-primary transition-colors duration-150">
                Privacy Policy
            </Link>
            <span>•</span>
            <Link to="#" className="hover:text-text-primary transition-colors duration-150">
                Terms of Service
            </Link>
            <span>•</span>
            <Link to="#" className="hover:text-text-primary transition-colors duration-150">
                Help Center
            </Link>
        </div>
    )
}

export default FooterLinks