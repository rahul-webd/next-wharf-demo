import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useEffect } from "react"

export type DropDownMenuProps = {
    showMenu: boolean,
    setShowMenu: Dispatch<SetStateAction<boolean>>,
    children?: ReactNode,
    positionClasses?: string,
    className?: string
}

const DropDownMenu = ({
    showMenu,
    setShowMenu,
    children,
    positionClasses = 'top-100 left-0',
    className = ''
}: DropDownMenuProps) => {

    const handleHideMenu = () => setShowMenu(false)
    const handleShowMenu = () => setShowMenu(true)

    useEffect(() => {
        window.addEventListener('click', handleHideMenu)

        return () => {
            window.removeEventListener('click', handleHideMenu)
        }
    }, [])

    return (
        <div
            onMouseOver={handleShowMenu}
            onMouseOut={handleHideMenu}
            className="absolute p-1">
            <div
                className={`
                    border border-black
                    rounded shadow-md bg-white
                    ${positionClasses}
                    ${showMenu 
                        ? '' 
                        : 'hidden'
                    }
                    ${className}`}>
                {children}
            </div>
        </div>
    )
}

export type OptionProps = {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className?: string
}

const Option = ({
    children,
    onClick,
    className = ''
}: OptionProps) => {

    return (
        <button
            onClick={onClick}
            className={`border-b border-black last:border-0
                flex items-center px-3 py-1.5 first:rounded
                last:rounded font-medium whitespace-nowrap
                hover:bg-purple-100 text-sm ${className}`}>
            {children}
        </button>
    )
}

export {
    Option
}

export default DropDownMenu;