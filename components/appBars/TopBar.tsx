import { useContext, useState } from "react";
import Button from "../buttons/Button";
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { SessionContext } from "@/pages/_app";
import DropDownMenu, { Option } from "../menus/DropDownMenu";

export type TopBarProps = {
    className?: string
}

const TopBar = ({
    className = ''
}: TopBarProps) => {
    const [showLoginDropDown, setShowLoginDropDown] = useState<boolean>(false)

    const sessionContext = useContext(SessionContext)
    const session = sessionContext?.session;
    const sessionKit = sessionContext?.sessionKit;
    
    const handleLogin = async () => {
        if (!sessionContext || !sessionKit) {
            return;
        }

        const response = await sessionKit.login();
        const session = response.session;

        if (sessionContext.setSession) {
            sessionContext.setSession(session)
        }
    }

    const handleLogout = async () => {
        if (!sessionContext || !sessionKit) {
            return;
        }

        await sessionKit.logout();
        if (sessionContext.setSession) {
            sessionContext.setSession(undefined)
        }
    }

    const wallet = session?.actor.toString();

    return (
        <header
            className={`flex justify-between w-full 
                border-b border-neutral-900
                items-center px-2 md:px-4 py-2 ${className}`}>
            <div>
                <p
                    className="uppercase font-semibold">
                    Next Wharf Demo
                </p>
            </div>
            <div>
                {
                    wallet
                        ? (
                            <div
                                className="relative">
                                <button
                                    onMouseOver={() => setShowLoginDropDown(true)}
                                    onMouseOut={() => setShowLoginDropDown(false)}
                                    className="flex items-center">
                                    <p
                                        className="font-medium mr-1.5">
                                        {wallet}
                                    </p>
                                    <UserCircleIcon
                                        className="h-5 w-5 text-purple-600" />
                                </button>
                                <DropDownMenu
                                    showMenu={showLoginDropDown}
                                    setShowMenu={setShowLoginDropDown}>
                                    <Option
                                        onClick={handleLogout}>
                                        <p
                                            className="mr-2">
                                            Log Out
                                        </p>
                                        <ArrowLeftOnRectangleIcon
                                            className="h-5 w-5" />
                                    </Option>
                                </DropDownMenu>
                            </div>
                        )
                        : (
                            <Button
                                onClick={handleLogin}>
                                <p
                                    className="mr-2">
                                    Connect
                                </p>
                                <ArrowRightOnRectangleIcon
                                    className="h-5 w-5" />
                            </Button>
                        )
                }
            </div>
        </header>
    )
}

export default TopBar;