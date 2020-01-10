import React from "react";
import Button from "../button/Button";

const MenuList = props => {
  return (
    <ol>
      {props.menuItens.map(menu => (
        <Button
          key={menu.id}
          handleClick={() => props.handleClick(menu)}
          disabled={props.disabled}
        >
          <div className="burger">
            {menu.name}
            <h4 className="price">R$ {menu.price},00</h4>
          </div>
        </Button>
      ))}
    </ol>
  );
};

export default MenuList;
