
@ECHO OFF
rem use robocopy instead of xcopy

rem for !var! Delayed Expansion
setlocal enabledelayedexpansion
cls

rem === Vote related ===
rem set toDirs=BaoAdm BaoCust
rem === Hr related ===
rem set toDirs=DbAdm Mantis TplMvc
rem === Bao related ===
rem set toDirs=BaoAdm BaoCust
rem === All ===
rem set toDirs=DbAdm Mantis TplMvc BaoAdm BaoCust
rem set toDirs=Mantis TplMvc BaoAdm BaoCust
rem(常用) 
rem set toDirs=DbAdm GroupProg AdoptAdm TplMvc
set toDirs=Early GroupProg AdoptAdm TplMvc HrAdm

set baseDir=d:\_project
rem set fromDir=%baseDir%\HrAdm\wwwroot
set fromDir=%baseDir%\DbAdm\wwwroot

rem %%a must be one char !!
rem @ECHO ON
for %%a in (%toDirs%) do (
	set toDir=%baseDir%\%%a\wwwroot

	rem 無條件覆寫 base/lib css/js, icomoon
	rem css & js(ico, base, lib)
	rem /XO for exclude if source files are old
	robocopy %fromDir%\css\base !toDir!\css\base *.css
	robocopy %fromDir%\css\lib !toDir!\css\lib *.css
	robocopy %fromDir%\js\base !toDir!\js\base *.js
	robocopy %fromDir%\js\lib !toDir!\js\lib *.js
	
	rem icomoon font
	robocopy %fromDir%\font !toDir!\font *
	
	rem locale
	rem /XF for exclude file with name
	robocopy %fromDir%\locale\zh-TW !toDir!\locale\zh-TW * /XF summernote.js
	robocopy %fromDir%\locale\zh-CN !toDir!\locale\zh-CN * /XF summernote.js
	robocopy %fromDir%\locale\en-US !toDir!\locale\en-US * /XF summernote.js
	
	rem 無條件覆寫 css/view/色系
	robocopy %fromDir%\css\view !toDir!\css\view _theme*.css
	robocopy %fromDir%\css\view !toDir!\css\view _xg*.css
	
	echo.
)

@ECHO finish!!
pause