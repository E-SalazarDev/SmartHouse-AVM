import Header from "./components/header";
import img from "../src/assets/house.jpg"

import { createBrowserRouter } from "react-router-dom";

createBrowserRouter([
  { path: '' },
]);

function App() {
  return (
    <main className="min-h-screen bg-amber-500 flex flex-col items-center p-4 md:p-5 gap-6 pb-24 md:pb-5">
      <Header />

      <div className="w-full min-h-96 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:p-6 shadow-xl flex flex-col gap-4">


        <div className="bg-red-400 p-4 rounded-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Home
          </h1>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">


          <div className="md:col-span-2 flex flex-col gap-4 flex-1">


            <div className="bg-purple-600 text-white p-6 rounded-xl flex-1 flex items-center justify-between">
              <span>cards</span>
            </div>


            <div className="bg-purple-600 text-white p-6 rounded-xl flex-1 flex items-center justify-between">
              <span>contenido</span>
            </div>

          </div>


          <div className="bg-green-200 text-slate-800 rounded-xl md:col-span-1 min-h-64 md:min-h-0 flex items-center justify-center font-bold overflow-hidden relative">
            <img src={img} className="w-full h-full object-cover absolute inset-0" />
          </div>

        </div>

      </div>

    </main>
  );
}

export default App;