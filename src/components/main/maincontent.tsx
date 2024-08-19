import Album from '../albums/album';
import Artlist from '../artlist';
import Footer from '../footer';
import NavBar from '../navbar/navbar';
import RecentlyPlayed from '../recently-played';
import Recommended from '../recommend';

const MainContent = () => {
  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden w-auto ">
      <NavBar />
      <div className="flex flex-col justify-between space-x-3 gap-4">
        <RecentlyPlayed />
        <Artlist />
        <Album />
        <Recommended />
        <Footer />
      </div>
    </div>
  );
};
export default MainContent;
