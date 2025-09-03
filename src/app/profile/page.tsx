import type { Metadata } from "next";
import ProfilePageClient from '../../components/ProfilePageClient';

export const metadata: Metadata = {
  title: "Profile - Yuda Ferry Mahendra", 
  description: "Professional profile and CV of Yuda Ferry Mahendra - Software Architect & Team Lead Engineer",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}