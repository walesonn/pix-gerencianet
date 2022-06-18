# PIX INTEGRATION GERENCIANET

## BEFORE INIT CREATE ONE DIRECTORY CERT IN ROOT PATH AND SAVE YOUR CERTS HOMOLOGATION AND PRODUCTION

## THIS CERTFICATES ARE GENERATED IN GN WEB APPLICATION

# NGINX CONFIG WEBHOOK

```
server {
    #
    # ...
    #
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate server_ssl.crt.pem;
    ssl_certificate_key server_ssl.key.pem;
    ssl_client_certificate /root/chain-pix-webhooks-prod.crt;
    ssl_verify_client optional;
    ssl_verify_depth 3;
    #
    # ...
    #
    location /webhook {
        if ($ssl_client_verify != SUCCESS) {
            return 403;
        }
        proxy_pass /webhook;
    }
}
```

## PUBKEY GN CERT TO REGISTER WEBHOOK

production => https://pix.gerencianet.com.br/webhooks/chain-pix-prod.crt

homologation => https://pix.gerencianet.com.br/webhooks/chain-pix-sandbox.crt
