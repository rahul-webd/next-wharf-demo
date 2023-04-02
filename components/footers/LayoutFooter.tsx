export type LayoutFooterProps = {
    className?: string
}

const LayoutFooter = ({
    className = ''
}: LayoutFooterProps) => {

    return (
        <footer
            className={`flex justify-center items-center 
                border-t border-black ${className}`}>
            <div
                className="py-2">
                <p
                    className="font-medium">
                    Made with ❤️
                </p>
            </div>
        </footer>
    )
}

export default LayoutFooter;