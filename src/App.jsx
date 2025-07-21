import "./App.css";
import { FormProvider } from "./state/FormContext";
import { MobileLayout } from "./layout/MobileLayout";
import { DesktopLayout } from "./layout/DesktopLayout";
import { Header } from "./components/Header";

import useIsMobile from "./useIsMobile";

function App() {
  const isMobile = useIsMobile();
  return (
    <FormProvider>
      <div className="app">
        <Header />
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </FormProvider>
  );
}

export default App;
