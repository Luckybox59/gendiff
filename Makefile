publish:
	npm publish

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm test

watch:
	npx jest --watch

