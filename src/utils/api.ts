import { API_HOST } from '../envs';

export const API_ENDPOINTS = {
  FACE_DETECTION: '/v1/face/detect',
  OBJECT_DETECTION: '/v1/detect/objects',
  OCR: '/v1/ocr',
  ID_VERIFICATION: '/v1/verify/id',
} as const;

export const getAPIUrl = (endpoint: string) => {
  return API_HOST + '/api' + endpoint;
};

export const generateCodeExamples = (endpoint: string) => ({
  python: `import requests

url = "https://api.dolbo.ai${endpoint}"
api_key = "your_api_key"

image_path = "path/to/image.jpg"
with open(image_path, "rb") as image_file:
    response = requests.post(
        url,
        headers={"Authorization": f"Bearer {api_key}"},
        files={"image": image_file}
    )

result = response.json()
print(result)`,

  javascript: `const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('https://api.dolbo.ai${endpoint}', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();
console.log(result);`,

  curl: `curl -X POST https://api.dolbo.ai${endpoint} \\
  -H "Authorization: Bearer your_api_key" \\
  -F "image=@/path/to/image.jpg"`,
});
