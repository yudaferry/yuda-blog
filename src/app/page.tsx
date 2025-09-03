import Image from "next/image";
import Link from "next/link";
import TranslatedText from "../components/atoms/TranslatedText";

export default function Home() {
  const initialYear = 2010;
  const currentYear = (new Date()).getFullYear();
  const diffYear = currentYear - initialYear;

  const nodejsYear = currentYear - 2011;
  const manageYear = currentYear - 2019;
  const reactYear = currentYear - 2017;
  return (
    <main className="self-center w-fit mx-auto text-gray-500 flex flex-col">
      <Image 
        src="/images/pp.jpg" 
        alt="Profile picture" 
        width={200} 
        height={200} 
        className="rounded-full mx-auto mb-8 border-8 border-gray-200 dark:border-gray-600" 
      />

      <div className="mb-2">
        <Link href="/">
          <div className="font-bold text-xl border-y-2 text-center">
            <TranslatedText translationKey="profile.name" namespace="home" />
          </div>
        </Link>
      </div>

      <div className="text-left w-fit self-center text-sm">
        <p>
          {diffYear}
          <TranslatedText translationKey="profile.yearsLabel" namespace="home" className="text-xs" />
          {' '}
          <TranslatedText translationKey="profile.softwareEngineer" namespace="home" />
        </p>
        <p>
          {nodejsYear}
          <TranslatedText translationKey="profile.yearsLabel" namespace="home" className="text-xs" />
          {' '}
          <TranslatedText translationKey="profile.nodejsEnv" namespace="home" />
        </p>
        <p>
          {reactYear.toString().padStart(2, "0")}
          <TranslatedText translationKey="profile.yearsLabel" namespace="home" className="text-xs" />
          {' '}
          <TranslatedText translationKey="profile.reactEnv" namespace="home" />
        </p>
        <p>
          {manageYear.toString().padStart(2, "0")}
          <TranslatedText translationKey="profile.yearsLabel" namespace="home" className="text-xs" />
          {' '}
          <TranslatedText translationKey="profile.leadTeam" namespace="home" />
        </p>
      </div>
    </main>
  );
}
