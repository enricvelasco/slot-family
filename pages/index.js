import React from "react";
import Login from "./login";
import {useRouter} from "next/router";

export default function Home({ user }) {
  const router = useRouter()

  const goToDefaultPage = () => {
    router.push('/data-menu')
  }

  return (
    <>
      holaaa
      {!user && <Login />}
      {!!user && goToDefaultPage()}
    </>
  )
}
