import { Link } from 'react-router-dom';
import Posts from '../data/Posts'; // or however you store them

export default function Blog() {
  return (
    <div className="page-container">
      <h1>All Posts</h1>
      <ul>
        {Posts.map(p => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
