import React from "react";
import postImg from "../../assets/images/post.png";

export default function StoryRail() {
    // Mock avatars for stories
    const avatars = [postImg, postImg, postImg, postImg, postImg, postImg, postImg, postImg];

    return (
        <section className="flex justify-start py-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 items-center">
                {avatars.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`story-avatar-${i}`}
                        className="rounded-full object-cover border p-1 hover:scale-105 transition-transform cursor-pointer"
                        style={{ width: 82, height: 82 }}
                    />
                ))}
            </div>
        </section>
    );
}
