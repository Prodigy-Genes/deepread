import { Link } from 'react-router-dom';
import '../styles/Home.css';

const posts = [
  { title: 'My First Post', slug: 'my-first-post' }
];

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Deepread</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <Link to={`/post/${post.slug}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
