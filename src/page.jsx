const React = require('react'),
    Router = require('react-router'),
    router = require('routes.jsx');

Router.run(router, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, null), document);
});
