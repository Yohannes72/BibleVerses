import Feed from "@component/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Bible Verses</span>
    </h1>
    <p className='desc text-center'>
      BibleVerseHub is an open-source tool for discovering, creating, and sharing meaningful Bible verses from the Scriptures.
    </p>

    <Feed />
  </section>
);

export default Home;
