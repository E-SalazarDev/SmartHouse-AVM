import house from '../../assets/house.jpg'
export default function Card({ }) {

    return (
        <>
            <div className="border-b-blue-600/95 bg-pink-500 p-10 rounded-2xl">

                <img src={house} alt="Descripción de mi imagen" />
                <div className='bg-green-500'>
                    <h1 className="text-3xl font-bold text-white text-center mt-3">
                        SmartHouse AVM
                    </h1>
                </div>
            </div>
        </>
    )
}