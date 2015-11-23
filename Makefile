.PHONY: all
.PHONY: build
.PHONY: check
.PHONY: compile
.PHONY: setup
.PHONY: clean


DIST=./dist/
SRC=./src/
IMAGES=resources/images/

CC=webpack --progress --cache --bail --config

export NODE_ENV="production"

all: check build

setup:
	@rm -r node_modules
	@npm install

check:
	@eslint --ext .js,.jsx .

build: compile
	@echo "Done."

compile: clean
	@mkdir -p $(DIST)
## copy static assets
	@(cd $(SRC)main; rsync -R *.* ../../$(DIST))
##compile
	@$(CC) ./configs/webpack.config.js


clean:
	@rm -rf $(DIST)
