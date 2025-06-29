export const generateVerificationToken = (length=6):string=>{
    const characters = "5678ABCDEFGHIJ!@#$KLMNOPQRSTU%^&*VWXYZ01234()_+abcdefghij{}|klmnopqrstuvwxyz9"
    let verificationCode = '';

    for(let i = 0; i<length; i++){
        verificationCode += characters.charAt(Math.floor(Math.random()*characters.length))
    }
    
    return verificationCode
}