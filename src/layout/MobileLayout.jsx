
import { SingleForm } from "../components/SingleForm";

export const MobileLayout = () => {
  return (
    <div className="lg:hidden w-full min-h-[calc(100vh-64px)]">
      <SingleForm />
    </div>
  );
};
