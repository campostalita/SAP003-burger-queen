import React from 'react'

const MenuList = (props) => {
    return (
        <ol>
            {props.menuItens.map((menu) =>
            <button key={menu.id} onClick={() => props.handleClick(menu)}>
                <div className="burger">
                    {menu.name}
                <h4 className="price">R$ {menu.price},00</h4>
                </div>
            </button>  
            )}
        </ol>
    )
}

export default MenuList