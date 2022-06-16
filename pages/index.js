import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import Sidebar from 'components/Sidebar';
import Feed from 'components/Feed';
import Header from 'components/Header';
import Member from 'components/Member';

export default function Home() {
  return (
    <div className="w-full h-full">
       <div className="">
      <Header />
      <Member />
      </div>
      <Feed />
    </div>
  )
}
