# App-
import { useState } from "react";

const VENUES = [
  { name: "Victory Lap", dist: "0.4 mi", vibe: "Celebratory", price: "$$", crowd: 92 },
  { name: "Dick's Den", dist: "0.5 mi", vibe: "Laid-back", price: "$", crowd: 67 },
  { name: "The Library Bar", dist: "0.6 mi", vibe: "Casual", price: "$", crowd: 74 },
  { name: "Out-R-Inn", dist: "0.7 mi", vibe: "Divey", price: "$", crowd: 55 },
  { name: "Midway on High", dist: "0.9 mi", vibe: "Lively", price: "$$", crowd: 81 },
];

const POSTS = [
  { id: 1, time: "2m", text: "Victory Lap is PACKED rn 🔥 DJ absolutely going off", likes: 14, comments: 3, hasImg: false },
  { id: 2, time: "17m", text: "Is theta chi bouse", likes: 5, comments: 8, hasImg: true },
  { id: 3, time: "52m", text: "Ben Grama stole TKE's Panda 🐼", likes: 1, comments: 0, hasImg: false },
  { id: 4, time: "54m", text: "Theta Chi confirmed gay!??", likes: 12, comments: 4, hasImg: false },
];

const STORIES = [
  { name: "Dillon\nSchmidt", color: "#8B5CF6" },
  { name: "AJ\nPopov", color: "#6366F1" },
  { name: "Thr3es", color: "#4F46E5" },
  { name: "Mike V", color: "#7C3AED" },
];

function CrowdBar({ pct }) {
  const color = pct > 85 ? "#ef4444" : pct > 65 ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 700, minWidth: 28 }}>{pct}%</span>
    </div>
  );
}

