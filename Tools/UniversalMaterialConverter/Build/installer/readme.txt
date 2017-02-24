Welcome to the readme of the UMC1.2 script. The readme contains a list of the contents of the installer and some instructions on how to install the script.
You can install the mzp-file by dropping it onto any viewport, or by running it from the menu: MAXScript>>Run file...
If you want to check out the contents of the mzp-file yourself, you can unzip it just like a zip-file.

A message from the developer
	You can use this installer to install the Universal Material Converter
	License: This script uses a personal license. It can't be edited or redistributed by other people than Stefan Twigt
	Support: stefan@3dstudio.nl
	Contact: www.3dstudio.nl, developer www.3dstudio.nl

name "UMC1.2"
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
	maps\concrete\Simple_Concrete_Mtl_BroomCurved_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\concrete\Simple_Concrete_Mtl_BroomStraight_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\stone\Simple_Stone_Mtl_Granite_bump.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\stone\Simple_Stone_Mtl_Marble_bump.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\stone\Simple_Stone_Mtl_StoneWall_bump.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Metals.Ornamental Metals.Aluminum.Brushed.Random.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Break_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Brush_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_CheckerPlate_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Cloverleaf_Pattern.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_DiamondPlate_pattern.jpg >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern01.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern02.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern03.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern04.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern05.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern06.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern07.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern08.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern09.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern10.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern11.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern12.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern13.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern14.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern15.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern16.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern17.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern18.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern19.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Grecian_Pattern20.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern01.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern02.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern03.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern04.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern05.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern06.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern07.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern08.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern09.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern10.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern11.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern12.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern13.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern14.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern15.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern16.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern17.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern18.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern19.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_Hexagons_Pattern20.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern01.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern02.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern03.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern04.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern05.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern06.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern07.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern08.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern09.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern10.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern11.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern12.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern13.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern14.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern15.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern16.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern17.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern18.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern19.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredCircles_Pattern20.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern01.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern02.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern03.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern04.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern05.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern06.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern07.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern08.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern09.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern10.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern11.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern12.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern13.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern14.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern15.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern16.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern17.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern18.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern19.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StaggeredSquares_Pattern20.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern01.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern02.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern03.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern04.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern05.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern06.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern07.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern08.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern09.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern10.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern11.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern12.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern13.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern14.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern15.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern16.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern17.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern18.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern19.png >> $userScripts\3DStudio\UMC\maps\
	maps\metal\Simple_Metal_Mtl_StraightCircles_Pattern20.png >> $userScripts\3DStudio\UMC\maps\
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
