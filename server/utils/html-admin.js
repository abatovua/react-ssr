const adminHTML = (html, state) => {
  return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Admin</title>
				<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
				<link href="/assets/admin/styles.css" rel="stylesheet" type="text/css">
				<script>window.__initial__ = ${JSON.stringify(state)}</script>
		</head>
		<body>
		<div id="main">${html}</div>
		<script src="/assets/admin/bundle.js"></script>
		</body>
		</html>
	`;
};

export default adminHTML;