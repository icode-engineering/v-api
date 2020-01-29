IMAGE_NAME=vinema-api
WEB_PORT=3000

function showAppStatus(){
    CONTAINER_NAME=$(docker ps --filter ancestor=${IMAGE_NAME} --format "{{.Names}}")
    if [[ -z ${CONTAINER_NAME} ]] ; then
        echo 'Not running'
        exit 1
    else
        WEB_URL=$(docker port ${CONTAINER_NAME} ${WEB_PORT})

        echo "App running in container: $CONTAINER_NAME"
        echo -e "\n Your app is accessible at:: \033[0;31m http://$WEB_URL \033[0m \n"
        exit 0
    fi
}

showAppStatus
