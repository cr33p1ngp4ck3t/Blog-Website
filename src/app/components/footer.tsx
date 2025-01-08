import "../styles/custom-styles.css"

export default function Footer() {
    return (
        <>
            <footer id="footer" className="relative z-50 w-full h-[60vh] gap-3 flex flex-row justify-evenly items-end md:p-20 bottom-0 sm:p-5 *:text-[#dfeff9]">
                <div className="col col1 gap-4 flex flex-col items-start justify-start p-4 w-1/4 ">
                    <h3 className="font-medium text-xl mb-0">Blogable</h3>
                    <p className="text-gray-400 text-xs mt-0">2024 © All Rights Reserved</p>
                </div>
                    <div className="col col2 bg-gray-900 rounded-md gap-4 flex flex-col items-start justify-start p-4 w-1/4">
                        <p>About</p>
                        <p>Our mission</p>
                    </div>
                    <div className="col col3 bg-gray-900 rounded-md flex gap-4 flex-col items-start justify-start p-4 w-1/4">
                        <p>Services</p>
                        <p>Join our team</p>
                    </div>
                    <div className="backdrop absolute inset-0 -z-50 backdrop-blur-lg backdrop-filter mask-linear-gradient"></div>
                </footer>


        </>
    )
}