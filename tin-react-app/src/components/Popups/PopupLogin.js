import React from "react";

function PopupLogin(props){
    return (props.active) ? ( 
        <>
            <div className="popup" style={{zIndex: 111, height: "500px"}}>
                <div className="top">
                    <h2>{props.name}</h2>
                    <label class="fas fa-times" onClick={() => props.setActive.setState({buttonLogin: false})}></label>
                </div>
                <form className="form" method="post" onSubmit={props.onSubmit}>
                    {props.children}
                </form>
            </div>
        </>
    ) : "";
}

export default PopupLogin;