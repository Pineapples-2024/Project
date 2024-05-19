import "@/styles/navigation.css"
import React from "react";

const pages: Record<string, string> = {
    "Home": "/",
    "About": "/about",
    "Gallery": "/gallery"
};


interface NavigationProps {
    focused: string;
}

function Navigation({ focused }: NavigationProps) {
    let links: React.JSX.Element[] = [];

    for (const pageName in pages) {
        links.push(<a key={pageName} className={(pageName.toLowerCase() == focused.toLowerCase()) ? "focused" : ""} href={pages[pageName]}>{pageName}</a>);
    }

    return <nav>
        <div>
            <img className="brand" src="/images/logo.png" alt="Pineapples Brand" />
        </div>
        <div className="hyperlinks">
            {links}
        </div>
        <div>
            <div className="profile" id="profile">
                <img className="profile-icon" src="/images/profile.png" alt="profile" />
            </div>
        </div>
    </nav>
}

export default Navigation;