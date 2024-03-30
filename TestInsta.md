https://api.instagram.com/oauth/authorize
  ?client_id=859299965883955
  &redirect_uri=https://onyx-client.vercel.app/
  &scope=user_profile,user_media
  &response_type=code



code= AQDEHbQtvGLsZTYKmj3mZ3EZ2YPY3nomonZ5KgBBAhZqCcifPiD7AL34yStNVBI8l7fp2h9RL_ea3rcyRJrF2uwaAGrKqdIXLScydZmRTLM2C5_QliL-zjIglw5VuiI-GKgwkwXpyQCPW6A-YPCSE5PY0A-sPAfJdt2pQblR7prnIfpi1xEDOugv42SJrN9cs6PJ78tzHEbBZP0tbWP2xxj7gxvr0RPcjIdn_IMo8JtKaw

curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id=859299965883955 \
  -F client_secret=11f23736903abdbd4ad6d49155c9d81e \
  -F grant_type=authorization_code \
  -F redirect_uri=https://onyx-client.vercel.app/ \
  -F code=AQDEHbQtvGLsZTYKmj3mZ3EZ2YPY3nomonZ5KgBBAhZqCcifPiD7AL34yStNVBI8l7fp2h9RL_ea3rcyRJrF2uwaAGrKqdIXLScydZmRTLM2C5_QliL-zjIglw5VuiI-GKgwkwXpyQCPW6A-YPCSE5PY0A-sPAfJdt2pQblR7prnIfpi1xEDOugv42SJrN9cs6PJ78tzHEbBZP0tbWP2xxj7gxvr0RPcjIdn_IMo8JtKaw

  {"access_token": "IGQWRQOXM3N18wOGd4T2RzUVhWRWxaaXU0ZAFFnUjJHbHc3YlY1cXl2V3c5ZAWE1MnEzMlRrMnhPS2k4SWRQaGdIMThzS2VjLU1EaFZAkeDZAheUNIdzQ0RlFmQThkNkc2QXFLVFZAkREpEQjl4LVNMQ3JvRHVMeHhJZAmFKelFkdzNOd0VzUQZDZD", "user_id": 7936059929756737}


curl -X GET \ https://graph.instagram.com/me?fields=id,username&access_token=IGQWRQOXM3N18wOGd4T2RzUVhWRWxaaXU0ZAFFnUjJHbHc3YlY1cXl2V3c5ZAWE1MnEzMlRrMnhPS2k4SWRQaGdIMThzS2VjLU1EaFZAkeDZAheUNIdzQ0RlFmQThkNkc2QXFLVFZAkREpEQjl4LVNMQ3JvRHVMeHhJZAmFKelFkdzNOd0VzUQZDZD

