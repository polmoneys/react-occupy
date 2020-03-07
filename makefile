# .DEFAULT_GOAL := build
# .PHONY: build clean

AUTHOR = Pol Moneys
DIST_PATH = ./build
DIST = build
DX = ./src
DXSTYLES = ./src/styles
DXMODULES = ./src/modules
DXAPP = ./src/app
DOCS_PATH = github
GITHUBPAGES = ./docs
LIB = ./lib

info:
	@echo "@@ GET STARTED @@"
	@echo " $$ make new name=paella"
	@echo " $$ make dev"
	@echo "@@ DX @@"
	@echo " $$ make commit m=commitmessage"
	@echo " $$ make branch n=newBranch"
	@echo " $$ make merge n=branchName"
	@echo "@@ SHIP @@"
	@echo " $$ make analyze"
	@echo " $$ make build"
	@echo " $$ make pretty"
	@echo " $$ make npmpublish"
	@echo "@@ PEACE @@"

####################################
## BOOTSTRAP

dependencies:
	@echo '@@ CREATING PACKAGE.JSON @@' 
	@echo $(PACKAGEJSON) >package.json
	@npm i react react-dom
	@npm i -D prop-types
	@npm i -D jest @testing-library/react @testing-library/user-event @testing-library/jest-dom nock
	@git init
	@printf '%s\n' '.DS_Store' 'node_modules' 'coverage' 'public' 'build' '.storybook' 'storybook-static' '.gitignore' 'package-lock.json' 'stories' >.gitignore
	@npm i -D --save-exact prettier
	@npx -p @storybook/cli sb init --type react
	@npm i -D @storybook/addon-knobs @storybook/addon-storysource
	
customization: 
	@echo '@@ DEPENDENCIES OK, NOW CUSTOM @@' 
	@echo $(PRETTICONFIG) >.prettier.config.js
	@echo '##$(name) ' >Readme.md
	@printf '%s\n' 'node_modules' 'coverage' 'public' 'build' 'package.json' 'docs'  >.prettierignore
	@mkdir lib && mkdir build && mkdir docs
	@echo '@@ CUSTOM OK @@' 

new:
	@make dependencies 
	@make customization
	@echo '@@ READY TO GO, PEACE @@' 

####################################
## DX

commit: 
	@git commit -m '$(m)'

branch: 
	@git checkout -b '$(n)'

merge: 
	@git merge '$(n)' master 

undo: 
	@git revert HEAD

##### WIP https://www.atlassian.com/git/tutorials/git-log

dev:
	@open -a "Google Chrome" http://localhost:6006 
	@npm run storybook 

build:
	@npm run storybook-build 
	
clean:
	@rm -rf $(DIST_PATH)

update:
	@rm -rf node_modules && npm i 

pretty: 
	@npm run format

PACKAGEJSON = '{"name": "$(name)","version": "0.0.0","license": "MIT",\
			"description": "React $(name) ","author": "$(AUTHOR)","repository": "$(DOCS_PATH):$(AUTHOR)/$(name)",\
			"main": "./$(LIB)/index.js",\
			"scripts": {\
			"format": "prettier --write \"**/*.+(js|json|css|md|mdx|html)\""}}'\

POSTCSSCONFIG ='module.exports = {plugins: {"postcss-import": {},"postcss-preset-env": {}}};'

PRETTICONFIG = 'module.exports = { printWidth: 80, tabWidth: 2,useTabs: false,\
			semi: true,singleQuote: true,trailingComma: "all",bracketSpacing: true,jsxBracketSameLine: false}'\


