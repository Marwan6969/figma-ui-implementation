@echo off
cd /d "%~dp0"
set PYTHON_EXE=
if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\python.exe" set PYTHON_EXE="%LOCALAPPDATA%\Microsoft\WindowsApps\python.exe"
if not defined PYTHON_EXE if exist "%USERPROFILE%\AppData\Local\Programs\Python\Python312\python.exe" set PYTHON_EXE="%USERPROFILE%\AppData\Local\Programs\Python\Python312\python.exe"
if not defined PYTHON_EXE if exist "%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe" set PYTHON_EXE="%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe"
if not defined PYTHON_EXE if exist "%USERPROFILE%\AppData\Local\Programs\Python\Python310\python.exe" set PYTHON_EXE="%USERPROFILE%\AppData\Local\Programs\Python\Python310\python.exe"
if not defined PYTHON_EXE if exist "%USERPROFILE%\AppData\Local\Programs\Python\Python313\python.exe" set PYTHON_EXE="%USERPROFILE%\AppData\Local\Programs\Python\Python313\python.exe"
if not defined PYTHON_EXE set PYTHON_EXE=python
%PYTHON_EXE% app.py
