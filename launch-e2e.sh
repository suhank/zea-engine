mkdir -p testing-e2e/libs/
ln -fs $PWD/dist/ ./testing-e2e/libs/zea-engine/

yarn run es-dev-server -r testing-e2e
