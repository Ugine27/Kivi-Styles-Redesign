import React from 'react';

interface CatIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string;
  className?: string;
  glowingEyes?: boolean;
}

export default function KiviCatIcon({
  size,
  className = '',
  glowingEyes = false,
  ...props
}: CatIconProps) {
  return (
    <img
      src="/kivi_icon.png"
      alt="Kivi App Icon"
      style={size ? { width: size, height: size, objectFit: 'cover', borderRadius: '50%' } : { objectFit: 'cover', borderRadius: '50%' }}
      className={className}
      {...props}
    />
  );
}