export default function NightlifeApp() {
  const [tab, setTab] = useState("live");
  const [socialTab, setSocialTab] = useState("people");
  const [likedPosts, setLikedPosts] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (id) => setLikedPosts(p => ({ ...p, [id]: !p[id] }));

  const tabs = [
    { id: "live", label: "Live", icon: LiveIcon },
    { id: "social", label: "Social", icon: SocialIcon },
    { id: "post", label: "", icon: PlusIcon, isPost: true },
    { id: "explore", label: "Explore", icon: ExploreIcon },
    { id: "profile", label: "Profile", icon: ProfileIcon },
  ];

  return (
    <div style={{
      width: 390,
      height: 844,
      background: "#080810",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      borderRadius: 44,
      boxShadow: "0 40px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)",
      margin: "0 auto",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px 0", fontSize: 13, fontWeight: 600 }}>
        <span>9:31</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11 }}>●●●</span>
          <span style={{ fontSize: 11 }}>▲</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ height: "calc(100% - 90px)", overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>
        {tab === "live" && <LivePage />}
        {tab === "social" && <SocialPage socialTab={socialTab} setSocialTab={setSocialTab} posts={POSTS} likedPosts={likedPosts} toggleLike={toggleLike} />}
        {tab === "explore" && <ExplorePage />}
        {tab === "profile" && <ProfilePage />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 86,
        background: "linear-gradient(to top, #080810 60%, rgba(8,8,16,0.95))",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px 16px",
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => t.isPost ? setShowPost(true) : setTab(t.id)}
            style={{
              background: t.isPost
                ? "linear-gradient(135deg, #7C3AED, #4F46E5)"
                : "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: t.isPost ? 0 : "6px 12px",
              borderRadius: t.isPost ? "50%" : 12,
              width: t.isPost ? 52 : "auto",
              height: t.isPost ? 52 : "auto",
              justifyContent: "center",
              boxShadow: t.isPost ? "0 4px 20px rgba(124,58,237,0.5)" : "none",
              transform: t.isPost ? "translateY(-8px)" : "none",
              position: "relative",
            }}
          >
            <t.icon active={tab === t.id} isPost={t.isPost} />
            {!t.isPost && (
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: tab === t.id ? "#8B5CF6" : "rgba(255,255,255,0.35)",
                letterSpacing: 0.3,
              }}>{t.label}</span>
            )}
            {tab === t.id && !t.isPost && (
              <div style={{
                position: "absolute", bottom: -2, width: 4, height: 4,
                borderRadius: "50%", background: "#8B5CF6",
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Post Modal */}
      {showPost && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", borderRadius: 44, zIndex: 100,
        }}>
          <div style={{
            background: "#10101E",
            borderRadius: "28px 28px 0 0",
            padding: "24px 24px 40px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, margin: "0 auto 24px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Post an Update</div>
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="What's happening tonight?"
              style={{
                width: "100%", minHeight: 100, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16,
                color: "#fff", fontSize: 15, padding: 16, resize: "none",
                outline: "none", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button onClick={() => setShowPost(false)} style={{
                flex: 1, padding: "14px", background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
                color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={() => { setShowPost(false); setNewPost(""); }} style={{
                flex: 2, padding: "14px",
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                border: "none", borderRadius: 14,
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LIVE_VIDEOS = [
  {
    id: 1,
    user: "@Thr3es",
    venue: "Victory Lap",
    caption: "Djmgod doing it 🔥",
    timeAgo: "4 days ago",
    likes: 38,
    comments: 7,
    bg: "linear-gradient(160deg, #8B0000 0%, #1a0a3e 45%, #0a1a4e 100%)",
    glow: "radial-gradient(circle at 30% 65%, rgba(255,60,60,0.35) 0%, transparent 55%), radial-gradient(circle at 72% 38%, rgba(60,60,255,0.25) 0%, transparent 50%)",
    isLive: true,
    viewers: 142,
  },
  {
    id: 2,
    user: "@DillonSchmidt",
    venue: "Out-R-Inn",
    caption: "Saturday night energy unmatched rn 🎶",
    timeAgo: "2 hours ago",
    likes: 91,
    comments: 14,
    bg: "linear-gradient(160deg, #003a1a 0%, #0a2e0a 40%, #001a10 100%)",
    glow: "radial-gradient(circle at 50% 50%, rgba(0,200,80,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,200,0,0.15) 0%, transparent 50%)",
    isLive: false,
    viewers: 0,
  },
  {
    id: 3,
    user: "@AJPopov",
    venue: "Midway on High",
    caption: "Pre-game vibes before the madness 🏈",
    timeAgo: "6 hours ago",
    likes: 55,
    comments: 9,
    bg: "linear-gradient(160deg, #1a0a00 0%, #2e1800 40%, #0a0500 100%)",
    glow: "radial-gradient(circle at 40% 60%, rgba(255,120,0,0.3) 0%, transparent 55%), radial-gradient(circle at 65% 30%, rgba(200,60,0,0.2) 0%, transparent 50%)",
    isLive: false,
    viewers: 0,
  },
];

function LivePage() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [likedVideos, setLikedVideos] = useState({});

  const video = LIVE_VIDEOS[currentVideo];
  const liked = likedVideos[video.id];

  const goNext = () => setCurrentVideo(v => Math.min(v + 1, LIVE_VIDEOS.length - 1));
  const goPrev = () => setCurrentVideo(v => Math.max(v - 1, 0));

  return (
    <div
      style={{
        position: "relative",
        height: "calc(844px - 90px - 36px)",
        overflow: "hidden",
        background: "#000",
      }}
      onTouchStart={e => { e._startY = e.touches[0].clientY; }}
      onTouchEnd={e => {
        const dy = e._startY - e.changedTouches[0].clientY;
        if (dy > 40) goNext();
        else if (dy < -40) goPrev();
      }}
    >
      {/* Full-screen video background */}
      <div style={{
        position: "absolute", inset: 0,
        background: video.bg,
        transition: "background 0.4s ease",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: video.glow }} />
        {/* Simulated crowd/venue particles */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(circle at 60% 45%, rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 80px 80px, 100px 100px",
        }} />
        {/* Bottom gradient fade for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.4) 100%)",
        }} />
      </div>

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px 0", zIndex: 10,
      }}>
        {/* Live / For You tabs */}
        <div style={{ display: "flex", gap: 20 }}>
          {["For You", "Following"].map((t, i) => (
            <span key={i} style={{
              fontSize: 16, fontWeight: i === 0 ? 800 : 500,
              color: i === 0 ? "#fff" : "rgba(255,255,255,0.45)",
              borderBottom: i === 0 ? "2px solid #8B5CF6" : "none",
              paddingBottom: 4, cursor: "pointer",
            }}>{t}</span>
          ))}
        </div>
        {video.isLive && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(239,68,68,0.85)", borderRadius: 8,
            padding: "4px 10px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>LIVE</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{video.viewers}</span>
          </div>
        )}
      </div>

      {/* Scroll indicators */}
      <div style={{
        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6, zIndex: 10,
      }}>
        {LIVE_VIDEOS.map((_, i) => (
          <div key={i} onClick={() => setCurrentVideo(i)} style={{
            width: 3, height: i === currentVideo ? 24 : 12,
            borderRadius: 2,
            background: i === currentVideo ? "#8B5CF6" : "rgba(255,255,255,0.25)",
            cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Right action buttons */}
      <div style={{
        position: "absolute", right: 16, bottom: 110,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 22,
        zIndex: 10,
      }}>
        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            border: "2px solid #fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>👤</div>
          <div style={{
            position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
            width: 18, height: 18, borderRadius: "50%",
            background: "#8B5CF6", border: "2px solid #080810",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 800,
          }}>+</div>
        </div>

        {/* Like */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
          onClick={() => setLikedVideos(p => ({ ...p, [video.id]: !p[video.id] }))}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: liked ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, border: `1px solid ${liked ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.15)"}`,
            transition: "all 0.2s",
          }}>
            {liked ? "♥" : "♡"}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: liked ? "#8B5CF6" : "rgba(255,255,255,0.8)" }}>
            {video.likes + (liked ? 1 : 0)}
          </span>
        </div>

        {/* Comment */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, border: "1px solid rgba(255,255,255,0.15)",
          }}>💬</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{video.comments}</span>
        </div>

        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, border: "1px solid rgba(255,255,255,0.15)",
          }}>↗</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Share</span>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{
        position: "absolute", bottom: 24, left: 16, right: 70,
        zIndex: 10,
      }}>
        {/* Venue pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
          borderRadius: 20, padding: "5px 12px", marginBottom: 10,
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          <span style={{ fontSize: 11 }}>📍</span>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{video.venue}</span>
        </div>

        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{video.user}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.4, marginBottom: 8 }}>{video.caption}</div>

        {/* Audio bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(0,0,0,0.35)", borderRadius: 20, padding: "6px 12px",
          width: "fit-content",
        }}>
          <span style={{ fontSize: 12 }}>🎵</span>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            {[6,10,14,8,12,10,6,14,10,8].map((h, i) => (
              <div key={i} style={{
                width: 3, height: h,
                background: "#8B5CF6", borderRadius: 1,
                animation: `eq ${0.4 + i * 0.07}s ease-in-out infinite alternate`,
                opacity: 0.8 + (i % 3) * 0.07,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{video.timeAgo}</span>
        </div>
      </div>

      {/* Swipe hint arrows */}
      {currentVideo > 0 && (
        <div onClick={goPrev} style={{
          position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.3)", fontSize: 20, cursor: "pointer", zIndex: 10,
        }}>∧</div>
      )}
      {currentVideo < LIVE_VIDEOS.length - 1 && (
        <div onClick={goNext} style={{
          position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.3)", fontSize: 20, cursor: "pointer", zIndex: 10,
        }}>∨</div>
      )}

      <style>{`
        @keyframes eq {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}

function SocialPage({ socialTab, setSocialTab, posts, likedPosts, toggleLike }) {
  return (
    <div style={{ paddingTop: 20 }}>
      {/* Header */}
      <div style={{ padding: "0 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Social</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>🔍</button>
          <button style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>✉️</button>
        </div>
      </div>

      {/* Tab pills */}
      <div style={{ display: "flex", gap: 8, padding: "0 24px 20px" }}>
        {["people", "venues", "friends"].map(t => (
          <button key={t} onClick={() => setSocialTab(t)} style={{
            padding: "8px 18px",
            background: socialTab === t ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,0.06)",
            border: socialTab === t ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: socialTab === t ? "0 4px 12px rgba(124,58,237,0.4)" : "none",
            textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      {/* Stories row */}
      <div style={{ display: "flex", gap: 14, overflowX: "auto", padding: "0 24px 20px", scrollbarWidth: "none" }}>
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 18,
            background: "rgba(255,255,255,0.06)",
            border: "2px dashed rgba(124,58,237,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer",
          }}>+</div>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Add</span>
        </div>
        {STORIES.map((s, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: `linear-gradient(135deg, ${s.color}, #1a1a2e)`,
              border: `2px solid ${s.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, boxShadow: `0 4px 14px ${s.color}50`,
            }}>👤</div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.2 }}>{s.name.replace("\n", " ").split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map(post => (
          <div key={post.id} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 22, overflow: "hidden",
          }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: "linear-gradient(135deg, #7C3AED33, #4F46E533)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                }}>👤</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Anonymous</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{post.time} ago</div>
                </div>
                <button style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 18 }}>···</button>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: "rgba(255,255,255,0.9)" }}>{post.text}</p>
            </div>

            {post.hasImg && (
              <div style={{
                height: 180,
                background: "linear-gradient(135deg, #2d1b69, #1a103c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40,
              }}>🌌</div>
            )}

            <div style={{ display: "flex", gap: 4, padding: "10px 16px 14px" }}>
              <button onClick={() => toggleLike(post.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: likedPosts[post.id] ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${likedPosts[post.id] ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 10, padding: "7px 14px",
                color: likedPosts[post.id] ? "#8B5CF6" : "rgba(255,255,255,0.5)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                {likedPosts[post.id] ? "♥" : "♡"} {post.likes + (likedPosts[post.id] ? 1 : 0)}
              </button>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "7px 14px",
                color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                💬 {post.comments}
              </button>
              <button style={{
                marginLeft: "auto",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "7px 14px",
                color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer",
              }}>↗</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

function ExplorePage() {
  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ padding: "0 24px 20px" }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>Explore</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Ohio State · Columbus</div>
      </div>

      <div style={{
        margin: "0 24px 20px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10,
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>Search Ohio State...</span>
      </div>

      {/* Hero banner */}
      <div style={{
        margin: "0 24px 24px", borderRadius: 24, overflow: "hidden",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        height: 140, position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 1.5, marginBottom: 4 }}>FEATURED</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Explore Ohio State →</div>
        </div>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 30%, rgba(124,58,237,0.3) 0%, transparent 60%)" }} />
      </div>

      <div style={{ padding: "0 24px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Places Near You</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {VENUES.map((v, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `linear-gradient(135deg, ${["#7C3AED","#4F46E5","#0891B2","#059669","#D97706"][i]}30, #080810)`,
                border: `1px solid ${["#7C3AED","#4F46E5","#0891B2","#059669","#D97706"][i]}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>🍻</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{v.vibe} · {v.price} · {v.dist}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: v.crowd > 80 ? "#ef4444" : v.crowd > 60 ? "#f59e0b" : "#22c55e", fontWeight: 700 }}>
                  {v.crowd > 80 ? "🔴" : v.crowd > 60 ? "🟡" : "🟢"} {v.crowd}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 20px" }}>
        <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer" }}>☰</button>
      </div>

      <div style={{ padding: "0 24px 28px", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 22,
          background: "linear-gradient(135deg, #7C3AED, #1a1a2e)",
          border: "2px solid rgba(124,58,237,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, position: "relative", flexShrink: 0,
        }}>
          👤
          <div style={{
            position: "absolute", bottom: -6, right: -6,
            width: 26, height: 26, borderRadius: "50%",
            background: "#7C3AED", border: "2px solid #080810",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, cursor: "pointer",
          }}>📷</div>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Darius</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>@darius · Soph</div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>0</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Followers</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>2</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Following</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>0</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Friends</div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan your night */}
      <div style={{ margin: "0 24px 24px" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a0a3e, #0a0a20)",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: 22, padding: "20px",
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Plan Your Night</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>Discover and connect with nearby venues</div>
          <button style={{
            width: "100%", padding: "14px",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            border: "none", borderRadius: 14,
            color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
          }}>+ Create New Plans</button>
        </div>
      </div>

      {/* Content Management */}
      <div style={{ padding: "0 24px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Content Management</div>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18, overflow: "hidden",
        }}>
          {["Add New Post", "Manage Posts", "Analytics"].map((item, i) => (
            <div key={i} style={{
              padding: "16px 18px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{item}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icons
function LiveIcon({ active }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#8B5CF6" : "rgba(255,255,255,0.35)"} strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a13 13 0 0 0 0 17M20.5 3.5a13 13 0 0 1 0 17" /></svg>;
}
function SocialIcon({ active }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#8B5CF6" : "rgba(255,255,255,0.35)"} strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function PlusIcon({ isPost }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function ExploreIcon({ active }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#8B5CF6" : "rgba(255,255,255,0.35)"} strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
}
function ProfileIcon({ active }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#8B5CF6" : "rgba(255,255,255,0.35)"} strokeWidth="2.2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
