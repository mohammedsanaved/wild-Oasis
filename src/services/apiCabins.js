import supabase from "./supabase"

export const getCabins = async ()=> {

let { data, error } = await supabase
.from('cabins')
.select('*')

if(error) {
    console.warn(error);
    throw new error("Cabin data not found")
}
return data;
}