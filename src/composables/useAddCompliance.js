
// Begin Hurrairah Malik Dated:23-05-2022
import { reactive } from "vue"


export default function useAddCompliance () {
    const compliance = reactive({
        Compliance_name:'',
        Categories_IDs:'',
        RegulatoryAuthority:'',
        Certificate:'',
        // Control_Heading:'',
        audit_auth:''
    })
    return{
        compliance
    }
}
