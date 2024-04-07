fx_version "cerulean"
games {"gta5"}

lua54 'yes'

name "fivem-plugin-restarter"
author "LordChunk"

server_scripts {
	"dist/server/**.js",
	-- "src/server/**/*.lua",
}

client_script {
	"dist/client/**.js",
	-- "src/client/**/*.lua",
}
