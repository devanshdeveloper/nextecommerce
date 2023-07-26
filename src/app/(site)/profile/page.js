"use client";

import { useSession } from "next-auth/react";

function ProfilePage() {
  const { data: auth, status } = useSession();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <Image
          height={100}
          width={100}
          className="rounded-full"
          src={auth.user.image}
          alt={auth.user.name}
        />
      </div>
      <div></div>
    </div>
  );
}

export default ProfilePage;
