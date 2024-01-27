VERSION 0.7

generate:
  BUILD ./go+generate
  BUILD ./js+generate

build:
  BUILD ./go+build
  BUILD ./js+build
  BUILD ./java+build

publish:
  ARG EARTHLY_TARGET_TAG
  FROM alpine:3.18
  ARG version=$(echo -n ${EARTHLY_TARGET_TAG} | sed 's/v\(.*\)/\1/')
  RUN echo "Publishing version ${version}"
  BUILD ./js+publish --version ${version}
