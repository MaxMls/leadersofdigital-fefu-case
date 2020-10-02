import React from "react";
import '../styles/globals.scss'

// Этот файл - обертка любой страницы,
// здесь устанавливаются общие для сайта свойства

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
