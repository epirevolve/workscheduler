import React from 'react';
import ReactDOM from 'react-dom';

const Publicity = (props) => {
    return (
        <div className="jumbotron">
            <h1><strong>Work Scheduler</strong></h1>
            <br />
            <h2>With this application all Administrators can be FREE of a bothering task.</h2>
            <h2>And each User can ask what they require on their schedule.</h2>
            <br />
            <p>This application provide auto work schedule making process.</p>
            <p>Every operator can ask their requires like holiday.</p>
            <p>Also administrator can set operators relationships and their skills.</p>
        </div>
    );
}

const Auth = (props) => {
    return (
        <React.Fragment>
            <div className="input-group mb-4">
                <input type="text" className="form-control" name={props.loginIdName}
                    placeholder="login id" style={{imeMode:"disabled"}} required />
                <input type="password" className="form-control" name={props.passwordName}
                    placeholder="password" required />
            </div>
            <button type="submit" className="btn btn-default">Login</button>
        </React.Fragment>
    );
}

ReactDOM.render(
    <Publicity />,
    document.getElementById('publicityContent')
);
ReactDOM.render(
    <Auth loginIdName={loginIdName} passwordName={passwordName} />,
    document.getElementById('authContent')
);