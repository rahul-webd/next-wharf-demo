import { MouseEventHandler, ReactNode } from "react"

export type ButtonVariant = 
    | 'primary'
    | 'secondary'
    | 'tertiary'

export type ButtonProps = {
    children?: ReactNode,
    variant?: ButtonVariant,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    className?: string
}

const getVariantClasses = (variant?: ButtonVariant) => {
    switch (variant) {
        case 'secondary':
            return ''

        case 'tertiary':
            return ''

        default:
            return `bg-purple-400 hover:bg-purple-500
                rounded-xl px-4 md:px-6 py-2 font-semibold`
    }
}

const Button = ({
    children,
    variant = 'primary',
    onClick,
    disabled,
    className = ''
}: ButtonProps) => {
    const variantClasses = getVariantClasses(variant)

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center transition
                duration-500 active:scale-[0.9]
                ${variantClasses} ${className}`}>
            {children}
        </button>
    )
}

export default Button;