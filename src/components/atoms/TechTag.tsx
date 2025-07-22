interface TechTagProps {
  children: React.ReactNode;
  className?: string;
}

export default function TechTag({ children, className = '' }: TechTagProps) {
  return (
    <span className={`inline-block bg-gradient-to-r from-blue-500 to-blue-600 print:bg-gray-600 text-white print:text-white px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {children}
    </span>
  );
}