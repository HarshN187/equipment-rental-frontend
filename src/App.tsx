import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/routes";
import { ToastContainer } from "react-toastify";
// import { useState } from "react";
// import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Register all Community features
// ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />} */}
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}

export default App;
