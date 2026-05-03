import { useId } from 'react'

function Cloud({ cx = 32, cy = 36, color = '#94A3B8', bright = '#CBD5E1' }) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx="19" ry="8" fill={color} />
      <circle cx={cx - 12} cy={cy - 7} r="10" fill={color} />
      <circle cx={cx + 1} cy={cy - 14} r="13" fill={bright} />
      <circle cx={cx + 14} cy={cy - 7} r="10" fill={color} />
    </>
  )
}

function Drops({ startY = 41, count = 4, color = '#60A5FA' }) {
  return (
    <>
      {[14, 23, 32, 41].slice(0, count).map((x, i) => (
        <g key={i} style={{ animation: `rain-fall 1.3s ease-in ${(i * 0.22).toFixed(2)}s infinite` }}>
          <line x1={x} y1={startY} x2={x - 2} y2={startY + 10}
            stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </>
  )
}

function SunIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="21" fill="#FCD34D"
        style={{ transformOrigin: '32px 32px', animation: 'sun-glow 2.5s ease-in-out infinite' }} />
      <g style={{ transformOrigin: '32px 32px', animation: 'sun-spin 10s linear infinite' }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="32" y1="7" x2="32" y2="16"
            stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"
            transform={`rotate(${a} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="12" fill="#FBBF24" />
    </svg>
  )
}

function MoonIcon({ size }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={`moon-${uid}`}>
          <rect width="64" height="64" fill="white" />
          <circle cx="40" cy="27" r="16" fill="black" />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="21" fill="#C7D2FE"
        style={{ animation: 'moon-glow 3s ease-in-out infinite' }} />
      <circle cx="32" cy="32" r="18" fill="#E2E8F0" mask={`url(#moon-${uid})`} />
      <circle cx="55" cy="12" r="1.8" fill="white" opacity="0.9" />
      <circle cx="50" cy="7" r="1.2" fill="white" opacity="0.7" />
      <circle cx="58" cy="22" r="1" fill="white" opacity="0.6" />
    </svg>
  )
}

function SunCloudIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="44" cy="14" r="13" fill="#FCD34D" opacity="0.25" />
      <g style={{ transformOrigin: '44px 14px', animation: 'sun-spin 12s linear infinite' }}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="44" y1="2" x2="44" y2="9"
            stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"
            transform={`rotate(${a} 44 14)`} />
        ))}
      </g>
      <circle cx="44" cy="14" r="9" fill="#FBBF24" />
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={38} />
      </g>
    </svg>
  )
}

function MoonCloudIcon({ size }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={`mc-${uid}`}>
          <rect width="64" height="64" fill="white" />
          <circle cx="28" cy="12" r="13" fill="black" />
        </mask>
      </defs>
      <circle cx="20" cy="18" r="14" fill="#E2E8F0" mask={`url(#mc-${uid})`} />
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={38} />
      </g>
    </svg>
  )
}

function CloudIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={36} />
      </g>
    </svg>
  )
}

function DarkCloudIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={36} color="#64748B" bright="#475569" />
      </g>
    </svg>
  )
}

function RainIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={30} color="#64748B" bright="#94A3B8" />
      </g>
      <Drops startY={41} count={4} />
    </svg>
  )
}

function RainSunIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="46" cy="12" r="11" fill="#FCD34D" opacity="0.25" />
      <g style={{ transformOrigin: '46px 12px', animation: 'sun-spin 12s linear infinite' }}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="46" y1="1" x2="46" y2="8"
            stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"
            transform={`rotate(${a} 46 12)`} />
        ))}
      </g>
      <circle cx="46" cy="12" r="7" fill="#FBBF24" />
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={30} cy={30} color="#94A3B8" bright="#CBD5E1" />
      </g>
      <Drops startY={41} count={4} />
    </svg>
  )
}

function ThunderstormIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={26} color="#475569" bright="#64748B" />
      </g>
      <path d="M36 30 L28 44 L34 44 L26 58 L44 38 L37 38 Z"
        fill="#FCD34D"
        style={{ animation: 'lightning-flash 2.5s ease-in-out infinite' }} />
      <Drops startY={36} count={2} color="#93C5FD" />
    </svg>
  )
}

function SnowIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g style={{ animation: 'cloud-float 3.5s ease-in-out infinite' }}>
        <Cloud cx={32} cy={30} />
      </g>
      {[15, 26, 37, 48].map((x, i) => (
        <g key={i} style={{ animation: `snow-fall 1.8s ease-in ${(i * 0.3).toFixed(1)}s infinite` }}>
          <circle cx={x} cy="52" r="2.5" fill="#BAE6FD" />
        </g>
      ))}
    </svg>
  )
}

function MistIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i}
          x1={10 + (i % 2) * 5} y1={16 + i * 9}
          x2={54 - (i % 2) * 5} y2={16 + i * 9}
          stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round"
          style={{
            animation: `mist-wave 2.2s ease-in-out ${(i * 0.2).toFixed(1)}s infinite`,
            opacity: 0.4 + i * 0.12,
          }}
        />
      ))}
    </svg>
  )
}

const ICON_MAP = {
  '01d': SunIcon,   '01n': MoonIcon,
  '02d': SunCloudIcon, '02n': MoonCloudIcon,
  '03d': CloudIcon,  '03n': CloudIcon,
  '04d': DarkCloudIcon, '04n': DarkCloudIcon,
  '09d': RainIcon,   '09n': RainIcon,
  '10d': RainSunIcon, '10n': RainIcon,
  '11d': ThunderstormIcon, '11n': ThunderstormIcon,
  '13d': SnowIcon,   '13n': SnowIcon,
  '50d': MistIcon,   '50n': MistIcon,
}

export default function WeatherIcon({ icon, size = 64 }) {
  const Component = ICON_MAP[icon]
  if (!Component) {
    return (
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="" width={size} height={size} />
    )
  }
  return <Component size={size} />
}
