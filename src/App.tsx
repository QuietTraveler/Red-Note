import React from 'react';
import { Navbar } from './components/Navbar';
import { Post } from './components/Post';
import { BottomNav } from './components/BottomNav';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { PostProvider, usePost } from './context/PostContext';

function MainContent() {
  const { posts, selectedPost, setSelectedPost } = usePost();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 pt-20">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </main>
      <BottomNav />
      <PostDetailModal 
        post={selectedPost!}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}

function App() {
  return (
    <PostProvider>
      <MainContent />
    </PostProvider>
  );
}

export default App;