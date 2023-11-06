import supabase from "./supabase"

export const getCabins = async ()=> {

let { data, error } = await supabase
.from('cabins')
.select('*')

if(error) {
    console.warn(error);
    throw new Error("Cabin data not found")
}
return data;
}
export const createCabin = async(newCabin)=> {

const { data, error } = await supabase
.from('cabins')
.insert([newCabin])
.select()
if(error) {
    console.warn(error);
    throw new Error("Cabin could not be created")
}
return data
} 
export const deleteCabin = async (id)=> {

const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)
if(error) {
    throw new Error("Cabin could not be deleted")
}
return data;
}