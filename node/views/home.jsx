var React = require('react');
var DefaultLayout = require('./layouts/default');

function home(props) {

  return (
    <DefaultLayout title={props.title}>
      <h1>hello {props.userName}</h1>
      <button onClick>sasa</button>
    </DefaultLayout>
  );
}

module.exports = home;