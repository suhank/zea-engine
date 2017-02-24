macroScript UMC1.2 \
	category:"3DStudio.nl" \
	tooltip:"UMC1.2 1.2" \
	buttonText:"UMC1.2" \
	Icon:#("UMC1.2",1)
(
	local theScriptfile = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\UMC1.mse"
	fileIn theScriptfile quiet:true
)

colorman.reInitIcons()