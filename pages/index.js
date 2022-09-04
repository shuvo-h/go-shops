import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../Components/MainLayout/MainLayout'
import { home_pageMeta } from '../DataSetStatic/HomePage/data_home'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <>
      <MainLayout pageMeta={home_pageMeta}>
        <h1>Home page</h1>
      </MainLayout>
    </>
  )
}


