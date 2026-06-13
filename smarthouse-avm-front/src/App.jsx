import house from './assets/house.jpg'

function App() {
  return (

    <main className="min-h-screen bg-amber-500 flex items-center justify-center">
      
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl mr-7">
        <h1 className="text-3xl font-bold text-white">
          SmartHouse AVM
        </h1>

        <p className="mt-2 text-slate-400">
          Sistema de predicción de precios de viviendas
        </p>

      
      </div>

      <div className="border-b-blue-600/95 bg-pink-500 p-10 rounded-2xl">

        <img src={house} alt="Descripción de mi imagen" />
       <div className='bg-green-500'>
         <h1 className="text-3xl font-bold text-white text-center mt-3">
          SmartHouse AVM
        </h1>
       </div>
      </div>
    </main>
  )
}

export default App