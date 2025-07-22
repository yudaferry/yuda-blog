interface ProfileTitleProps {
  title: string;
  className?: string;
}

export default function ProfileTitle({ title, className = '' }: ProfileTitleProps) {
  return (
    <div className={`text-lg md:text-xl mb-8 text-blue-400 ${className}`}>
      {'// '}{title}
    </div>
  );
}