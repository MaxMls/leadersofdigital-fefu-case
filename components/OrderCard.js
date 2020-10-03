import React, {useState} from "react";

export default function OrderCard({title, date, items}) {

	const [open, setOpen] = useState(false)

	function onExpandClick(){
		setOpen(!open)
	}


	return (
		<div className="OrderCard">
			тут контент карточки
			{title}
			{date}
			{items}
		</div>
	)
}