import bcrypt from 'bcrypt';

//hashing of password before storing in to data base
export const hashPassword =async(password)=>{
    try{
        // more the rounds , more cpu is required
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword
    }
    catch(error){
        console.log(error);
    }
}

//comparing the entered passwprd with the value stored in database

export const comparePassword = async(password,hashedPassword)=>{

    return bcrypt.compare(password, hashedPassword);
}