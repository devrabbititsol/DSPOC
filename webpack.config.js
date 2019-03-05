module.exports = {
	entry:  __dirname + "/app/app.js",
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	module: {

		noParse: [ /node_modules\/json-schema\/lib\/validate\.js/, /node_modules\/mapbox-gl/, ],
		loaders: [{
			test: /\.jsx?$/,
			
			exclude: [
         		/.*mapbox-gl.*/
       		],
			loader: 'babel-loader',
			query:{

				presets: ['react','es2015']
			}

		}]
	}
};
