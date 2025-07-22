'use client';

import { useEffect, useState } from 'react';

interface CommandLineProps {
  command?: string;
  prompt?: string;
}

export default function CommandLine({ 
  command = 'cat profile.json', 
  prompt = 'yuda@developer:~$' 
}: CommandLineProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeCommand = async () => {
      setDisplayText('');
      for (let i = 0; i <= command.length; i++) {
        setDisplayText(command.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setShowCursor(false);
    };

    const timer = setTimeout(typeCommand, 500);
    return () => clearTimeout(timer);
  }, [command]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 1000);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="text-gray-100 font-mono mb-4">
      <span className="text-blue-400">{prompt}</span>{' '}
      <span className="text-gray-200">
        {displayText}
        {showCursor && displayText.length === command.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    </div>
  );
}