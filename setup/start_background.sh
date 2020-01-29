#!/bin/bash

IMAGE_NAME=invent_server
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOC_ROOT="$( dirname "${DIR}")"

function getContainerStatus(){
    CONTAINER_ID=$(docker ps -a | grep -v Exit | grep ${IMAGE_NAME} | awk '{print $1}')
    if [[ -z ${CONTAINER_ID} || $1 == "-f" ]] ; then
        echo "No container: Starting . . ."

        docker stop vinema_api
        docker rm vinema_api

        cd ${DOC_ROOT}

        source ${DIR}/start.sh -d

        docker exec -d vinema_api bash -c "npm i -g forever && npm start"

        echo "Container started in background!"
    else
        echo "Running in container: $CONTAINER_ID"
    fi
}

getContainerStatus $1