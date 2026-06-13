import Header from "./components/header";

function App() {
  return (

    <main className="min-h-screen bg-amber-500 flex flex-col items-center p-5 gap-6">
        
      <Header/>


       <div className="w-full h-96 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white">
            Home
          </h1>
         
       </div>
       
    </main>
  )
}

export default App;