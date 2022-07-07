// Must contain 8 characters, one uppercase, one lowercase and one number. Can contain special case character
export const passwordRegexLean = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

// Must contain 8 characters, one uppercase, one lowercase, one number and one special case character
export const passwordRegexStrong = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/