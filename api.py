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

