
import { SingleForm } from "../components/SingleForm";

// Desktop
export const DesktopLayout = () => {
  return (
    <div className="hidden lg:flex w-full h-[calc(100vh-64px)] justify-center items-center p-5">
      <div 
        className="w-[1010px] min-h-[744px] bg-[#F5F5FF] dark:bg-gray-900 rounded-[40px] p-10 flex flex-col"
        style={{
          position: 'relative',
          top: '20px',
          left: '20px',
          opacity: 1,
          transform: 'rotate(0deg)',
          boxShadow: '0px 0px 50px 0px rgba(233,233,233,0.4), 0px 8px 50px 0px rgba(63,47,112,0.15)'
        }}
      >
        <SingleForm />
      </div>
    </div>
  );
};
