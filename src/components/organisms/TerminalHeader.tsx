import TerminalBar from '../molecules/TerminalBar';
import CommandLine from '../molecules/CommandLine';
import ProfileName from '../atoms/ProfileName';
import ProfileTitle from '../atoms/ProfileTitle';
import ContactJSON from '../molecules/ContactJSON';
import type { ContactInfo } from '../types/profile';

interface TerminalHeaderProps {
  contact: ContactInfo;
}

export default function TerminalHeader({ contact }: TerminalHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 p-8 border-b border-gray-600 print:border-0 print:bg-gray-900 print-terminal-bg print-terminal-text">
      <TerminalBar />
      <CommandLine />

      <div className="bg-gray-900 bg-opacity-60 p-8 rounded print:border-0 mt-4 backdrop-blur-sm print:backdrop-blur-none print:bg-gray-900 print-terminal-bg print-terminal-text">

        {/* Avatar Style - Photo above name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-gray-600 print:border-gray-300 overflow-hidden shadow-lg mb-4">
            <img
              src="/images/pp.jpg"
              alt="Yuda Ferry Mahendra"
              className="w-full h-full object-cover"
            />
          </div>
          <ProfileName name={contact.name} />
          <ProfileTitle title={contact.role} />
        </div>

        {/* Contact JSON */}
        <ContactJSON contact={contact} />

      </div>
    </header>
  );
}