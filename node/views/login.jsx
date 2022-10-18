var React = require('react');
var DefaultLayout = require('./layouts/default');

function login(props) {

  return (
    <DefaultLayout title={props.title}>
      <form action="/home" method="POST">
        <input type="text" name="name" className="userName" placeholder="use name" required/>
        <button type="submit">submit</button>
      </form>
    </DefaultLayout>
  );
}

module.exports = login;