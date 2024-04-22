import React, { useRef } from 'react'
import "./HeaderCompoment.css"
import { BiCaretLeftCircle } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
export default function HeaderCompoment() {
    const nav = useNavigate()
    let searchRed = useRef(null);
    const handleChange = (e) => {
        searchRed.current = e.target.value.trim()

    }
    const searching = (e) => {
        e.preventDefault();
        nav(`/searchlist/${searchRed.current}`, { state: searchRed.current })
    }
    return (
        <div className='header_content'>
            <div className='header_container'>
                <div className='header_left'>
                    <BiCaretLeftCircle />
                </div>
                <div className='header_right'>
                    <form onSubmit={(e) => {
                        searching(e)
                    }}>
                        <input placeholder='Search...' onChange={(e) => { handleChange(e) }}></input>
                        <button><i class="fa fa-search"></i></button>

                    </form>
                    <VscBell />
                </div>
            </div>
        </div>
    )
}
