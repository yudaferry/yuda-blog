interface TerminalButtonProps {
  type: 'close' | 'minimize' | 'maximize';
}

export default function TerminalButton({ type }: TerminalButtonProps) {
  const getButtonClass = () => {
    switch (type) {
      case 'close':
        return 'bg-red-500';
      case 'minimize':
        return 'bg-yellow-400';
      case 'maximize':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={`w-3 h-3 rounded-full ${getButtonClass()}`} />
  );
}