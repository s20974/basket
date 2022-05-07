import React from "react";

function PopupPlayerEdit(props){
    return (props.active) ? ( 
        <footer>
            <div className="popup" style={{zIndex: 100, height: "500px"}}>
                <div className="top">
                    <h2>{props.name}</h2>
                    <label class="fas fa-times" onClick={props.name === "Edit Player Info" || props.name === "Edit Team Info" ? (() => {props.setActive.setState({buttonEdit: false})}) 
                    : (() => {props.setActive.setState({buttonAdd: false})})}></label>
                </div>
                <form className="form" onSubmit={props.onSubmit}>
                    {props.children}
                </form>
            </div>
        </footer>
    ) : "";
}

export default PopupPlayerEdit;