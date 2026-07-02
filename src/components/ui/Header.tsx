import { useLottie } from "lottie-react";
import headerAnimation from "../../assets/animations/header-icon.json";

function Header() {
    const options = {
        animationData: headerAnimation,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options, {
        width: "100%",
        height: "100%",
    });

    return (
        <header className="flex items-start gap-2 justify-start px-4 sm:px-8 md:px-12 lg:px-18 pt-4 sm:pt-6 md:pt-8 text-slate-50">
            <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden shrink-0">
                {View}
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                SEBAWEATHER
            </h1>
        </header>
    );
}

export default Header;