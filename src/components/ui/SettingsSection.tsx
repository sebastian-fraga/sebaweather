interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <div className="w-full max-w-120">
            <p className="mb-2 px-1 text-sm font-medium text-white/80">{title}</p>
            <div className="bg-linear-150 from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl px-4 py-6">
                {children}
            </div>
        </div>
    );
}