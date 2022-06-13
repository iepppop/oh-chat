import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar';
import Profile from '@components/Profile';

export default function Home() {
  return (
    <>
      <Profile />
      <Sidebar />
    </>
  )
}
