import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import club from "../../../utils/api/club";
import * as S from "./styles"
function Hongbo({club_id} : {club_id : number}){
    const [file, setFile] = useState<File>();
    const [preview,setPreview] = useState<string | ArrayBuffer>("");
    const [loading, setLoading] = useState<boolean>(false); 
    async function fileHandler(e : any){
        let file = e.target.files[0];	
        const options = { 
            maxSizeMB: 2, 
            maxWidthOrHeight: 1024
        }
        
        try {
            const compressedFile = await imageCompression(file, options);
            setFile(compressedFile);
            const promise = imageCompression.getDataUrlFromFile(compressedFile);
            promise.then(result => {
                setPreview(result);
            })
        } catch (error) {
            console.log(error);
        }
    }
    function onSubmit(e : any){
        setLoading(true);
        const fd=new FormData();
        file && fd.append("file", file)
        club.setHongbo(club_id, fd)
        .then((res)=>window.location.href=window.location.href)
        .catch((e)=>{ 
            if(e.response.status===403) {
            alert("클럽장이 아닙니다.");
            setLoading(false);
        }})
    }
    useEffect(()=>{
        club.getHongbo(club_id)
        .then((res)=>setPreview("https://api.semicolon.live/file/" + res.data.hongbo))
    },[])
    return(
        <S.Wrapper>
            <h3>홍보물 등록</h3>
            <input accept=".png, .jpg, .HEIC" onChange={fileHandler} type="file"></input>
            {
                typeof(preview)==="string" ?
                    <img src={preview}></img>
                : null
            }
            {
                !loading ?
                    <button onClick={onSubmit}>홍보물 등록</button>
                : <S.ButtonDisable>올라가는중...</S.ButtonDisable>
            }
        </S.Wrapper>
    )
}
export default Hongbo;