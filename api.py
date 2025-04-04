# # import requests

# # url = "https://in.staging.decentro.tech/v2/kyc/aadhaar/verify"

# # payload = {
# #     "reference_id": "ABCDEF12345",
# #     "consent": True,
# #     "purpose": "For Aadhaar Verification",
# #     "aadhaar_number": "406488436103"
# # }

# # headers = {
# #     "accept": "application/json",
# #     "content-type": "application/json",
# #     "client_id": "itrnity_9_sop",  # Add your client ID
# #     "client_secret": "0c5658d92da0497aaa9ce02069f7f43c"  # Add your client secret
# # }

# # response = requests.post(url, json=payload, headers=headers)

# # print(response.json())  # Print response as JSON

# import requests

# url = "https://api.makcorps.com/booking"
# params = {
#     "country": "in",
#     "hotelid": "the-lenox",
#     "checkin": "2024-12-05",
#     "checkout": "2024-12-11",
#     "currency": "INR",
#     "kids": 0,
#     "adults": 2,
#     "rooms": 1,
#     "api_key": "67e024de40668ef68c142512"
# }

# response = requests.get(url, params=params)

# if response.status_code == 200:
#     print(response.json())
# else:
#     print(f"Request failed with status code {response.status_code}")



from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message)

from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "role": "developer",
            "content": "Talk like a pirate."
        },
        {
            "role": "user",
            "content": "Are semicolons optional in JavaScript?"
        }
    ]
)

print(response.output_text)