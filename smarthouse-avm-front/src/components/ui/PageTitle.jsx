export default function PageTitle({ title }) {

    return (
        <>
            <div className="bg-red-400 p-4 rounded-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {title}
                </h1>
            </div>
        </>)
}