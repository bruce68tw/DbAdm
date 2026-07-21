
@ECHO OFF
rem use robocopy instead of xcopy

rem for !var! Delayed Expansion
setlocal enabledelayedexpansion
cls

rem === Vote related ===
rem set toNames=BaoAdm BaoCust
rem === Hr related ===
rem set toNames=DbAdm Mantis TplMvc
rem === Bao related ===
rem set toNames=BaoAdm BaoCust
rem === All ===
rem set toNames=DbAdm Mantis TplMvc BaoAdm BaoCust
rem set toNames=Mantis TplMvc BaoAdm BaoCust

rem(常用) 
rem set toNames=DbAdm GroupProg AdoptAdm TplMvc
set fromName=DbAdm
rem set toNames=Early GroupProg AdoptAdm TplMvc HrAdm
set toNames=Early

set dirPrj=d:\_project
set fromPrj=%dirPrj%\%fromName%
set fromSrc=%fromPrj%\_src
set fromW3=%fromPrj%\wwwroot

rem %%a must be one char !!
rem !表示變數即時更新
rem @ECHO ON
for %%a in (%toNames%) do (
	set toPrj=%dirPrj%\%%a
	set toSrc=!toPrj!\_src
    set toW3=!toPrj!\wwwroot

	rem copy src
	rem robocopy %fromSrc% !toSrc! *.ts
	robocopy %fromSrc%\cssBase !toSrc!\cssBase *
	robocopy %fromSrc%\cssLib !toSrc!\cssLib *
	robocopy %fromSrc%\jsLib !toSrc!\jsLib *
	robocopy %fromSrc%\tsBase !toSrc!\tsBase * /E

	rem copy wwwroot
	robocopy %fromW3%\ext !toW3!\ext *
	robocopy %fromW3%\font !toW3!\font *
	robocopy %fromW3%\locale !toW3!\locale * /E
	
	rem copy 組態單檔
	copy /Y %fromSrc%\forBoth.ts !toSrc!\
	copy /Y %fromSrc%\forEdit.d.ts !toSrc!\
	copy /Y %fromPrj%\gulpfile.js !toPrj!\
	copy /Y %fromPrj%\tsconfig.json !toPrj!\
	
	echo.
)

@ECHO finish!!
pause