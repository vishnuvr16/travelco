import './App.css';
import {Outlet} from "react-router-dom";
import PageLayout from './components/PageLayout';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className='bg-gray-300'>
        <Header />
        <PageLayout>
          <Outlet />
        </PageLayout>
      </div>
    </>
  );
}

export default App;
