.PHONY: all
.PHONY: build
.PHONY: check
.PHONY: compile
.PHONY: setup
.PHONY: clean


DIST=./dist/
SRC=./src/
IMAGES=resources/images/

CC=webpack
C_FLAGS=--progress --cache --bail

export NODE_ENV="production"

all: check build

setup: node_modules

node_modules: package.json
	@rm -r $@
	@npm install
	@touch $@

check:
	@eslint --ext .js,.jsx .

build: compile
	@echo "Done."

compile: node_modules clean
	@mkdir -p $(DIST)
## copy static assets
	@(cd $(SRC)main; rsync -R *.* ../../$(DIST))
##compile
	@$(CC) $(C_FLAGS)


clean:
	@rm -rf $(DIST)
