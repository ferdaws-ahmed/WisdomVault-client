
import { Outlet } from 'react-router';
import Footer from '../Components/common/Footer';
import Navbar from '../Components/common/Navbar';

const MainLayout = () => {
    return (
        <div className=' min-h-screen flex flex-col'>
            <section className='w-full sm:w-10/12 mx-auto'>
                 <Navbar></Navbar>
            </section>
            <main className='w-full sm:w-10/12 mx-auto flex-grow '>
               <Outlet />
            </main>
            <section className='w-full sm:w-10/12 mx-auto'>
                <Footer></Footer>
            </section>
        </div>
    );
};

export default MainLayout;
