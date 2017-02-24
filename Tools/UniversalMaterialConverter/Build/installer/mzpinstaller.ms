/*******************************************************************************************************
<SCRIPTFILE>
Created: 2013-00-00
Last Updated: 2013-05-21
Version: 0.10

Author: Klaas Nienhuis, mail@klaasnienhuis.nl, www.klaasnienhuis.nl
Version: 3ds max 2012

Description:
	The installer that comes with the mzp-builder
Usage:
	RUN IT

Features:

Wishlist:
Changelog:
	2013-05-21: merged the three structs into one single file
</SCRIPTFILE>
*******************************************************************************************************/

try(destroyDialog mzpInstaller.gui.roll_installer)catch()

(
	global mzpInstaller 
	
	
	struct str_dataContainer
	(
		scriptName = "undefined name",
		version = "undefined version",
		category = "undefined category",
		mzpPath = "",
		description = "",
		isDevelopment = false,
		targetPath = "",
		buildfilename = "",
		arrSource = #(),
		arrDestination = #(),
		encryptIndices = #(),
		doEncrypt = true,
		
		installertitle = "",
		installertutorialurl = "http://www.klaasnienhuis.nl/2015/02/install-maxscript-with-mzp-file/",
		
		function fn_harverstIni iniPath =
		(
			/*<FUNCTION>
			Description
				harvests data from an ini-file and stores the data in this struct
			Arguments
				<string> iniPath: the path to the ini-file
			Return
			<FUNCTION>*/
			print iniPath
			scriptName = getINISetting iniPath "Header" "name"
			if hasINISetting iniPath "configfile" "prettyname" do scriptName = getINISetting iniPath "configfile" "prettyname"

			mzpPath = getINISetting iniPath "config" "payload"
			
			version = getINISetting iniPath "configfile" "version"
			category = getINISetting iniPath "config" "category"
			description = getINISetting iniPath "About" "installmessage"
			try(isDevelopment = (getINISetting iniPath "configfile" "development") as booleanClass)catch()
			targetPath = getINISetting iniPath "config" "targetrootpath"
			buildfilename = getINISetting iniPath "config" "buildfilename"
			doEncrypt = getINISetting iniPath "Encrypt" "encryptscripts" as booleanclass
			
			--this section is optionally replaced by an xml-file
			if hasINISetting iniPath "Source" do arrSource = getINISetting iniPath "Source"
			if hasINISetting iniPath "Destination" do arrDestination = getINISetting iniPath "Destination"
			if hasINISetting iniPath "Encrypt" "theArray" do encryptIndices = execute (getINISetting iniPath "Encrypt" "theArray")
			
			--installer
			if hasINISetting iniPath "installer" "installertitle" do installertitle = getINISetting iniPath "installer" "installertitle"
			if hasINISetting iniPath "installer" "installertutorialurl" do installertutorialurl = getINISetting iniPath "installer" "installertutorialurl"
		)
	)
	
	struct str_mzpInstaller
	(
		basePath,
		gui,
		uninstall,
		dataContainerStruct,
		data, 
		file,
		
		--flags
		verbose = true,
		
		loadXml = dotnet.loadAssembly "system.xml",
		
		--variables
		payloadPath = "payload",
		iniPath = "",
		xmlPath = ""--the path to the xml manifest
		
	)
	
	struct str_file
	(
		parentStruct, 
		
		function fn_pathCombine arrPath =
		(
			/*<FUNCTION>
			Description
				uses the dotnet io.path.combine method to create filepaths. Compatible with older .net
				versions by combining paths two at a time
			Arguments
				<array> arrPath: an array of paths
			Return
				<string> the combined path
			<FUNCTION>*/
			
			--combine paths two at a time
			for n = arrPath.count to 2 by -1 do
			(
				arrPath[n-1] = (dotnetClass "system.io.path").combine arrPath[n-1] arrPath[n]
			)
			
			arrPath[1]
		)		
	)
	
	struct defPath 
	(
		sups = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_sups.mse",
		am = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_am.mse",
		vr = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_vray.mse",
		sl = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_scanline.mse",
		mr = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_mentalray.mse",
		ir = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_iray.mse",
		cr = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_corona.mse",
		art = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_art.mse",
		mw = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_maxwell.mse",
		oc = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_octane.mse",
		gui = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_gui.mse",
		lics = symbolicPaths.expandFileName @"$userScripts\3DStudio\UMC\lib\UMC_lics.mse"
	)
	
	struct str_uninstall
	(
		parentStruct,
		dirIO = dotNetClass "system.IO.directory",
		
		function fn_cleanupTemp =
		(
			/*<FUNCTION>
			Description:
				Cleans the temp folder where the installer and payload have been extracted to.
			Arguments:
			Return:
			</FUNCTION>*/
			local outputMessage = stringstream ""
			
			local tempPath = GetINISetting mzpInstaller.iniPath "config" "buildfilename"
			if tempPath != "" do
			(
				local thePath = symbolicPaths.expandFileName (parentStruct.file.fn_pathCombine #("$temp", tempPath))
				format "Temp path %\n" thePath to:outputMessage
				if this.dirIO.exists thePath do 
				(
					try(this.dirIO.delete thePath true)catch
					(
						format "Couldn't delete all temp files, maybe they're still open." to:outputMessage
						parentStruct.gui.fn_addMessage theMessage:outputMessage
					)
				)
			)
		),
		
		function fn_cleanupTarget skipQuery:false =
		(
			/*<FUNCTION>
			Description:
				Cleans the target-folder where a previous script might have been installed before
			Arguments:
				<boolean> skipQuery: set to true if you want to skip a query
			Return:
			</FUNCTION>*/
			
			local targetPath = GetINISetting parentStruct.iniPath "config" "targetrootpath"
			
			--by default the tool cleans up the installation folder. If there are any files created at runtime such as cookies or api-keys
			--stored outside the installation folder the installed script may keep track of that in the ini-file in a section called "runtimefiles"
			--delete those too
-- 			try
-- 			(
-- 				
-- 			)
-- 			catch
-- 			(
-- 				format "Not all files could be uninstalled. Some might still be open or they might have been removed already" to:outputMessage
-- 				parentStruct.gui.fn_addMessage theMessage:outputMessage
-- 			)
			local installedConfigIni = parentStruct.file.fn_pathCombine #(targetPath, "config","configfile.ini")
			if doesFileExist installedConfigIni do
			(
				local arrRuntimeFile = getINISetting installedConfigIni "runtimefiles"
				if arrRuntimeFile.count > 0 do for i = 1 to arrRuntimeFile.count do
				(
					local theFile = getINISetting installedConfigIni "runtimefiles" arrRuntimeFile[i]
					if doesFileExist theFile then
					(
						try(close theFile)catch()
						deleteFile theFile
					)
				)
			)
-- 			
-- 			--loop over each file in in thargetrootpath and delete it before proceeding
			local thePath = symbolicPaths.expandFileName targetPath
			local proceed = true
			if NOT this.dirIO.exists thePath do
			(
				proceed = false
				if NOT skipQuery do parentStruct.gui.fn_addMessage theMessage:("Can't remove existing files. The path doesn't exist.\n\n" + thePath)
			)
			if proceed AND NOT skipQuery do
			(
				proceed = queryBox ("Proceed to uninstall " + thePath + " agreed?") title:"Uninstall folder"
			)
			if proceed then 
			(
				try
				(
-- 					this.dirIO.delete thePath true
					pad = defPath()
					if doesfileexist pad.sups do deletefile pad.sups
					if doesfileexist pad.am do deletefile pad.am
					if doesfileexist pad.vr do deletefile pad.vr
					if doesfileexist pad.sl do deletefile pad.sl
					if doesfileexist pad.mr do deletefile pad.mr
					if doesfileexist pad.ir do deletefile pad.ir
					if doesfileexist pad.cr do deletefile pad.cr
					if doesfileexist pad.art do deletefile pad.art
					if doesfileexist pad.mw do deletefile pad.mw
					if doesfileexist pad.oc do deletefile pad.oc
					if doesfileexist pad.gui do deletefile pad.gui
					if doesfileexist pad.lics do deletefile pad.lics
						
					if NOT skipQuery do parentStruct.gui.fn_addMessage theMessage:"Script uninstalled. You can re-install at anytime with the same installer file."
				)catch
				(
					parentStruct.gui.fn_addMessage theMessage:"Couldn't delete all files, maybe they're still open."
				)
			)
			proceed
		)
	)

	struct str_gui
	(
		parentStruct,
		
		roll_installer,
		
		function fn_getRolloutBackForeColor &colorStruct type:#dotnet =
		(
			/*<FUNCTION>
			Description
				gets colors from the current color scheme. Returns either max or dotnet colors
				kudos to Johan Boekhoven
			Arguments
				<struct by reference> colorStruct: will hold the colors
				<name> #type: the type of output color #max | #dotnet
			Return
			<FUNCTION>*/
			
			struct str_colors
			(
				backColor,
				textColor,
				threedLightColor,
				window,
				shadow,
				appWorkspace,
				threedDarkShadow
			)
			colorStruct = str_colors()
			colorStruct.backColor = colorMan.getColor #background
			colorStruct.textColor = colorMan.getColor #text
			colorStruct.threedLightColor = colorMan.getColor #3dLight
			colorStruct.window = colorMan.getColor #window
			colorStruct.threedDarkShadow = colorMan.getColor #3dDarkShadow
			colorStruct.appWorkspace = colorMan.getColor #appWorkspace
			colorStruct.shadow = colorMan.getColor #shadow
			
			
			local arrPropName = getPropNames colorStruct
			
			--colorman returns colors are point3 values. Let's convert them to dotnet colors
			for thePropName in arrPropname do
			(
				local p3 = getProperty colorStruct thePropName
				setProperty colorStruct thePropName ((dotNetClass "System.Drawing.Color").FromArgb 255 (p3.x * 255.) (p3.y * 255.) (p3.z * 255.))
			)
			
			--optionally convert the colors into max colors
			if type == #max do 
			(
				for thePropName in arrPropname do
				(
					local dotnetColor = getProperty colorStruct thePropName
					setProperty colorStruct thePropName (color dotnetColor.r dotnetColor.g dotnetColor.b)
				)
			)
		),
		
		function fn_addMessage theMessage:"" =
		(
			/*<FUNCTION>
			Description:
				Displays a message in the log.
			Arguments:
				<string> theMessage: the message you want to display
			Return:
			</FUNCTION>*/

			messageBox (theMessage as string) title:"Script installer message"
			format "%" (theMessage as string)
-- 			mzpInstaller.gui.roll_installer.tbxResult.AppendText (theMessage + (dotnetClass "system.Environment").NewLine)
		),
		
		function fn_defineRollouts =
		(
			/*<FUNCTION>
			Description:
				Defines the rollouts.
			Arguments:
			Return:
			</FUNCTION>*/
			
			rollout roll_installer "Install script" width:350 height:230
			(
				local parentStruct = mzpInstaller
				local scriptName = "undefined name"
				local version = "undefined version"
				local category = "undefined category"
				
				dotnetcontrol lblBanner "label" width:348 align:#left height:70 offset:[-12,-4]
				
				dotnetcontrol btnInstall "Button" width:160 height:40 align:#left offset:[-6,0]
				dotnetcontrol btnUninstall "Button" width:160 height:22 align:#left offset:[-6,0]
				dotnetcontrol btnShowReadme "Button" width:160 height:22 align:#left offset:[-6,0]
				dotnetcontrol btnTutorial "Button" width:160 height:22 align:#left offset:[-6,0] --visible:false
				dotnetcontrol btnClose "Button" width:160 height:22 align:#left offset:[-6,0]
				
				dotnetcontrol lblSummary "label" width:168 height:148 pos:[174,76]
				
				
				on roll_installer open do
				(
					parentStruct.gui.fn_getRolloutBackForeColor &c type:#dotnet	

					--get the files from the installer package
					local arrIniFile = getFiles (parentStruct.basePath + "*.ini")
					local arrXmlFile = getFiles (parentStruct.basePath + "*.xml")
					if arrIniFile.count == 1 do parentStruct.iniPath  = arrIniFile[1]
					if arrXmlFile.count == 1 do parentStruct.xmlPath  = arrXmlFile[1]
						
					parentStruct.data = parentStruct.dataContainerStruct()
					parentStruct.data.fn_harverstIni parentStruct.iniPath
						
					roll_installer.title = "Script installer - Klaas Nienhuis - www.klaasnienhuis.nl"
					if parentStruct.data.installertitle != "" do roll_installer.title = parentStruct.data.installertitle
						
					--style the label
					lblBanner.backColor = c.backColor
					lblBanner.forecolor = c.textcolor
					lblBanner.text = parentStruct.data.scriptName
					lblBanner.Font = dotnetObject "system.drawing.Font" "Arial" 20
					lblBanner.TextAlign = (dotnetclass "System.Drawing.ContentAlignment").MiddleCenter
					
					local strSummary = stringStream ""
					format "Name: %\r\nVersion: %\r\nCategory: %\r\n" parentStruct.data.scriptName parentStruct.data.version parentStruct.data.category to:strSummary
					if parentStruct.data.isDevelopment do format "Development build\r\n" to:strSummary
					format "\r\n%" parentStruct.data.description to:strSummary
					
					lblSummary.text = (strSummary as string)
					lblSummary.borderStyle = (dotnetClass "system.Windows.Forms.BorderStyle").FixedSingle
					lblSummary.backColor = c.backColor
					lblSummary.forecolor = c.textcolor

					--style the buttons
					local theButton = btnInstall
					theButton.forecolor = (dotNetClass "System.Drawing.Color").FromArgb 0 0 0
					theButton.backcolor = ((dotNetClass "System.Drawing.Color").FromArgb 150 200 80)--c.textcolor
					theButton.flatStyle = theButton.flatStyle.flat
					theButton.FlatAppearance.BorderColor = c.threedLightColor
					theButton.text = "Install script"
					theButton.Font = dotnetObject "system.drawing.Font" "Arial" 15 
					
					theButton = btnUninstall
					theButton.forecolor = c.threedLightColor
					theButton.backcolor = c.appWorkspace
					theButton.flatStyle = theButton.flatStyle.flat
					theButton.FlatAppearance.BorderColor = c.threedLightColor
					theButton.text = "Uninstall"
					
					theButton = btnShowReadme
					theButton.forecolor = c.threedLightColor
					theButton.backcolor = c.appWorkspace
					theButton.flatStyle = theButton.flatStyle.flat
					theButton.FlatAppearance.BorderColor = c.threedLightColor
					theButton.text = "Show files"
					
					theButton = btnTutorial
					theButton.forecolor = c.threedLightColor
					theButton.backcolor = c.appWorkspace
					theButton.flatStyle = theButton.flatStyle.flat
					theButton.FlatAppearance.BorderColor = c.threedLightColor
					theButton.text = "Customize UI mini tutorial"
					
					theButton = btnClose
					theButton.forecolor = c.threedLightColor
					theButton.backcolor = c.appWorkspace
					theButton.flatStyle = theButton.flatStyle.flat
					theButton.FlatAppearance.BorderColor = c.threedLightColor
					theButton.text = "Close"
					
					--get data from the previously installed script 
					getDirectories (parentStruct.data.targetPath + "*")
					if (getDirectories (parentStruct.data.targetPath + "*")).count == 0 do
					(
						btnUninstall.enabled = false
					)
				)
				
				on roll_installer close do
				(
					mzpInstaller.uninstall.fn_cleanupTemp()
				)
				
				on btnInstall mouseclick do
				(
					local proceed = parentStruct.uninstall.fn_cleanupTarget skipQuery:true

					local hasIssues = false
					local outputMessage = stringstream ""
					
					/*********************************************************************************
					COPY FILES FROM MANIFEST TO DESTINATION
						also copy the configfile and macro
						run the macro
					*********************************************************************************/
					local payloadPath = parentStruct.file.fn_pathCombine #(parentStruct.basePath, parentStruct.payloadPath)
					
					if doesFileExist parentStruct.xmlPath then
					(
						--copy the assets as specified in the xml-file
						local xmlDoc = dotNetObject "system.xml.xmlDocument"
						xmlDoc.load parentStruct.xmlPath

						format "Using xml, file is present: %\n" (doesfileExist parentStruct.xmlPath)

						/*********************************************************************************
						BUILD PAYLOAD ASSETS
						*********************************************************************************/
						local arrSource = xmlDoc.selectNodes "//paths/sources/source"
						format "found % sources\n" arrSource.count
						local strXpath = "" as stringstream
						for i = 0 to arrSource.count-1 do
						(
							
							local relativeSourcePath = (arrSource.itemOf[i].selectSingleNode "path").innerText
							local arrTargetIndex = execute (arrSource.itemOf[i].selectSingleNode "targetidarray").innerText
							for n = 1 to arrTargetIndex.count do
							(
								--loop over every target for this source and install the source in each target
								strXpath = "" as stringstream
								format "//paths/targets/target[@id='%']/path" arrTargetIndex[n] to:strXpath
								local relativeDestinationPath = (xmlDoc.selectSingleNode strXpath).innerText
								strXpath = "" as stringstream
								format "//paths/targets/target[@id='%']/type" arrTargetIndex[n] to:strXpath
								local targetType = (xmlDoc.selectSingleNode strXpath).innerText
								
								local canEncrypt = (arrSource.itemOf[i].selectSingleNode "mxsencrypt").innerText as booleanclass
								local theSource = parentStruct.file.fn_pathCombine #(payloadPath, relativeSourcePath)
								local theDestination
								case targetType of
								(
									"mxs": 
									(
										theDestination = parentStruct.file.fn_pathCombine #((symbolicPaths.expandFileName relativeDestinationPath), (filenameFromPath theSource))
									)
									"windows": 
									(
										--TODO:make sure to remove the pluginfile first. the NW _installer file has nice methods for this.
										local arrPath = filterString relativeDestinationPath "%" --separate the windows-part from the rest of the path
										local windowsSpecialFolder
										case arrPath[1] of
										(
											"ApplicationData": windowsSpecialFolder = (dotnetClass "System.Environment+SpecialFolder").ApplicationData
										)
										local theEnvironmentPath = (dotnetClass "System.Environment").GetFolderPath windowsSpecialFolder
										theDestination = parentStruct.file.fn_pathCombine #(theEnvironmentPath, arrPath[2], (filenameFromPath theSource))
									)
								)
								
								makeDir (getFilenamePath theDestination) all:true
								if parentStruct.data.doEncrypt AND canEncrypt do
								(
									theSource = (dotnetClass "system.io.Path").ChangeExtension theSource ".mse"
									theDestination = (dotnetClass "system.io.Path").ChangeExtension theDestination ".mse"
								)
								local deleteOK = deleteFile theDestination
								local copyOK = copyFile theSource theDestination
								
								if NOT copyOK do 
								(
									hasIssues = true
									format "Copy error\tsource: %\n\tdestination %\n" theSource theDestination to:outputMessage
								)
							)
						)
						
					)else
					(
						--copy the payload into place
						for i = 1 to parentStruct.data.arrSource.count do
						(
							local theSource = parentStruct.file.fn_pathCombine #(payloadPath, (getINISetting parentStruct.iniPath "Source" parentStruct.data.arrSource[i]))
							local theDestination = parentStruct.file.fn_pathCombine #((symbolicPaths.expandFileName (getINISetting parentStruct.iniPath "Destination" parentStruct.data.arrDestination[i])), (filenameFromPath theSource))
							makeDir (getFilenamePath theDestination)
							if parentStruct.data.doEncrypt AND findItem parentStruct.data.encryptIndices (parentStruct.data.arrSource[i] as integer) > 0 do
							(
								theSource = (dotnetClass "system.io.Path").ChangeExtension theSource ".mse"
								theDestination = (dotnetClass "system.io.Path").ChangeExtension theDestination ".mse"
							)
							local deleteOK = deleteFile theDestination
							local copyOK = copyFile theSource theDestination
							
							if NOT copyOK do 
							(
								hasIssues = true
								format "Copy error%\n" theSource to:outputMessage
							)
						)
					)
					
					--copy the config file
					local targetrootpath = symbolicPaths.expandFileName parentStruct.data.targetPath
					local targetPath = parentStruct.file.fn_pathCombine #( targetrootpath, "config", "configfile.ini")
					makeDir (getFilenamePath targetPath)
					copyFile (parentStruct.file.fn_pathCombine #( payloadPath, "config", "configfile.ini")) targetPath
					
					--copy and run the macro
					/*local targetPath = parentStruct.file.fn_pathCombine #(targetrootpath, "installer", "makeMacro.ms")
					makeDir (getFilenamePath targetPath)
					copyFile (parentStruct.file.fn_pathCombine #(payloadPath, "installer", "makeMacro.ms")) targetPath
					fileIn targetPath*/
					
					if hasIssues then
					(
						format "Script installed with issues. Not all files have been copied.\n" to:outputMessage
					)else
					(
						format "% % has now been installed!\n\n" parentStruct.data.scriptName parentStruct.data.version to:outputMessage
						format "To set it up go to:\n" to:outputMessage
						format "Menu -> Customize -> Customize User Interface -> Toolbars\nCategory: \"%\" and drag \"%\" to a toolbar.\n\n" parentStruct.data.category parentStruct.data.scriptName to:outputMessage
						format "Click the toolbar icon to run the script.\n\n" to:outputMessage
						format "Or check out the mini tutorial to see how to add the script to your toolbar." to:outputMessage
					)
					
					parentStruct.gui.fn_addMessage theMessage:outputMessage
				)
				
				on btnUninstall mouseclick do 
				(
					mzpInstaller.uninstall.fn_cleanupTarget skipQuery:false
				)
				
				
				on btnShowReadme mouseclick do
				(
					ShellLaunch "notepad" (parentStruct.file.fn_pathCombine #((getDir #temp), parentStruct.data.buildfilename, "readme.txt"))
				)
					
				on btnTutorial mouseclick do 
				(
					ShellLaunch parentStruct.data.installertutorialurl ""
				)
					
				on btnClose mouseclick do
				(
					try(DestroyDialog parentStruct.gui.roll_installer)catch()
				)
			)
		),
		
		define = fn_defineRollouts()
	)
	
	mzpInstaller = str_mzpInstaller basePath:(getFilenamePath (getSourceFileName())) --init the struct from the location where the file is at.
	mzpInstaller.uninstall = str_uninstall parentStruct:mzpInstaller
	mzpInstaller.gui = str_gui parentStruct:mzpInstaller
	mzpInstaller.dataContainerStruct = str_dataContainer
	mzpInstaller.file = str_file()
)


createDialog mzpInstaller.gui.roll_installer style:#(#style_toolwindow, #style_sysmenu)
clearListener()