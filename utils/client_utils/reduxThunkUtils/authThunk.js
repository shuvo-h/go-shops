export const loginThunkFn = async(payloadData,thunkInfo)=>{
    // console.log("going login",payloadData);
    const response = await fetch("/api/users/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payloadData)
    })
    
    const data = await response.json();
    return data;
}

