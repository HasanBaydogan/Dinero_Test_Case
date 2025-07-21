
import { SingleForm } from "../components/SingleForm";

//2 farklı layout yapısına gerek olmayabilir. 
//Önceki kullandığım projelerde bu şekilde kullandığım için rahat olduğum yapıda yazmayı tercih ettim.
//Tek bir layout ile gerçekleştirebilirim.

// Desktop and Tablet Layout
export const DesktopLayout = () => {
  return (
    <div className="hidden md:flex w-full h-[calc(100vh-64px)] justify-center items-center p-2 sm:p-3 md:p-4 lg:p-5">
      <div 
        className="w-full max-w-[1010px] min-h-[600px] md:min-h-[700px] lg:min-h-[744px] bg-[#F5F5FF] dark:bg-gray-900 rounded-[20px] md:rounded-[30px] lg:rounded-[40px] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col"
        style={{
          position: 'relative',
          top: '10px',
          left: '10px',
          opacity: 1,
          transform: 'rotate(0deg)',
          boxShadow: '0px 0px 30px 0px rgba(233,233,233,0.3), 0px 4px 30px 0px rgba(63,47,112,0.1)'
        }}
      >
        <SingleForm />
      </div>
    </div>
  );
};
