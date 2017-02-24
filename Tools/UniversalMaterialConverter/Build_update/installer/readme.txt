Welcome to the readme of the UMC1.3 script. The readme contains a list of the contents of the installer and some instructions on how to install the script.
You can install the mzp-file by dropping it onto any viewport, or by running it from the menu: MAXScript>>Run file...
If you want to check out the contents of the mzp-file yourself, you can unzip it just like a zip-file.

A message from the developer
	You can use this installer to install the Universal Material Converter
	License: This script uses a personal license. It can't be edited or redistributed by other people than Stefan Twigt
	Support: stefan@3dstudio.nl
	Contact: www.3dstudio.nl, developer www.3dstudio.nl

name "UMC1.3"
description "3DStudio.nl Scripts"
version 1.2

The following files are copied to your system
	UMC1.mse >> $userScripts\3DStudio\UMC\
	lib\UMC_am.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_corona.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_gui.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_iray.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_lics.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_mentalray.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_scanline.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_sups.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_vray.mse >> $userScripts\3DStudio\UMC\lib\
	lib\UMC_art.mse >> $userScripts\3DStudio\UMC\lib\
	UMC_readme.pdf >> $userScripts\3DStudio\UMC\
	icons\umc_16a.bmp >> $usericons\
	icons\umc_16i.bmp >> $usericons\
	icons\umc_24a.bmp >> $usericons\
	icons\umc_24i.bmp >> $usericons\
	macro\3DStudio_nl-UMC.mcr >> $usermacros\
	lib\UMC_gta.mse >> $userScripts\3DStudio\UMC\lib\
	installer\makeMacro.ms >> $userScripts\3DStudio\UMC\installer\
	config\configfile.ini >> $userScripts\3DStudio\UMC\config\

The following scripts are executed when installing the script
	$userScripts\3DStudio\UMC\UMC1.mse
