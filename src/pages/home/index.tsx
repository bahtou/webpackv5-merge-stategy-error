import { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [like, setLike] = useState<boolean>(false);

  return (
    <main>
      <nav>
        <Link to="/about">About</Link>
      </nav>

      {like
        ? 'thanks for the upvote!'
        : <button type="button" onClick={() => setLike(true)}>
            Up Vote!
          </button>
      }
    </main>
  );
}


export default Home;
