import React from "react";
import Login from "./login";
import Cars from "./cars";

export default function Home({ user }) {
  return (
    <>
      holaaa
      {!user && <Login />}
      {!!user && <Cars user={user} />}
    </>
  )
}
