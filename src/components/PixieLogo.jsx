import { Box } from '@mui/material';

export default function PixieLogo({ size = 56, fontSize = '2rem' }) {
  // Different LEGO block types with assembly animation
  const LegoBlock1x1 = ({ color, top, left, delay = 0, studCount = 1 }) => (
    <Box
      className="lego-block lego-block-hover"
      sx={{
        position: 'absolute',
        top,
        left,
        width: size * 0.22,
        height: size * 0.16,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        boxShadow: `
          inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.5),
          inset 0 -${size * 0.015}px 0 rgba(0,0,0,0.4),
          inset ${size * 0.01}px 0 0 rgba(255,255,255,0.3),
          inset -${size * 0.01}px 0 0 rgba(0,0,0,0.3),
          0 ${size * 0.02}px 0 rgba(0,0,0,0.4),
          0 ${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.3)
        `,
        borderRadius: `${size * 0.015}px`,
        animation: `assemble-block 0.4s ease-out ${delay}s forwards`,
        transformOrigin: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6)`,
        },
        '@keyframes assemble-block': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px) scale(0.8) rotate(-5deg)',
          },
          '60%': {
            opacity: 1,
            transform: 'translateY(3px) scale(1.05) rotate(2deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
        '@keyframes assemble-block-hover': {
          '0%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
          '50%': {
            opacity: 1,
            transform: 'translateY(-15px) scale(0.95) rotate(-3deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
      }}
    />
  );

  const LegoBlock2x1 = ({ color, top, left, delay = 0 }) => (
    <Box
      className="lego-block lego-block-hover"
      sx={{
        position: 'absolute',
        top,
        left,
        width: size * 0.46,
        height: size * 0.16,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        boxShadow: `
          inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.5),
          inset 0 -${size * 0.015}px 0 rgba(0,0,0,0.4),
          inset ${size * 0.01}px 0 0 rgba(255,255,255,0.3),
          inset -${size * 0.01}px 0 0 rgba(0,0,0,0.3),
          0 ${size * 0.02}px 0 rgba(0,0,0,0.4),
          0 ${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.3)
        `,
        borderRadius: `${size * 0.015}px`,
        opacity: 0,
        animation: `assemble-block 0.4s ease-out ${delay}s forwards`,
        transformOrigin: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          left: '25%',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6)`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          right: '25%',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6)`,
        },
        '@keyframes assemble-block': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px) scale(0.8) rotate(-5deg)',
          },
          '60%': {
            opacity: 1,
            transform: 'translateY(3px) scale(1.05) rotate(2deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
      }}
    />
  );

  const LegoBlock1x2 = ({ color, top, left, delay = 0 }) => (
    <Box
      className="lego-block lego-block-hover"
      sx={{
        position: 'absolute',
        top,
        left,
        width: size * 0.22,
        height: size * 0.34,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        boxShadow: `
          inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.5),
          inset 0 -${size * 0.015}px 0 rgba(0,0,0,0.4),
          inset ${size * 0.01}px 0 0 rgba(255,255,255,0.3),
          inset -${size * 0.01}px 0 0 rgba(0,0,0,0.3),
          0 ${size * 0.02}px 0 rgba(0,0,0,0.4),
          0 ${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.3)
        `,
        borderRadius: `${size * 0.015}px`,
        opacity: 0,
        animation: `assemble-block 0.4s ease-out ${delay}s forwards`,
        transformOrigin: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `
            inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6),
            0 ${size * 0.09}px 0 ${color}ff
          `,
        },
        '@keyframes assemble-block': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px) scale(0.8) rotate(-5deg)',
          },
          '60%': {
            opacity: 1,
            transform: 'translateY(3px) scale(1.05) rotate(2deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
      }}
    />
  );

  const LegoBlock3x1 = ({ color, top, left, delay = 0 }) => (
    <Box
      className="lego-block lego-block-hover"
      sx={{
        position: 'absolute',
        top,
        left,
        width: size * 0.7,
        height: size * 0.16,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        boxShadow: `
          inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.5),
          inset 0 -${size * 0.015}px 0 rgba(0,0,0,0.4),
          inset ${size * 0.01}px 0 0 rgba(255,255,255,0.3),
          inset -${size * 0.01}px 0 0 rgba(0,0,0,0.3),
          0 ${size * 0.02}px 0 rgba(0,0,0,0.4),
          0 ${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.3)
        `,
        borderRadius: `${size * 0.015}px`,
        opacity: 0,
        animation: `assemble-block 0.4s ease-out ${delay}s forwards`,
        transformOrigin: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          left: '14.29%',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `
            inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6),
            ${size * 0.117}px 0 0 ${color}ff,
            ${size * 0.234}px 0 0 ${color}ff
          `,
        },
        '@keyframes assemble-block': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px) scale(0.8) rotate(-5deg)',
          },
          '60%': {
            opacity: 1,
            transform: 'translateY(3px) scale(1.05) rotate(2deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
      }}
    />
  );

  const LegoBlock2x2 = ({ color, top, left, delay = 0 }) => (
    <Box
      className="lego-block lego-block-hover"
      sx={{
        position: 'absolute',
        top,
        left,
        width: size * 0.46,
        height: size * 0.34,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        boxShadow: `
          inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.5),
          inset 0 -${size * 0.015}px 0 rgba(0,0,0,0.4),
          inset ${size * 0.01}px 0 0 rgba(255,255,255,0.3),
          inset -${size * 0.01}px 0 0 rgba(0,0,0,0.3),
          0 ${size * 0.02}px 0 rgba(0,0,0,0.4),
          0 ${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.3)
        `,
        borderRadius: `${size * 0.015}px`,
        opacity: 0,
        animation: `assemble-block 0.4s ease-out ${delay}s forwards`,
        transformOrigin: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `-${size * 0.022}px`,
          left: '25%',
          width: `${size * 0.07}px`,
          height: `${size * 0.022}px`,
          background: `linear-gradient(135deg, ${color}ff 0%, ${color}dd 100%)`,
          borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0`,
          boxShadow: `
            inset 0 ${size * 0.004}px 0 rgba(255,255,255,0.6),
            ${size * 0.115}px 0 0 ${color}ff,
            0 ${size * 0.09}px 0 ${color}ff,
            ${size * 0.115}px ${size * 0.09}px 0 ${color}ff
          `,
        },
        '@keyframes assemble-block': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px) scale(0.8) rotate(-5deg)',
          },
          '60%': {
            opacity: 1,
            transform: 'translateY(3px) scale(1.05) rotate(2deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
        },
      }}
    />
  );

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        '&:hover .lego-block': {
          animation: 'none !important',
        },
        '&:hover .lego-block-hover': {
          animation: 'assemble-block-hover 0.6s ease-out forwards !important',
        },
      }}
    >
      {/* Letter P built from various LEGO block types */}
      <Box
        sx={{
          position: 'relative',
          width: size * 0.9,
          height: size * 0.88,
        }}
      >
        {/* Vertical spine - using 1x2 and 1x1 blocks */}
        <LegoBlock1x2 color="#667eea" top="0%" left="0%" delay={0} />
        <LegoBlock1x2 color="#7c8aed" top="38%" left="0%" delay={0.15} />
        <LegoBlock1x1 color="#667eea" top="76%" left="0%" delay={0.3} />

        {/* Top horizontal - using 3x1 block */}
        <LegoBlock3x1 color="#764ba2" top="0%" left="26%" delay={0.45} />

        {/* Top right corner - 1x2 block */}
        <LegoBlock1x2 color="#8b5cb8" top="0%" left="74%" delay={0.6} />

        {/* Bottom of curve - 2x1 block */}
        <LegoBlock2x1 color="#9d6fc9" top="38%" left="26%" delay={0.75} />

        {/* Bottom right - 1x1 block */}
        <LegoBlock1x1 color="#764ba2" top="38%" left="74%" delay={0.9} />
      </Box>

      {/* Animated glow effect */}
      <Box
        className="glow-effect"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
          filter: 'blur(25px)',
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0,
          animation: 'glow-appear 0.6s ease-out 1s forwards',
          '@keyframes glow-appear': {
            '0%': {
              opacity: 0,
              transform: 'translate(-50%, -50%) scale(0.5)',
            },
            '100%': {
              opacity: 1,
              transform: 'translate(-50%, -50%) scale(1)',
            },
          },
        }}
      />
    </Box>
  );
}
