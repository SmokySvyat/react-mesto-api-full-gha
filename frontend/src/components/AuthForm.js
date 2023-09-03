import React from "react";

export default function AuthForm(props) {
    return (
        <form className="auth" onSubmit={props.handleSubmit}>
            <h2 className="auth__title">{props.title}</h2>
            <input
                className="auth__input"
                placeholder="Email"
                onChange={props.handleChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={props.formValue.email}
            ></input>
            <input
                className="auth__input"
                placeholder="Password"
                id="password"
                required
                name="password"
                type="password"
                autoComplete="current-password"
                value={props.formValue.password}
                onChange={props.handleChange}
            ></input>
            {/* <p className="auth__error"> {errorMessage} </p> */}
            <button className="auth__btn" type="submit">
                {props.btnValue}
            </button>
        </form>
    )
}