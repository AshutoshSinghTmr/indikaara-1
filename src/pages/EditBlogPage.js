import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/blog.css';
import { getAdminPostById, updateBlogPost } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (token && id) {
      fetchPost();
    }
  }, [token, id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const post = await getAdminPostById(token, id);
      
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        tags: post.tags ? post.tags.join(', ') : '',
      });
      
      if (post.coverImage) {
        setImagePreview(post.coverImage);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.response?.data?.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      coverImage: url
    }));
    
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      coverImage: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
      };

      if (formData.excerpt.trim()) {
        postData.excerpt = formData.excerpt.trim();
      } else {
        postData.excerpt = '';
      }

      if (formData.coverImage.trim()) {
        postData.coverImage = formData.coverImage.trim();
      } else {
        postData.coverImage = '';
      }

      if (tagsArray.length > 0) {
        postData.tags = tagsArray;
      } else {
        postData.tags = [];
      }

      const updatedPost = await updateBlogPost(token, id, postData);
      navigate(`/blog/${updatedPost.slug}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setError(err.response?.data?.message || 'Failed to update blog post. Please try again.');
    } finally {
      setSaving(false);
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

  if (error && !formData.title) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Blog post not found
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">{error}</p>
          <Link
            to="/blog/admin"
            className="text-[var(--primary-color)] hover:underline"
          >
            ← Back to Admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Link to="/" className="text-[var(--primary-color)] hover:underline">Home</Link>
          <span>/</span>
          <Link to="/blog/admin" className="text-[var(--primary-color)] hover:underline">Admin</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium">Edit Post</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Edit Blog Post
        </h1>
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter an engaging title for your blog post"
            className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            placeholder="Write a brief summary of your blog post"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Enter tags separated by commas (e.g., pottery, ceramics, handmade)"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
          />
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleImageUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
          />
          {imagePreview && (
            <div className="mt-4 relative">
              <div className="rounded-lg overflow-hidden border-2 border-gray-600">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover"
                  onError={() => setImagePreview(null)}
                />
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={20}
            placeholder="Write your blog content here. You can use HTML tags for formatting."
            className={`w-full p-4 bg-[#2a2a2a] border rounded-lg text-[var(--text-primary)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors resize-y ${
              errors.content ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-400">{errors.content}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-8 border-t border-gray-700">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog/admin')}
            className="px-8 py-4 bg-[#2a2a2a] text-[var(--text-primary)] rounded-lg hover:bg-[#3a3a3a] transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditBlogPage;
