#!/bin/bash

# get folders under templates folder
services=($(ls -d .templates/* | xargs -n 1 basename))

# show the list of services
for i in "${!services[@]}"; do
    echo "$i: ${services[$i]}"
done
echo

# get the target service
read -p "📝 Enter the number of the service to use: " service_number

# check if the input is valid
if ! [[ "$service_number" =~ ^[0-9]+$ ]] || [ "$service_number" -lt 0 ] || [ "$service_number" -ge ${#services[@]} ]; then
    echo "🚨 Invalid input: $service_number"
    exit 1
fi

# show the target service
target_service=${services[$service_number]}
echo "Target service: ${target_service}"

# copy the target service template to the root folder
cp -r .templates/${target_service}/* .templates/${target_service}/.[!.]* .

echo "✅ Setup completed!"
echo "Please delete the '.templates' folder and 'setup.sh' if you don't need it anymore."