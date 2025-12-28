import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/blog.css";
import BlogImage from "../assets/blogs/blog-1.png";

/**
 * BlogDetailPage Component - Individual blog post view
 * Features: Full blog content, author info, comments, related posts
 * Ready for API integration and authentication
 */
const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo - Will be updated when auth is integrated
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog data - Replace with API call later
  const mockBlog = {
    id: parseInt(id),
    title: "Understanding Indian Handcrafted Rugs: A Buyer’s Guide",
    content: `
      <div class="prose prose-invert w-full">
        <p>In today’s design-led homes, luxury is no longer loud. It is thoughtful, layered, and deeply personal. Among the elements that define such spaces, an Indian handcrafted rug holds a special place—not as an accessory, but as a foundation.
At Indikara, we believe a rug should do more than complete a room. It should set the mood, soften the architecture, and bring quiet character to everyday living. This guide is designed for discerning buyers who appreciate craftsmanship, design integrity, and the subtle elegance of handcrafted luxury.
</p>
        
        <h2>Why Indian Handcrafted Rugs Continue to Define Global Interiors?</h2>
        <p>Indian rugs have long held a respected position in the world of interiors—not just for their beauty, but for their versatility. From heritage homes to contemporary apartments, they adapt effortlessly, bridging tradition and modern design.
        What makes them enduring is not trend alone, but depth. Each rug is shaped by centuries of weaving knowledge, refined through evolving aesthetics, and brought to life by skilled hands. In a world increasingly driven by fast décor, handcrafted rugs remain intentional—measured, meaningful, and timeless.
   </p>
        <h2>Handcrafted vs. Machine-Made: The Difference Luxury Buyers Notice</h2>
        <p>At first glance, many rugs may appear visually similar. Over time, however, the distinction becomes clear.
    Handcrafted rugs are created knot by knot or weave by weave, guided by the artisan’s eye and experience. Slight variations in pattern, texture, or tone are natural—and highly valued. These nuances add warmth and individuality, allowing the rug to evolve gracefully with age.
    Machine-made rugs, while uniform and convenient, are designed for replication rather than longevity. Their appeal often lies in consistency, but they lack the depth, tactile richness, and soul that define true craftsmanship.
    For high-end interiors, luxury lies not in perfection, but in authenticity.
   </p>
    <h2>Handcrafted vs. Machine-Made: The Difference Luxury Buyers Notice</h2>
     <p>The materials used in a rug shape both its aesthetic and its performance.</p>
        
        <ul>
          <li><strong>Wool</strong></li>
          <p>Naturally resilient and luxuriously soft, wool remains the most celebrated material for handcrafted rugs. It offers excellent durability, holds colour beautifully, and provides warmth underfoot—making it ideal for living rooms, bedrooms, and gathering spaces.</p>
          <li><strong>Cotton</strong></li>
          <p>Lightweight and breathable, cotton is often used in flat-weave rugs or as a foundation. It brings a relaxed sophistication, perfect for layered interiors and modern homes.</p>
          <li><strong>Silk</strong></li>
          <p>Silk rugs are statement pieces. Known for their subtle sheen and fine detailing, they elevate formal spaces and curated corners. While delicate, silk rewards careful placement with unmatched refinement.
Many contemporary rugs blend materials thoughtfully, balancing comfort, durability, and visual elegance.
</p>        </ul>
        
        <h2>Weaving Techniques That Shape Style</h2>
        <p>Understanding how a rug is made enhances how it is appreciated.</p>
        <ul>
          <li><strong>Hand-Knotted Rugs</strong></li>
          <p>The most intricate and time-intensive technique. Each knot is tied individually, resulting in exceptional durability and detailed designs. These rugs often become heirloom pieces.</p>
          <li><strong>Hand-Tufted Rugs</strong></li>
          <p>Created using a tufting tool guided by skilled artisans, tufted rugs allow for modern designs and expressive patterns while maintaining a handcrafted essence.</p>
          <li><strong>Flat-Weave Rugs (Dhurries & Kilims)</strong></li>
          <p>Minimal, versatile, and lightweight, flat-weave rugs work beautifully in contemporary settings. They are ideal for warmer climates, casual luxury spaces, and layered styling.
Each technique offers a different design language—there is no hierarchy, only what suits your lifestyle.</p>
        </ul>

        <h2>Design Trends: Where Heritage Meets Modern Living</h2>
        <p>Indian handcrafted rugs today are as much about design as they are about tradition.</p>

        <ul>
        <li><strong>Muted neutrals and warm earth tones</strong> are increasingly favoured for creating calm, expansive interiors.</li>
        <li><strong>Abstract and organic patterns</strong> reinterpret traditional motifs, offering a modern edge without losing depth.</li>
        <li><strong>Soft contrasts and tonal layering</strong> allow rugs to blend seamlessly into minimalist spaces.</li>
        <li><strong>Subtle texture over heavy ornamentation</strong> reflects a shift toward understated luxury.</li>
        </ul>
        <p>At Indikara, design is about balance—honouring heritage while responding to contemporary living.</p>


        <h2>Choosing the Right Rug for Your Space</h2>
<p>A well-chosen rug transforms a room. Consider these essentials before selecting:<p>

<ul>
<li><strong>Size:</strong></li>
<p>Luxury interiors favor proportion. A rug should anchor furniture rather than sit beneath it. Larger rugs often create a more cohesive and expansive feel.</p>
<h4>Placement</h4>
<ul>
<li>•	Living rooms benefit from grounded, substantial rugs that bring the space together.</li>
<li>•	Bedrooms call for softness and comfort underfoot.</li>
<li>•	Dining areas require durable materials that maintain elegance despite frequent use.</li>
</ul>

<li><strong>Color Palette:</strong></li>
<p>Neutral rugs offer timeless sophistication, while deeper tones or subtle patterns add character without overwhelming the room.
Think of your rug as the canvas on which the rest of the space unfolds.</p>
</ul>

<h2>Authenticity and Responsible Craft</h2>
<em>True luxury today is conscious.</em>
<p>A genuine handcrafted rug represents hours of skilled labour and generations of knowledge. Choosing responsibly means valuing transparency—about materials, craftsmanship, and ethical practices.
By supporting authentic handmade rugs, you help sustain traditional skills while investing in pieces that carry meaning beyond aesthetics.</p>

<h2>Caring for Your Handcrafted Rug</h2>
<p>With simple care, a handcrafted rug can last for decades:</p>
<ul>
<li>•	Vacuum gently and regularly</li>
<li>• Rotate periodically to ensure even wear</li>
<li>•	Blot spills immediately—avoid rubbing</li>
<li>•	Opt for professional cleaning when required</li>
</ul>

<h2>A Thoughtful Addition to Modern Luxury Living</h2>
<p>An Indian handcrafted rug is not defined by trends alone. It is defined by intention—by the choice to invest in craftsmanship, culture, and enduring design.</p>

<h5>At Indikara, we see rugs as more than décor. They are quiet statements of taste, grounding modern spaces while carrying stories woven by hand.</h5>

<h5>Chosen with care, a rug does more than complete a room.
It becomes part of how you live.</h5>
          </div>
    `,
    author: {
      name: "Shradha Sharma",
      avatar: "../assets/blogs/blog-1.png",
      bio: "Shradha Sharma is a design enthusiast and a staunch advocate for slow, intentional living. With a background in textile heritage and interior styling, she explores the intersection of traditional Indian craft and modern minimalist design. Through her writing at Indikaara, she aims to help homeowners build spaces that tell a story of authenticity and enduring elegance..",
      socialLinks: {
        instagram: "https://www.instagram.com/shradha_sharma",
        website: "https://shradhasharma.com",
      },
    },
    category: "Crafts",
    tags: [
      "Handcrafted Rugs",
      "Indian Carpets",
      "Luxury Interiors",
      "Wool Rugs",
      "Silk Carpets",
      "Dhurries",
      "Rug Buying Guide",
      "Investment Pieces",
      "Home Styling Tips",
      "Artisn Decor",
      "Indikaara Living",
      "Sustainable Luxury",
    ],
    publishedAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-08-17T10:00:00Z",
    readTime: 5,
    image: BlogImage,
    likes: 121,
    commentsCount: 2,
    featured: true,
    metaDescription:
      "Discover the ancient techniques and modern innovations in pottery making that bring beautiful ceramic pieces to life.",
  };

  const mockComments = [
    {
      id: 1,
      author: {
        name: "Ananya V.",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "Informative and aesthetically pleasing! The section on sizing was a real eye-opener—I think I’ve been buying rugs that are too small for my furniture all along. 😅",
      publishedAt: "2025-09-10T09:30:00Z",
      likes: 3,
      replies: [],
    },
    {
      id: 3,
      author: {
        name: "Rohan Parashar",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "Finally, a guide that focuses on 'muted neutrals.' Finding quality Indian rugs that aren't overly 'traditional' or loud in color can be a challenge. Love the focus on organic patterns. Looking forward to seeing your latest collection!",
      publishedAt: "2025-10-27T11:15:00Z",
      likes: 8,
      replies: [],
    },
  ];

  // Simulate API calls
  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchBlog(id);
    // fetchComments(id);
    // fetchRelatedBlogs(id);

    const timer = setTimeout(() => {
      setBlog(mockBlog);
      setComments(mockComments);
      setRelatedBlogs([]); // Will be populated later
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // TODO: Implement actual API calls
  const fetchBlog = async (blogId) => {
    try {
      setLoading(true);
      // const response = await fetch(`/api/blogs/${blogId}`);
      // const data = await response.json();
      // setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      // TODO: Show login prompt
      alert("Please sign in to like posts");
      return;
    }

    // TODO: Implement like API call
    setIsLiked(!isLiked);
    setBlog((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) return;

    // TODO: Implement comment API call
    const comment = {
      id: Date.now(),
      author: {
        name: "Current User", // Will come from auth context
        avatar: "/api/placeholder/40/40",
      },
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Blog post not found
          </h1>
          <Link
            to="/blog"
            className="text-[var(--primary-color)] hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
      {/* Breadcrumb and Actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <nav aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link
              to="/"
              className="text-[var(--primary-color)] hover:underline"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/blog"
              className="text-[var(--primary-color)] hover:underline"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium truncate max-w-xs">
              {blog.title}
            </span>
          </div>
        </nav>

        {/* Write Your Own Button */}
        {isAuthenticated && (
          <Link
            to="/blog/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Write Your Own
          </Link>
        )}
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[var(--primary-color)] text-white rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 bg-gray-600 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url("${blog.author.avatar}")` }}
              role="img"
              aria-label={blog.author.name}
            />
            <div>
              <p className="text-[var(--text-primary)] font-semibold">
                {blog.author.name}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>•</span>
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Engagement Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-[#2a2a2a] text-[var(--text-secondary)] hover:bg-[#3a3a3a]"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{blog.likes}</span>
            </button>

            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{blog.commentsCount}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <div
            className="w-full h-96 bg-gray-700 bg-cover bg-center"
            style={{ backgroundImage: `url("${blog.image}")` }}
            role="img"
            aria-label={blog.title}
          />
        </div>
      </header>

      {/* Article Content */}
      <article className="mb-12">
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-700">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 text-sm bg-[#2a2a2a] text-[var(--text-secondary)] rounded-full hover:bg-[#3a3a3a] transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Author Bio */}
      <section className="mb-12 p-6 bg-[#2a2a2a] rounded-xl border border-gray-700">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url("${blog.author.avatar}")` }}
            role="img"
            aria-label={blog.author.name}
          />
          {/* Added min-w-0 to prevent the flex-item from overflowing */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              About {blog.author.name}
            </h3>
            {/* Added break-words here to handle long strings/bio text */}
            <p className="text-[var(--text-secondary)] mb-4 break-words">
              {blog.author.bio}
            </p>
            {blog.author.socialLinks && (
              <div className="flex flex-wrap gap-4">
                {" "}
                {/* Added flex-wrap for long links */}
                {blog.author.socialLinks.instagram && (
                  <span className="text-[var(--primary-color)] text-sm break-all">
                    📷 {blog.author.socialLinks.instagram}
                  </span>
                )}
                {blog.author.socialLinks.website && (
                  <span className="text-[var(--primary-color)] text-sm break-all">
                    🌐 {blog.author.socialLinks.website}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                isAuthenticated
                  ? "Share your thoughts..."
                  : "Please sign in to comment"
              }
              disabled={!isAuthenticated}
              rows={4}
              className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={!isAuthenticated || !newComment.trim()}
            className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticated ? "Post Comment" : "Sign in to Comment"}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url("${comment.author.avatar}")` }}
                  role="img"
                  aria-label={comment.author.name}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {comment.author.name}
                    </span>
                    {comment.author.isAuthor && (
                      <span className="px-2 py-1 text-xs bg-[var(--primary-color)] text-white rounded-full">
                        Author
                      </span>
                    )}
                    <span className="text-sm text-[var(--text-secondary)]">
                      {formatTimeAgo(comment.publishedAt)}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-3">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {comment.likes}
                    </button>
                    <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                      Reply
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-600 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 bg-gray-600 rounded-full bg-cover bg-center flex-shrink-0"
                            style={{
                              backgroundImage: `url("${reply.author.avatar}")`,
                            }}
                            role="img"
                            aria-label={reply.author.name}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[var(--text-primary)] text-sm">
                                {reply.author.name}
                              </span>
                              {reply.author.isAuthor && (
                                <span className="px-1 py-0.5 text-xs bg-[var(--primary-color)] text-white rounded-full">
                                  Author
                                </span>
                              )}
                              <span className="text-xs text-[var(--text-secondary)]">
                                {formatTimeAgo(reply.publishedAt)}
                              </span>
                            </div>
                            <p className="text-[var(--text-secondary)] text-sm">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Blog Link */}
      <div className="text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </main>
  );
};

export default BlogDetailPage;
