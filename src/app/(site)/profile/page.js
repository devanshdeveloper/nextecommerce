"use client";

import { InputField } from "@/components/InputFields";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import Image from "next/image";

function ProfilePage() {
  const { data: auth, status } = useSession();

  if (!auth) return <Loader />;

  console.log(auth);

  // handlers
  function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const displayName = formData.get("name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const shippingAddress = formData.get("shippingAddress");
    
  }

  return (
    <div className="w-full pt-10 flex flex-col gap-10 items-center justify-center">
      <div>
        <Image
          height={100}
          width={100}
          className="rounded-full"
          src={auth.user.image}
          alt={auth.user.name}
        />
      </div>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 w-[min(700px,90vw)]"
      >
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div className="flex flex-col w-full">
            <label htmlFor="displayName">Name</label>
            <InputField
              id="displayName"
              name="name"
              defaultValue={auth.user.name}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <InputField
              id="email"
              name="email"
              defaultValue={auth.user.email}
            />
          </div>
        </div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <InputField
          id="phoneNumber"
          name="phoneNumber"
          type="number"
          min="0000000000"
          max="9999999999"
          defaultValue={auth.user.phoneNumber}
        />
        <label htmlFor="shippingAddress">Shipping Address</label>
        <InputField
          id="shippingAddress"
          name="shippingAddress"
          defaultValue={auth.user.shippingAddress}
        />
        <button type="submit" className="btn btn-default self-start">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
