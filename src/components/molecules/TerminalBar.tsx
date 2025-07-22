import TerminalButton from '../atoms/TerminalButton';

interface TerminalBarProps {
  title?: string;
}

export default function TerminalBar({ title = 'Terminal - Profile' }: TerminalBarProps) {
  return (
    <div className="flex items-center mb-4">
      <div className="flex gap-2 mr-4">
        <TerminalButton type="close" />
        <TerminalButton type="minimize" />
        <TerminalButton type="maximize" />
      </div>
      <div className="text-gray-400 text-sm font-mono">
        {title}
      </div>
    </div>
  );
}