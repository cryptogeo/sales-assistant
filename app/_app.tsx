import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}