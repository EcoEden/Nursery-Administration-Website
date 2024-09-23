import React from 'react'
import { RiPlantFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
const Navbar = () => {

    const NavMenu = [

        
        {
            id: 1,
            title: "Home",
            link: "/"

        },
        {
            id: 2,
            title: "About",
            link: "/About"

        },
        {
            id: 3,
            title: "Login",
            link: "/Login"

        },
        {
            id: 4,
            title: "Contact",
            link: "/Contact"

        },

    ]
    return (
        <>
            <nav>
                <div className="bg-[#F5F5F5] h-20 flex justify-between items-center px-4">
                    {/* Logo Section  */}
                    <div className="flex items-center uppercase text-2xl">
                        <p className='uppercase text-primary'>Eco</p>
                        <p className="Uppercase text-secondary">Eden</p>
                        <RiPlantFill className='text-secondary text-4xl' />
                    </div>
                    <form action="">
                        <div className="flex justify-center items-center text-2xl">
                            <input type="text" placeholder='What are you looking for ?' className='w-80 px-4 py-2 rounded-xl text-lg' />
                            <button className='rounded-xl bg-secondary p-2  text-xl'>Search
                            </button>
                        </div>
                    </form>

                    <ul className='flex justify-center items-center gap-4 s font-semibold  '>
                        {NavMenu.map((menu) => (
                            <li key={menu.id} className='text-xl '>
                                <Link to={menu.link}>
                                    {menu.title}
                                </Link></li>
                        ))}
                        
                        <div className="">
                            <img width={40} src="./public/All_Icons/Cart_svg.svg" alt="" />
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
