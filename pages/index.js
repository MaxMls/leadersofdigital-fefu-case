import React from "react";
import Page from "../components/Page";
import Link from "next/link";

// Главная страница сайта
export default function index() {
	return (
		<Page className='index' pageTitle='Главная'>

			<div
				className='MainTop'
				//  этот компонент не выделен в отдельный файл,
				//  но файл стилий у него отдельный, при необходимости использовать его в нескольких местах
				//  или в целях сократить код этого компонента можно вынести MainTop в отдельный файл: /components/MainTop.js
			>
				<div className='MainTop__title'>
					Главная страница
				</div>

				<Link href={'/testPage'} >
					<a  className='MainTop__link'>
						Перейти на другую страницу
					</a>
				</Link>
			</div>

		</Page>
	)
}
