
import { useMainCategoryStore } from "@/store/categoriesStore/mainCategory.store"
import { computed, onMounted, reactive, ref } from "vue"
import showToast from "./useToast"
const mainCatStore = useMainCategoryStore()


export default function useAddStarRating () {

    const user = JSON.parse(localStorage.getItem('user'))
    const mainCategoryList = computed(() => mainCatStore.mainCategoryList)
    const acc_type=ref('')
    const Cat=ref('')
    const addStarTemplate = reactive({
        rating_admin :{
        AdminRating_id:0,
        Account_id:0,
        Category_id:1,
        Is_Active:true,
        Created_by:user.User.User_id,
        Updated_by:user.User.User_id
    },
    rating_adminD:[]
})
    const Index = ref()
    const addBtn = ref(true)

    let addStar = reactive([{
        Account_id:'',
        Category_id:'',
        Add_Question:'',
        Request_Type:'',
        StarRating:5,
        Is_Active:false,
        Created_by:user.User.User_id,
        Updated_by:user.User.User_id
    }])


    const AddRows=(index)=>{
        if(addStar[index].Add_Question!=='' && addStar[index].Request_Type!=='' && addStar[index].StarRating!=='')
        {
            addStar.push({
                Account_id:'',
                Category_id:'',
                Add_Question:'',
                Request_Type:'',
                StarRating:5,
                Is_Active:false,
                Created_by:user.User.User_id,
                Updated_by:user.User.User_id
            })
        }else{
            showToast('Please fill your all fields first')
        }
    }

 const removeRows =(index)=>{
    addStar.splice(index,1)
 }

    // crude on local side
    const add = () => {
        if(addBtn.value){
            addStarTemplate.rating_admin.Category_id=Cat.value
            addStarTemplate.rating_admin.Account_id=acc_type.value
            addStarTemplate.rating_adminD=[...addStar]
            for(let x in addStar){
                addStarTemplate.rating_adminD[x].Category_id=Cat.value
                addStarTemplate.rating_adminD[x].Account_id=acc_type.value
            }
            // Cat.value=''
            // acc_type.value=''
            let data = [{
                Account_id:'',
                Category_id:'',
                Add_Question:'',
                Request_Type:'',
                StarRating:5,
                Is_Active:false,
                Created_by:user.User.User_id,
                Updated_by:user.User.User_id
            }]
            addStar.splice(0, addStar.length, ...data)
    }
}

    const editAddStarTemplate = (index) => {
        Index.value = index
        addBtn.value = false
        Cat.value=addStarTemplate.rating_adminD[index].Category_id
        acc_type.value=addStarTemplate.rating_adminD[index].Account_id
        let data = [{
            Account_id:addStarTemplate.rating_adminD[index].Account_id,
            Category_id:addStarTemplate.rating_adminD[index].Category_id,
            Add_Question:addStarTemplate.rating_adminD[index].Add_Question,
            Request_Type:addStarTemplate.rating_adminD[index].Request_Type,
            StarRating:5,
            Is_Active:false,
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
        }]
        addStar.splice(0, addStar.length, ...data)    
    }


    const update=()=>{
        addStarTemplate.rating_adminD.splice(Index.value, 1, ...addStar)
        addBtn.value = true
        Cat.value=''
        acc_type.value=''
        let data = [{
            Account_id:'',
            Category_id:'',
            Add_Question:'',
            Request_Type:'',
            StarRating:5,
            Is_Active:false,
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
        }]
        addStar.splice(0, addStar.length, ...data)
    }

    
    const removeAddStarTemplate = (index) =>{
        addStarTemplate.rating_adminD.splice(index, 1)
    }

    // local side crude end



    const getCatgoryName = (id) => {
        return mainCatStore.mainCategoryList.find(cat => cat.Cat_id === id ).Cat_name;
    }
    onMounted(() => mainCatStore.loadCategory() )
    return{
        addStar,
        add,
        addBtn,
        mainCategoryList,
        addStarTemplate,
        getCatgoryName,
        removeAddStarTemplate,
        editAddStarTemplate,
        acc_type,
        Cat,
        AddRows,
        removeRows,
        update
    }
}