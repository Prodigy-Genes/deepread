import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Posts.css';
// Post interface
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
  excerpt: string;
}

// Function to parse markdown-like content to HTML
const parseMarkdownToHtml = (content: string): string => {
  return content
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^-\s(.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
};

// Function to load posts from markdown files
const loadPostsFromMarkdown = async (): Promise<Post[]> => {
  // This would typically load from your markdown files
  // For now, we'll use the sample data, but you can replace this with actual file loading
  const SAMPLE_POSTS: Post[] = [
    {
      id: '1',
      title: 'The Future of Deep Reading in the Digital Age',
      content: `
        In an era where information flows faster than ever before, the art of deep reading becomes increasingly valuable. This comprehensive exploration delves into how we can maintain our capacity for sustained, thoughtful engagement with text in a world designed for quick consumption.
        
        ## The Challenge of Digital Distraction
        
        Our brains have adapted to the rapid-fire nature of digital content, making it increasingly difficult to engage in the slow, contemplative process that deep reading requires. Research shows that our attention spans have shortened, and our ability to focus on single tasks has diminished.
        
        ## Strategies for Deep Reading
        
        Despite these challenges, there are proven methods to cultivate deep reading habits:
        
        - Creating dedicated reading spaces free from digital distractions
        - Setting specific times for sustained reading sessions
        - Practicing active reading techniques like annotation and summarization
        - Choosing physical books over digital formats when possible
        
        ## The Neurological Benefits
        
        Deep reading doesn't just improve comprehension—it physically changes our brains. Studies have shown that sustained reading increases connectivity in brain regions associated with language processing, empathy, and complex thinking.
        
        As we move forward in this digital age, the ability to read deeply becomes not just a luxury, but a necessity for maintaining our humanity and intellectual capacity.
      `,
      author: 'Dr. Sarah Mitchell',
      date: '2025-06-15',
      tags: ['Deep Reading', 'Digital Age', 'Neuroscience', 'Education'],
      readTime: '8 min read',
      excerpt: 'Exploring how to maintain deep reading skills in our fast-paced digital world and why it matters more than ever.'
    },
    {
      id: '2',
      title: 'Building Better Reading Habits: A Scientific Approach',
      content: `
        Developing consistent reading habits requires more than just good intentions—it requires understanding the science behind habit formation and applying proven strategies to make reading a natural part of your daily routine.
        
        ## The Habit Loop
        
        Every habit consists of three components: a cue, a routine, and a reward. Understanding this loop is crucial for building sustainable reading habits.
        
        ## Environmental Design
        
        Your environment plays a crucial role in habit formation. By designing spaces that encourage reading and removing barriers to engagement, you can make reading the path of least resistance.
        
        This article explores practical, science-backed methods for building reading habits that stick, drawing from the latest research in behavioral psychology and neuroscience.
      `,
      author: 'Michael Chen',
      date: '2025-06-10',
      tags: ['Habits', 'Psychology', 'Reading Tips', 'Productivity'],
      readTime: '12 min read',
      excerpt: 'A scientific approach to building reading habits that actually stick, based on behavioral psychology research.'
    }
  ];

  // Parse markdown content to HTML
  return SAMPLE_POSTS.map(post => ({
    ...post,
    content: parseMarkdownToHtml(post.content)
  }));
};

export default function Posts() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const posts = await loadPostsFromMarkdown();
        const foundPost = posts.find(p => p.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setError('No post ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="error-state">
          <h1>Oops! Something went wrong</h1>
          <p>{error}</p>
          <Link to="/blog" className="back-to-blog-btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="posts-container">
        <div className="error-state">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-to-blog-btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <article className="post-article">
        <header className="post-header">
          <Link to="/blog" className="back-link">
            ← Back to Blog
          </Link>
          
          <div className="post-meta">
            <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span className="post-read-time">{post.readTime}</span>
          </div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-author">
            <span>By {post.author}</span>
          </div>
          
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <footer className="post-footer">
          <div className="post-navigation">
            <Link to="/blog" className="nav-button">
              ← More Articles
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}