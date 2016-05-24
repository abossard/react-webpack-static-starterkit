var React = require('react'),
  Router = require('react-router'),
  routes = require('./routes.jsx');

module.exports = function(url) {
  var html;
  Router.run(routes, url,  function (Handler) {
    html =  React.renderToStaticMarkup(React.createElement(Handler, null));
  });
  return html;
};
