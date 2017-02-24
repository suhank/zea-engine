macroScript UMC1.3 \
	category:"3DStudio.nl" \
	tooltip:"UMC1.3 1.2" \
	buttonText:"UMC1.3" \
	Icon:#("UMC1.3",1)
(
	local theScriptfile = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\UMC1.mse"
	fileIn theScriptfile quiet:true
)

colorman.reInitIcons()