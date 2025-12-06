
import Navbar from '../Components/common/Navbar';

const MainLayout = ({children}) => {
    return (
        <div>
            <section className='w-full sm:w-10/12 mx-auto'>
                 <Navbar></Navbar>
            </section>
            <main>
               {children}
            </main>
        </div>
    );
};

export default MainLayout;
