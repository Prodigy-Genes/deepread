import { Link } from 'react-router-dom';
import '../styles/Home.css';

const posts = [
  { title: 'The Future of Deep Reading…', id: '1' },
  { title: 'Building Better Reading Habits…', id: '2' }
];

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Deepread</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/posts/${post.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
