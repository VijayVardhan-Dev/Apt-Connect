import React from 'react'

const post = ({ post, onLike, onSave, onComment }) => {


        const {
           id = "",
           author = "",
           time = "",
           avatar = "",
           text = "",
           hashtags =  [],
           image = "",
           saveIcon = "",
           likeIcon = "",
           commentIcon = "",
           viewsIcon = "",
           views =  "",
           likes = "",
           comments = "",
        } = post || {};


        const hashtagList = Array.isArray(hashtags)
        ? hashtags
        : (typeof hashtags === "string" && hashtags.length > 0)
        ? hashtags.split(/\s*,\s*|\s+/)
        : [];

  return (
    <>

            <article
            aria-labelledby={`post-${id}-title`}
            className=" overflow-hidden w-full max-w-[640px] mx-auto"
            >
             <header className="flex items-start gap-3 px-2 py-2">
                <img src={avatar} alt="author" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{author}</div>
                      <div className="text-xs text-slate-500">{time}</div>
                    </div>
                    <div className="text-zinc-400 text-xl leading-none">⋮</div>
                  </div>
                </div>
              </header>

              
              <div className="px-2 pb-4">
                <p className="text-slate-600 text-sm leading-6 pt-1">{text}</p>

                <div className="pt-3 pb-2">
                  <button className="text-sky-500 font-semibold text-sm">
                    {hashtagList.map((tag, index) => (
                      <span key={index} className="mr-2">
                        #{tag}
                      </span>
                    ))}
                  </button>
                </div>

                {/* Image aligned to left under text */}
                <div className="pb-4">
                  <img
                    src={image}
                    alt="post-media"
                    className="rounded-md object-cover w-[520px] h-auto"
                  />
                </div>

                {/* Footer icons */}
                <div className="pt-2 pb-2">
                  <div className="flex items-center gap-6 text-sm text-neutral-600 px-2">
                    <div className="flex items-center gap-2">
                      <img src={viewsIcon} alt="views" className="w-4 h-4 object-contain" />
                      <div className="text-xs">{views}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={likeIcon} onClick={onLike} alt="likes" className="w-4 h-4 object-contain" />
                      <div className="text-xs text-rose-600">{likes}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={commentIcon} onClick={onComment} alt="comments" className="w-4 h-4 object-contain" />
                      <div className="text-xs">{comments}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={saveIcon} onClick={onSave} alt="save" className="w-4 h-4 object-contain" />
                      <div className="text-xs">Save</div>
                    </div>
                  </div>
                </div>
              </div>
              </article>
              </>

  )
}

export default post