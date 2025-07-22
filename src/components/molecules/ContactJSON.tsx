import type { ContactInfo } from '../types/profile';

interface ContactJSONProps {
  contact: ContactInfo;
}

export default function ContactJSON({ contact }: ContactJSONProps) {
  const fieldClass = "text-blue-400";
  const punctuationClass = "text-gray-200";
  const valueClass = "text-gray-100";

  return (
    <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm print:bg-gray-900 print-terminal-bg print-terminal-text">
      <div className={punctuationClass}>{'{'}</div>
      <div className="ml-4 space-y-1">
        <div>
          <span className={fieldClass}>&quot;name&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.name}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;role&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.role}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;location&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.location}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;email&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.email}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;linkedin&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.linkedin}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;github&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.github}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;telegram&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.telegram}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;instagram&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.instagram}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;X (formerly Twitter)&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.x}&quot;</span>
          <span className={punctuationClass}>,</span>
        </div>
        <div>
          <span className={fieldClass}>&quot;experience_years&quot;</span>
          <span className={punctuationClass}>: </span>
          <span className={valueClass}>&quot;{contact.experienceYears}&quot;</span>
        </div>
      </div>
      <div className={punctuationClass}>{'}'}</div>
    </div>
  );
}