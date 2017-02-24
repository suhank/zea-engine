macroScript UMC category:"3DStudio.nl" \
	tooltip:"UMC 1.2" \
	buttonText:"UMC" \
	Icon:#("UMC",1)
(
	local theScriptfile = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\UMC1.mse"
	fileIn theScriptfile quiet:true
)
