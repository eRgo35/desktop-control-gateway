# Desktop Control Gateway

This is the gateway (API) server for managing your devices in LAN.

## Disclaimer

For secure communication from WAN make sure you use **https** connection for handling all incoming traffic! Using http is insecure and not recomended!

## Features

- Automatic API Key generation on first start
- Wake on Lan support
- Remote shutdown using ssh
- Ping support

## Getting Started

To get a local copy up and running follow these steps:

### Prerequisites
 - Node and npm installed
 - [Optional] Forwarded port 3001 (for WAN communication)
 - [Optional] SSL certificate (highly recomended)

### Installation

1. Clone the repo
    
    ```
    git clone https://github.com/eRgo35/desktop-control-gateway.git
    ```

2. Install node modules by running
    
    ```
    npm install
    ```

    or

    ```
    yarn add
    ```

## Usage

To execute a command you need a program or a website that supports POST requests

### Avaiable Commands:
<br />
Route: /api/auth

```JSON
{
    "key": "YOUR_API_KEY"
}
```
> Returns if provided API KEY is correct. Should not be used for authentication!

<br />
Route: /api/manage

```JSON
{
    "command": "isAlive",
    "address": "IP_ADDRESS_OR_HOSTNAME",
    "key": "YOUR_API_KEY"
}
```
> Pings the provided address (or hostname) and returns the response

```JSON
{
    "command": "powerOn",
    "mac": "DEVICE_MAC_ADDRESS",
    "broadcast": "NETWORK_BROADCAST_ADDRESS",
    "key": "YOUR_API_KEY"
}
```
> Sends the magic packet to the provided device on the network

```JSON
{
    "command": "powerOff",
    "address": "IP_ADDRESS_OR_HOSTNAME",
    "port": "OPTIONAL_SSH_PORT",
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "shutdownCmd": "SHUTDOWN_CMD",
    "key": "YOUR_API_KEY"
}
```
> Connects to the machine using SSH and executes provided shutdown command

> Login by using id_rsa will be added in the future release

> Default SSH port is set to 22 is nothing is provided