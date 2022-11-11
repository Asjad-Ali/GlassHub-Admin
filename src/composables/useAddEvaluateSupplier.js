import { onMounted, reactive, ref } from "vue"
import { computed } from "@vue/reactivity";
import { useEvaluateSupplierStore } from "@/store/evaluateSupplier.store";
import { useRouter } from "vue-router";
import { useMainCategoryStore } from "@/store/categoriesStore/mainCategory.store";
import showToast from "./useToast";

const categoryStore = useMainCategoryStore()
const evaluateStore = useEvaluateSupplierStore()

export default function useAddEvaluateSupplier () {
    const mainCategoryList = computed(() => categoryStore.mainCategoryList)
    const user = JSON.parse(localStorage.getItem('user'))
    const ansType = ['Rating 1.5','Optional',' Multi-choice','Check Box','Upload Files']
    const router = useRouter()
    const addBtn = ref(true)
    const updateIndex = ref ('')
    const Cat = ref('')
    const addedEvaluations = reactive({
            evaluate_supplier :{
            Evaluate_Supplier_id:0,
            Category_id:Cat.value,
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
        },
        evaluate_supplierD:[]
    })
    
    let addValue = reactive([
        {
            Category_id:Cat.value,
            Add_Point:"",
            Request_Type:"",
            Ans_Type:"",
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
        }
    ])

    const AddRows=(index)=>{
        if(addValue[index].Add_Point!=='' && addValue[index].Request_Type!=='' && addValue[index].Ans_Type!=='')
        {
          addValue.push({
            Category_id:Cat.value,
            Add_Point:"",
            Request_Type:"",
            Ans_Type:"",
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
            })
        }else{
            showToast('Please fill your all fields first')
        }
    }

 const removeRows =(index)=>{
    addValue.splice(index,1)
 }

    // CRUDE function on local side
    const add = () => {
        if(addBtn.value){
            addedEvaluations.evaluate_supplier.Category_id=Cat.value
            addedEvaluations.evaluate_supplierD=[...addValue]
            for(let x in addValue){
             addedEvaluations.evaluate_supplierD[x].Category_id=Cat.value
            }
            // Cat.value=''
            let data = [{
                Category_id:'',
                Add_Point:"",
                Request_Type:"",
                Ans_Type:"",
                Created_by:user.User.User_id,
                Updated_by:user.User.User_id
            }]
            addValue.splice(0, addValue.length, ...data)
    }
}

    const remove = (index) => {
        addedEvaluations.evaluate_supplierD.splice(index, 1)
    }

    const editData = (index) => {
        updateIndex.value= index
        addBtn.value = false
        Cat.value=addedEvaluations.evaluate_supplierD[index].Category_id
        let data = [{
            Category_id:addedEvaluations.evaluate_supplierD[index].Category_id,
            Add_Point:addedEvaluations.evaluate_supplierD[index].Add_Point,
            Request_Type:addedEvaluations.evaluate_supplierD[index].Request_Type,
            Ans_Type:addedEvaluations.evaluate_supplierD[index].Ans_Type,
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id
        }]
        addValue.splice(0, addValue.length, ...data)    
    }

const update=()=>{
    addedEvaluations.evaluate_supplierD.splice(updateIndex.value, 1, ...addValue)
    addBtn.value = true
    Cat.value=''
    let data = [{
        Category_id:'',
        Add_Point:"",
        Request_Type:"",
        Ans_Type:"",
        Created_by:user.User.User_id,
        Updated_by:user.User.User_id
    }]
    addValue.splice(0, addValue.length, ...data)
}

    // End CRUDE function on local Side

    const getCatgoryName = (id) => {
        return categoryStore.mainCategoryList.find(cat => cat.Cat_id === id ).Cat_name;
    }
    const submitTemplate = () => {
        evaluateStore.insertEvaluationList(addedEvaluations).then((res) => {
            if(res.status == 200 ){
                evaluateStore.allEvaluationList = []
                router.push({path: '/evaluate-supplier'})
            }
        })
    }
    onMounted(() => categoryStore.loadCategory())
    return{
        addedEvaluations,
        ansType,
        addValue,
        add,
        remove,
        mainCategoryList,
        getCatgoryName,
        submitTemplate,
        editData,
        addBtn,
        AddRows,
        removeRows,
        Cat,
        update
    }
}