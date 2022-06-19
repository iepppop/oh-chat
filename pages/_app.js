import '../styles/globals.css';
import "tailwindcss/tailwind.css";
import { AuthContextProvider } from 'contexts/AuthContext';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Header from '@components/Header';
import { useState, useEffect } from 'react';
import ScrollToTop from '@components/ScrollToTop';
import Footer from '@components/Footer';

function MyApp({ Component, pageProps }) {

  return (
    <AuthContextProvider>
      <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      </RecoilRoot>
    </AuthContextProvider>
  )
}

export default MyApp;
