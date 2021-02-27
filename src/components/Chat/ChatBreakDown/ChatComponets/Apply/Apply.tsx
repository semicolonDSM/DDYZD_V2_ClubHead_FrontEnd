import { ChatData } from "../../../../interfaces";
import * as S from "./styles"
function Apply({ data, info } : { info : any,data : ChatData}){
    return(
        <S.Wrapper>
            <img src={info?.image}></img>
            <S.ChatWrapper>
                <S.Chat>
                    <h3>{data.title}</h3>
                    <p>{data.msg}</p>
                </S.Chat>
            </S.ChatWrapper>
        </S.Wrapper>
    )
}
export default Apply;