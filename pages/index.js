import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import Sidebar from 'components/Sidebar';
import Feed from 'components/Feed';
import Header from 'components/Header';
import Member from 'components/Member';
import Modal from '@components/Modal';
import { modalState, postIdState } from "atoms/modalAtom";
import { useRecoilState } from "recoil";

export default function Home() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  
  return (
    <div className="w-full h-full relative">
      <Member />
      <Feed />
      {isOpen && <Modal />}
    </div>
  )
}
