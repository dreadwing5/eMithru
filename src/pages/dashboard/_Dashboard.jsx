import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './dashboard.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='homeContainer'>
        <Sidebar />
      </div>
    </>
  );
}
