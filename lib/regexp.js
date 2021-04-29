export const UsernameRegexp = new RegExp(
  /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/
)
/*
 ^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$
  └─────┬────┘└───┬──┘└─────┬─────┘└─────┬──────┘ └───┬───┘
        │         │         │            │           no _ or . at the end
        │         │         │            │
        │         │         │            allowed characters
        │         │         │
        │         │         no __ or _. or ._ or .. inside
        │         │
        │         no _ or . at the beginning
        │
        username is 2-20 characters long
*/

export const UrlRegexp = new RegExp(
  /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)%s[-a-zA-Z0-9@:%._\+~#=]*/
)

export const EmailRegexp = new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)
