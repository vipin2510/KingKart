import React, { useEffect, useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
const DropDown = ({ name, p, properties, setFormDetails, formDetails, choosedCategories, setChoosedCategory, setProperties, setCategoryDetails, categoryDetails, category, dropDownCss, dropInputCss, noSelectionText }) => {

    const [dropDownActive, setDropDownActive] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("No Selection");
    const handleDropDown = (e) => {
        e.preventDefault();
        const dropDownArrow = document.getElementById('dropDownArrow');
        if (dropDownActive) {
            setDropDownActive(false)
            dropDownArrow.style.transform = "rotate(0Deg)";
        }
        else {
            setDropDownActive(true);
            dropDownArrow.style.transform = "rotate(180Deg)";
        }
    }

    const handleOptions = (e) => {
        e.preventDefault();

        setDropDownValue(e.target.value);
        name === "choose" && setProperties(prev => {
            const newProp = { ...prev };
            newProp[p.propName] = e.target.value;
            return newProp;
        });
        name === "product" && setChoosedCategory(e.target.value);
        name === "product" && setProperties({});
        name === "product" && setFormDetails({ ...formDetails, "category": e.target.id });
        name === "category" && setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.id });
        if (e.target === e.currentTarget) setDropDownActive(false);
    }

    properties && useEffect(() => {
        setDropDownValue(properties[p.propName] || "No Selection")
    }, [p.propName]);
    choosedCategories && useEffect(() => {
        setDropDownValue(choosedCategories || "No Category")
    }, [choosedCategories]);

    useEffect(()=>{
        categoryDetails && setDropDownValue(categoryDetails?.parentCategory?.categoryName || dropDownValue)
    }, [categoryDetails])

    return (
        <>
            <div className={`${dropInputCss}`}>
                <button onClick={handleDropDown} className='border-2 text-lg gap-2 p-2 my-2 bg-slate-100 border-slate-300 focus:outline-blue-500 rounded-md flex w-full justify-between items-center h-12 text-slate-700'>
                    {dropDownValue}
                    <BsChevronDown id='dropDownArrow' />
                </button>
                {dropDownActive && <div id='dropDownMenu' className={`absolute border-2 mb-6 bg-slate-100 py-1 border-slate-300 focus:outline-blue-500 rounded-md flex-col flex text-slate-700 ${dropDownCss}`}>
                    <button name='parentCategory' onClick={handleOptions} className='py-1 text-left px-3 hover:bg-blue-500 hover:text-white transition-all duration-200' value={noSelectionText}>{noSelectionText}</button>
                    {category.length !== 0 && category.map((c, index) => {
                        return <button key={index} name='parentCategory' onClick={handleOptions} className='py-1 text-left px-3 hover:bg-blue-500 hover:text-white transition-all duration-200' id={c._id} value={c?.categoryName || c}>{c?.categoryName || c}</button>
                    })}
                </div>}
            </div>
        </>
    )
}

export default DropDown;