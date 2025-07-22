interface ProfileNameProps {
  name: string;
  className?: string;
}

export default function ProfileName({ name, className = '' }: ProfileNameProps) {
  return (
    <div className={`text-4xl md:text-5xl font-bold mb-2 text-gray-100 ${className}`}>
      {name}
    </div>
  );
}