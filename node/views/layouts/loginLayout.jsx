var React = require('react');

const loginLayout = () => {

    return (
        // <form action="">
        <div>
            <input type="text" className="userName" placeholder="use name" />
            <button onClick={() => sendData()}>submit</button>
        </div>

        // </form>
    )
}

module.exports = loginLayout;