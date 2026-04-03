// import userGroup from "../assets/logo.svg";

// const Footer = () => {
//     return (
//         <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-black">
//             <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                
//                 {/* Left Section */}
//                 <div className="md:max-w-96">
//                     <img
//                         alt="logo"
//                         className="h-11"
//                         src={userGroup}
//                     />

//                     <p className="mt-6 text-sm">
// Design and Development of an AI-Powered Multi Tool Platform for Creative and Professional Tasks                    </p>

//                     <div className="flex items-center gap-2 mt-4">
//                         <img
//                             src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
//                             alt="Google Play"
//                             className="h-10 w-auto border border-white rounded"
//                         />
//                         <img
//                             src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
//                             alt="App Store"
//                             className="h-10 w-auto border border-white rounded"
//                         />
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    
//                     {/* Company Links */}
//                     <div>
//                         <h2 className="font-semibold mb-5">Company</h2>
//                         <ul className="text-sm space-y-2">
//                             <li><a href="#">Home</a></li>
//                             <li><a href="#">About Us</a></li>
//                             <li><a href="#">Contact Us</a></li>
//                             <li><a href="#">Privacy Policy</a></li>
//                         </ul>
//                     </div>

//                     {/* Contact */}
//                     <div>
//                         <h2 className="font-semibold mb-5">Get in touch</h2>
//                         <div className="text-sm space-y-2">
//                             <p>+91 8524881862 📞</p>
//                             <p>subashdev1546@gmail.com 📧</p>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* Bottom */}
//             <p className="pt-4 text-center text-sm pb-5">
//                 © {new Date().getFullYear()}{" "}
//                 <a href="https://prebuiltui.com" className="underline">
//                     QuickAI
//                 </a>. All rights reserved.
//             </p>
//         </footer>
//     );
// };

// export default Footer;

import logo from "../assets/logo.svg";

const Footer = () => {
    return (
        <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-black">
            
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                
                {/* Left Section */}
                <div className="md:max-w-96">
                    <img
                        alt="QuickAI logo"
                        className="h-11"
                        src={logo}
                    />

                 <p className="mt-6 text-sm leading-relaxed hover:text-pink-500">
  QuickAI is an AI-powered multi-tool platform designed for creative and professional tasks, helping users work faster and smarter.
</p>

                    {/* Optional App Buttons */}
                    <div className="flex items-center gap-2 mt-4">
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                            alt="Google Play"
                            className="h-10 w-auto border border-white rounded"
                        />
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                            alt="App Store"
                            className="h-10 w-auto border border-white rounded"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-10 md:gap-20">
                    
                    {/* Company Links */}
                    <div>
                        <h2 className="font-semibold mb-5 text-red-500">History of QuickAI</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="https://portfolio-coder-56.vercel.app/" className="hover:text-pink-500">portfolio 🫰</a></li>
                            <li><a href="https://chatapplive-xzgd.onrender.com/" className="hover:text-pink-500">Chat Application 💬</a></li>
                            <li><a href="https://github.com/subashSN-56" className="hover:text-pink-500">Git Hub 🌟</a></li>
                            <li><a href="https://www.linkedin.com/in/subash-d-2804b2302" className="hover:text-pink-500">LinkedIn 🌐</a></li>
                            <li><a href="https://leetcode.com/u/subash56/" className="hover:text-pink-500">LeetCode 🧠</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="font-semibold mb-5 text-red-500">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p className="hover:text-pink-500">+91 85248 81862 📞</p>
                            <p className="hover:text-pink-500">subashdev1546@gmail.com 📧</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom */}
            <p className="pt-4 text-center text-sm pb-5">
                © {new Date().getFullYear()}{" "}
                <span className="font-medium text-white">QuickAI  </span>. 
                All rights reserved.
            </p>

        </footer>
    );
};

export default Footer;