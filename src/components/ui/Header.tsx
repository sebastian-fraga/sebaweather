function Header() {
    return (
        <header className="flex items-center justify-start gap-3 sm:gap-4 md:gap-5 px-4 sm:px-8 md:px-12 lg:px-18 pt-6 sm:pt-10 md:pt-14 text-slate-50">
            <img src="/assets/images/header-icon.webp" alt="Icono de SebaWeather" className="w-10" />
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                SEBAWEATHER
            </h1>
        </header>
    );
}

export default Header;
