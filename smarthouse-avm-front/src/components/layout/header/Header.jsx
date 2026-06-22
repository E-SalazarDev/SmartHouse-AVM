import Nav from "./Nav";
import HeaderAuthButton from "./HeaderAuthButton";

export default function Header() {
    return (
        <header className="w-full h-16 md:h-20 bg-black flex items-center justify-between p-4 md:p-5 rounded-xl relative overflow-hidden z-50">
            <div className="flex items-center text-white font-bold text-lg md:text-xl md:w-1/4 min-w-max">
                <span>SmartHouse AVM</span>
            </div>

            <Nav />

            <HeaderAuthButton />
        </header>
    );
}