#!/bin/sh
set -e

# Replace environment variables in the main.js file if they exist
if [ -f /usr/share/nginx/html/assets/index-*.js ]; then
  # Find the main JS file
  JS_FILE=$(find /usr/share/nginx/html/assets -name 'index-*.js' | head -n 1)
  
  # Replace environment variables in JS
  echo "Processing environment variables in $JS_FILE"
  
  # If VITE_API_URL is provided, replace it in the JS file
  if [ -n "$VITE_API_URL" ]; then
    echo "Replacing API URL with: $VITE_API_URL"
    sed -i "s|http://localhost:8000|$VITE_API_URL|g" $JS_FILE
  fi
  
  # Add more environment variable replacements as needed
fi

# Start Nginx
echo "Starting Nginx..."
nginx -g "daemon off;" 