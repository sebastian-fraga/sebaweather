import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type TemperatureGaugeProps = {
    current: number;
    min: number;
    max: number;
    secondaryText?: string;
};

const TEMP_SCALE_MIN = 0;
const TEMP_SCALE_MAX = 40;

function tempToColor(temp: number) {
    const t = Math.min(1, Math.max(0,
        (temp - TEMP_SCALE_MIN) / (TEMP_SCALE_MAX - TEMP_SCALE_MIN)
    ));

    const stops = [
        { pos: 0, color: { r: 0, g: 0, b: 255 } }, 
        { pos: 0.33, color: { r: 156, g: 194, b: 255 } },
        { pos: 0.66, color: { r: 255, g: 162, b: 156 } }, 
        { pos: 1, color: { r: 255, g: 69, b: 56 } }, 
    ];

    let i = 0;
    while (i < stops.length - 2 && t > stops[i + 1].pos) i++;

    const a = stops[i];
    const b = stops[i + 1];
    const localT = (t - a.pos) / (b.pos - a.pos);

    const r = Math.round(a.color.r + (b.color.r - a.color.r) * localT);
    const g = Math.round(a.color.g + (b.color.g - a.color.g) * localT);
    const bChan = Math.round(a.color.b + (b.color.b - a.color.b) * localT);

    return `rgb(${r}, ${g}, ${bChan})`;
}

export default function TemperatureGauge({
    current,
    min,
    max,
    secondaryText,
}: TemperatureGaugeProps) {
    const percentage = max === min
        ? 0
        : Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));

    const startAngle = 135;
    const totalArcDegrees = 270;
    const angle = startAngle + (percentage / 100) * totalArcDegrees;
    const angleRad = (angle * Math.PI) / 180;

    const radius = 47;
    const cx = 50 + radius * Math.cos(angleRad);
    const cy = 50 + radius * Math.sin(angleRad);

    const colorAtMin = tempToColor(min);
    const colorAtMax = tempToColor(max);
    const colorAtCurrent = tempToColor(current);

    return (
        <div className="relative w-64 h-64">
            <svg style={{ height: 0, width: 0, position: "absolute" }}>
                <defs>
                    <linearGradient
                        id="gaugeGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0" y1="50"
                        x2="100" y2="50"
                        gradientTransform="rotate(90 50 50)"
                    >
                        <stop offset="0%" stopColor={colorAtMin} />
                        <stop offset="100%" stopColor={colorAtMax} />
                    </linearGradient>
                </defs>
            </svg>

            <CircularProgressbar
                value={percentage}
                strokeWidth={7}
                circleRatio={0.75}
                styles={buildStyles({
                    rotation: 0.625,
                    strokeLinecap: "round",
                    pathColor: "url(#gaugeGradient)",
                    trailColor: "#3F3F3F22",
                })}
            />

            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
            >
                <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={colorAtCurrent}
                    stroke="#ffffff"
                    strokeWidth={1.5}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-3">
                <span className="text-5xl font-bold text-white">{current}°C</span>
                {secondaryText && (
                    <span className="text-lg text-white/70">{secondaryText}</span>
                )}
            </div>

            <span className="absolute bottom-0 left-10 text-xl text-white">{min}°</span>
            <span className="absolute bottom-0 right-10 text-xl text-white">{max}°</span>
        </div>
    );
}