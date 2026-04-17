type VercelLogoProps = {
  className?: string;
  title?: string;
};

export const VercelLogo: React.FC<VercelLogoProps> = ({
  className,
  title = "Vercel",
}) => {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 76 65"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
};
