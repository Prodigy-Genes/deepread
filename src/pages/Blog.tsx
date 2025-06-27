import { Link } from 'react-router-dom';

const posts = [
  { title: 'The Future of Deep Reading…', id: '1' },
  { title: 'Building Better Reading Habits…', id: '2' }
];

export default function Blog() {
  return (
    <div className="page-container">
      <h1>All Posts</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
