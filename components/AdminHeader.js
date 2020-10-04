import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";

export default function AdminHeader() {

	return (
		<div className="AdminHeader">
			<AppBar color='transparent' position="static">
				<Toolbar>
					<Typography variant="h6" className={'AdminHeader__title'}>
						Панель управления
					</Typography>
					<Link href={'/admin-panel/manage_products/'}>
						<a>
							<Button color="inherit">
								Магазины
							</Button>
						</a>
					</Link>
					<Link href={'/admin-panel/login'}>
						<a>
							<Button color="inherit">Выход</Button>
						</a>
					</Link>
					<Link href={'/'}>
						<a>
							<Button color="inherit">На главную</Button>
						</a>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	)
}