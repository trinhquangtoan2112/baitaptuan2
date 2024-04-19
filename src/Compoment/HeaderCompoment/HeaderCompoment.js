import React from 'react'
import "./HeaderCompoment.css"
import { BiCaretLeftCircle } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
export default function HeaderCompoment() {
    return (
        <div className='header_content'>
            <div className='header_container'>
                <div className='header_left'>
                    <BiCaretLeftCircle />
                </div>
                <div className='header_right'>
                    <form>
                        <input placeholder='Search...'></input>
                        <button><i class="fa fa-search"></i></button>

                    </form>
                    <VscBell />
                </div>
            </div>
        </div>
    )
}
