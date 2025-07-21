
import { SingleForm } from "../components/SingleForm";

// Mobile Layout
export const MobileLayout = () => {
  return (
    <div className="md:hidden w-full min-h-[calc(100vh-64px)] bg-[#F5F5FF] dark:bg-gray-900 p-3 sm:p-4">
      <div className="w-full h-full flex flex-col">
        <SingleForm />
      </div>
    </div>
  );
};
