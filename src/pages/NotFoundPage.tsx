import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function NotFoundPage() {
    const { t } = useTranslation()
    return (
        <main className="
                min-h-[90vh]
                flex flex-col items-center justify-center text-center
                gap-10 sm:gap-14 lg:gap-20
                px-6
            ">

            <img
                src="/assets/images/not-found-hero.webp"
                alt=""
                aria-hidden="true"
                className="
                        w-45 sm:w-60 md:w-77.5 lg:w-85
                    "
            />

            <div className="flex flex-col items-center gap-4 sm:gap-6">
                <h1 className="
                        font-medium text-white
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider
                    ">
                    {t('notFound.title')}
                </h1>

                <p className="
                        font-extralight text-gray-300
                        text-base sm:text-lg md:text-xl
                        max-w-xs sm:max-w-md md:max-w-lg
                        leading-relaxed
                    ">
                    {t('notFound.description')}
                </p>
            </div>

            <Link
                to="/locations"
                className="bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-2xl transition-all active:scale-95 hover:brightness-110 px-10 py-3 sm:px-16 sm:py-4 md:px-24 md:py-5 text-base sm:text-lg md:text-xl"
            >
                {t('notFound.button')}
            </Link>

        </main>
    );
}

export default NotFoundPage;