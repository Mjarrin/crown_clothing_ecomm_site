import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems, history } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";


import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems,  history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items"> 
            { 
            cartItems.length ?
            cartItems.map(cartItem => (
                    
                    <CartItem key={cartItem.id} item={cartItem} />
                    
                ))
            :
            <span className="empty-message">Your cart is empty</span>
            }
        
         </div>
        <CustomButton onClick={() => {
            history.push("/checkout");

            // dispatches this action directly to our reducer
            dispatch(toggleCartHidden())
            
        }}> Go To Checkout </CustomButton>
    </div>
);


const mapStateToProps = createStructuredSelector ({
    cartItems : selectCartItems
});

export default withRouter(connect(mapStateToProps,null)(CartDropdown));