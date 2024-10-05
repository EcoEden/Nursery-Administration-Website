import React, { useState } from 'react'
import { RiPlantFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData=useSelector((state)=>state.user)
    console.log(userData)

    const NavMenu = [
        {
            id: 1,
            title: "Home",
            link: "/"
        },
        {
            id: 2,
            title: "Menu",
            link: "/Menu"//login to Menu
        },
        {
            id: 3,
            title: "About",
            link: "/About"
        },
        {
            id: 4,
            title: "Contact",
            link: "/Contact"
        },
    ]

    const handleShowMenu = () => {
        setShowMenu(preve => !preve)
    }

    return (
        <>
            <nav>
                <div className="bg-[#F5F5F5] h-20 w-full flex gap-4 md:gap-7 justify-between items-center md:px-4    ">
                    {/* Logo Section  */}
                    <Link to={"/"}>{/* Link Added  */}
                        <div className="flex items-center uppercase text-2xl">
                            <p className='uppercase text-primary'>Eco</p>
                            <p className="Uppercase text-secondary">Eden</p>
                            <RiPlantFill className='text-secondary text-4xl' />
                        </div>
                    </Link>
                    <form action="">
                        <div className="flex justify-center items-center text-2xl gap-1">
                            <input type="text" placeholder='What are you looking for ?' className='w-80 px-4 py-2 rounded-xl text-lg' />
                            <button className='rounded-xl bg-secondary p-2  text-xl'>Search
                            </button>
                        </div>
                    </form>

                    <ul className='flex items-center gap-4  font-semibold  '>
                        {NavMenu.map((menu) => (
                            <li key={menu.id} className='text-xl '>
                                <Link to={menu.link}>
                                    {menu.title}
                                </Link></li>
                        ))}
                    </ul>
                    <div className="flex gap-8 text-primary">
                        <div className="text-3xl relative">
                            <FaShoppingCart />
                            <div className="absolute -top-1 -right-1 text-white bg-secondary h-4 w-4 rounded-full m-0 p-0 text-sm text-center flex items-center justify-center">0</div>
                        </div>
                    {/* Display user profile image */}
                        <div className="text-3xl   " onClick={handleShowMenu}>
                            <div className="cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow ">
                            { userData.image ? <img src={userData.image} className="w-full h-full"/> :<FaRegUserCircle  />}
                            </div>
                            {showMenu && (<div className="absolute right-0 my-2 shadow drop-shadow-md bg-white py-2 text-sm">
                                <div className="whitespace-nowrap cursor-pointer px-2"><Link to={"/NewProduct"}>New Product</Link></div>
                               
                                <div className="whitespace-nowrap cursor-pointer px-2 "><Link to={"/Login"}>Login</Link></div>{/*Link Added */}

                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
