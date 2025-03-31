# import requests

# url = "https://in.staging.decentro.tech/v2/kyc/aadhaar/verify"

# payload = {
#     "reference_id": "ABCDEF12345",
#     "consent": True,
#     "purpose": "For Aadhaar Verification",
#     "aadhaar_number": "406488436103"
# }

# headers = {
#     "accept": "application/json",
#     "content-type": "application/json",
#     "client_id": "itrnity_9_sop",  # Add your client ID
#     "client_secret": "0c5658d92da0497aaa9ce02069f7f43c"  # Add your client secret
# }

# response = requests.post(url, json=payload, headers=headers)

# print(response.json())  # Print response as JSON

import requests

url = "https://api.makcorps.com/booking"
params = {
    "country": "in",
    "hotelid": "the-lenox",
    "checkin": "2024-12-05",
    "checkout": "2024-12-11",
    "currency": "INR",
    "kids": 0,
    "adults": 2,
    "rooms": 1,
    "api_key": "67e024de40668ef68c142512"
}

response = requests.get(url, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Request failed with status code {response.status_code}")
