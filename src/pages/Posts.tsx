import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Placeholder interface for post data
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

// Placeholder post data - replace with actual API call or data source
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Deep Reading in the Digital Age',
    content: `
      <p>In an era where information flows faster than ever before, the art of deep reading becomes increasingly valuable. This comprehensive exploration delves into how we can maintain our capacity for sustained, thoughtful engagement with text in a world designed for quick consumption.</p>
      
      <h2>The Challenge of Digital Distraction</h2>
      <p>Our brains have adapted to the rapid-fire nature of digital content, making it increasingly difficult to engage in the slow, contemplative process that deep reading requires. Research shows that our attention spans have shortened, and our ability to focus on single tasks has diminished.</p>
      
      <h2>Strategies for Deep Reading</h2>
      <p>Despite these challenges, there are proven methods to cultivate deep reading habits:</p>
      <ul>
        <li>Creating dedicated reading spaces free from digital distractions</li>
        <li>Setting specific times for sustained reading sessions</li>
        <li>Practicing active reading techniques like annotation and summarization</li>
        <li>Choosing physical books over digital formats when possible</li>
      </ul>
      
      <h2>The Neurological Benefits</h2>
      <p>Deep reading doesn't just improve comprehension—it physically changes our brains. Studies have shown that sustained reading increases connectivity in brain regions associated with language processing, empathy, and complex thinking.</p>
      
      <p>As we move forward in this digital age, the ability to read deeply becomes not just a luxury, but a necessity for maintaining our humanity and intellectual capacity.</p>
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
      <p>Developing consistent reading habits requires more than just good intentions—it requires understanding the science behind habit formation and applying proven strategies to make reading a natural part of your daily routine.</p>
      
      <h2>The Habit Loop</h2>
      <p>Every habit consists of three components: a cue, a routine, and a reward. Understanding this loop is crucial for building sustainable reading habits.</p>
      
      <h2>Environmental Design</h2>
      <p>Your environment plays a crucial role in habit formation. By designing spaces that encourage reading and removing barriers to engagement, you can make reading the path of least resistance.</p>
      
      <p>This article explores practical, science-backed methods for building reading habits that stick, drawing from the latest research in behavioral psychology and neuroscience.</p>
    `,
    author: 'Michael Chen',
    date: '2025-06-10',
    tags: ['Habits', 'Psychology', 'Reading Tips', 'Productivity'],
    readTime: '12 min read',
    excerpt: 'A scientific approach to building reading habits that actually stick, based on behavioral psychology research.'
  }
];

export default function Posts() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call - replace with actual data fetching
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundPost = SAMPLE_POSTS.find(p => p.id === id);
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

// Add these styles to your global CSS or create a separate Posts.css file
const styles = `
.posts-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  padding-top: 120px;
  padding-bottom: 2rem;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: #e0e0e0;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 255, 76, 0.3);
  border-top: 3px solid #00ff4c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  color: #e0e0e0;
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 255, 76, 0.2);
}

.back-link {
  color: #00ff4c;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.back-link:hover {
  transform: translateX(-5px);
  text-shadow: 0 0 10px rgba(0, 255, 76, 0.5);
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 1rem;
}

.post-title {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #00ff4c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.post-author {
  font-size: 1.1rem;
  color: #b0b0b0;
  margin-bottom: 1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(0, 255, 76, 0.1);
  color: #00ff4c;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 76, 0.3);
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.post-content h2 {
  color: #ffffff;
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content p {
  margin-bottom: 1.5rem;
}

.post-content ul {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.post-content li {
  margin-bottom: 0.5rem;
}

.post-footer {
  border-top: 1px solid rgba(0, 255, 76, 0.2);
  padding-top: 2rem;
}

.nav-button, .back-to-blog-btn {
  background: rgba(0, 255, 76, 0.1);
  color: #00ff4c;
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(0, 255, 76, 0.3);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.nav-button:hover, .back-to-blog-btn:hover {
  background: rgba(0, 255, 76, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 255, 76, 0.2);
}

@media (max-width: 768px) {
  .post-article {
    padding: 0 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-content {
    font-size: 1rem;
  }
}
`;

// You can add this style tag to the document head or include it in your CSS
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}