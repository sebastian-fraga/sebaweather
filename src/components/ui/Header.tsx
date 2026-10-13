import headerAnimation from "../../assets/animations/header-icon.json";

import { Lottie } from "lottie-react";

function Header() {
    return (
        <header className="flex items-start justify-start gap-2 px-4 pt-4 text-slate-50 sm:px-8 sm:pt-6 md:px-12 md:pt-8 lg:px-18">
            <div className="h-16 w-16 shrink-0 overflow-hidden sm:h-20 sm:w-20">
                <Lottie
                    src={headerAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                SEBAWEATHER
            </h1>
        </header>
    );
}

export default Header;
