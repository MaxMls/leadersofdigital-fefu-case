import React from "react";
import Head from 'next/head'
import Header from "./Header";
import Footer from "./Footer";

// Обертка страницы включающая Header, Footer и тег head

export default function Page({children, pageTitle, className}) {

	return <>
		<Head>
			<title>{pageTitle && `${pageTitle} - `} Название сайта</title>
			<link rel="icon" href={"/favicon.ico"}/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			/>
		</Head>

		<div className={"Page " + className}>
			<header className='Page__header'>
				<Header/>
			</header>

			<main className='Page__main'>
				{children}
			</main>

			<footer className='Page__footer'>
				<Footer/>
			</footer>
		</div>
	</>
}