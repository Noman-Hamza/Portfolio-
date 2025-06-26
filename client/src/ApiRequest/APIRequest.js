import axios from "axios";
const BaseURL="https://portfolio-pi-ten-67.vercel.app/api/";


export async function ReadHeroSection() {
    try{let res=await axios.get(BaseURL+'ReadHeroSection');
        if(res.status === 200){
            return res.data
        }else
            return []
    }catch(err){
        console.log(err)
    }
}

export async function ReadBlogSection() {
    try{let res=await axios.get(BaseURL+'ReadAllBlog');
        if(res.status === 200){
            return res.data
        }else
            return []
    }catch(err){
        console.log(err)
    }
}

export async function TeamReadSection() {
    try{let res=await axios.get(BaseURL+'TeamRead');
        if(res.status === 200){
            return res.data
        }else
            return []
    }catch(err){
        console.log(err)
    }
}

export async function ServiceReadSection() {
    try{let res=await axios.get(BaseURL+'ServiceRead');
        if(res.status === 200){
            return res.data
        }else
            return []
    }catch(err){
        console.log(err)
    }
}


export async function login(reqBody) {
    try {
        let res = await axios.post(BaseURL + 'Login', reqBody); // Passing email and password
        if (res.status === 200) {
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
        return [];
    }
}