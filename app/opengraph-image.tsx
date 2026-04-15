import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ResumeBuildz - Free ATS-Friendly Resume Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            R
          </div>
          <span style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}>
            Resume
            <span style={{ color: '#60a5fa' }}>Buildz</span>
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '28px',
            marginBottom: '48px',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Free ATS-Friendly Resume Builder with 20 Templates & AI
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {[
            { num: '20', label: 'Templates' },
            { num: '12', label: 'ATS Tools' },
            { num: '201', label: 'Roles' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#3b82f6', fontSize: '36px', fontWeight: 'bold' }}>
                {s.num}
              </span>
              <span style={{ color: '#64748b', fontSize: '18px' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
