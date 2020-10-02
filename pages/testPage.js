import React from "react";
import Page from "../components/Page";

export default function testPage() {
	// эта страница доступна по адресу названия файла
	// /testPage
	// можно вкладывать страницы в папки чтобы создавать многоуровневую навигацию

	return (
		<Page className='testPage' pageTitle='Тестовая страница'>
			Привет
		</Page>
	)
}