import supabase from "./supabase"
import {supabaseUrl} from "./supabase"

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
export const createEditCabin = async(newCabin, id)=> {
  console.log(newCabin, id)
    // https://qvwufnxwuwwvovaxiawy.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

    let query = supabase.from('cabins')
    //this is for create 
    if(!id) query = query.insert([{...newCabin, image: imagePath}])


//this is for edit
if(id) query = query
  .update({...newCabin, image: imagePath})
  .eq('id',id)
  .select()
          

const { data, error } = await query.select()
.single()
if(error) {
    console.warn(error);
    throw new Error("Cabin could not be created")
}

//upload Image from selected
const { error:storageError } = await supabase
  .storage
  .from('cabins-images')
  .upload(imageName, newCabin.image, {
    cacheControl: '3600',
    upsert: false
  })
//   delete the cabin if there is any error while uploading image
if(storageError) {
    await supabase
.from('cabins')
.delete()
.eq('id', data.id)
console.log(storageError)
throw new Error('Cabin image could not be uploaded & the cabin is not Created')

}
return data
} 
export const deleteCabin = async (id)=> {
  console.log(id)

const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)
if(error) {
    throw new Error("Cabin could not be deleted")
}
return data;
}