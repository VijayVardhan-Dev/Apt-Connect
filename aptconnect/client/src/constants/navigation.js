import homeIcon from "../assets/icons/Home.png";
import exploreIcon from "../assets/icons/Explore.png";
import showcaseIcon from "../assets/icons/Showcase.png";
import chatsIcon from "../assets/icons/Chats.png";
import notifyIcon from "../assets/icons/Notification.png";
import feedbackIcon from "../assets/icons/feedback_icon.png";
import helpIcon from "../assets/icons/help_icon.png";

export const EXPLORE_LINKS = [
    { label: "Home", to: "/home", icon: homeIcon },
    { label: "Explore clubs", to: "/explore", icon: exploreIcon },
    { label: "Showcase", to: "/showcase", icon: showcaseIcon },
    { label: "Chats", to: "/chat", icon: chatsIcon },
    { label: "Notifications", to: "/notifications", icon: notifyIcon },
];

export const UTILITY_LINKS = [
    { label: "Feedback", to: "/feedback", icon: feedbackIcon },
    { label: "Help", to: "/help", icon: helpIcon },
];
