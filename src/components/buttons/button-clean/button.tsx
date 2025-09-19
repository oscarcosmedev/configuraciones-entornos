import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'


type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: Parameters<typeof FontAwesomeIcon>[0]['icon']
	label?: string | ReactNode
	variant?: 'secondary' | 'submit'
	isIcon?: boolean
};


export default function ActionButton({
	icon,
	label,
	variant = 'secondary',
	isIcon = false,
	className,
	onClick,
	type = "button",
	...rest
}: ActionButtonProps) {

	const buttonClasses = clsx(
		isIcon ? 'icon' : ['button-default', `button-${variant}`],
		className
	)

	return (
		<button
			type={type}
			className={buttonClasses}
			onClick={onClick}
			{...rest}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
			{label}
		</button>
	)
}