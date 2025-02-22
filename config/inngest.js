import { Inngest } from "inngest";
import connectDb from "./db";
import user from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//ingest fubntion to save user data to a database

export const syncUserCreation = inngest.creatFuntion(
    {
        id:' sync-user-from-clerk'
    },
    {
        event:' clerk/user.created'
    }
    async ({event}) => {
        const { id ,first_name ,last_name,email_addresses,image_url} = event.data
        const userdata ={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            imageUrl:image_url

        }
        await connectDb
        await user.create(userData)
    }
)

//ingest funtion to update user data in database

export const syncUserUpdation=inngest.creatFuntion
(
    {
        id:'update-user-from-clerk'
    }
    {
        event:'clerk/user.updated'
    }
    async ({event}) => {
        const { id ,first_name ,last_name,email_addresses,image_url} = event.data
        const userdata ={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            imageUrl:image_url

        }
        await connectDb
        await user.findByIdAndUpdate(id,userData)
    }
)

//inngest funtion to delete user from database
export const syncUserDeletion = inngest.createFunction
(
    {
        id:'delete-user-with-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({event}) => 
    {
        const {id }=event.data
        
    }
    await connectDb()
    await user.findByIdAndDelete(id)


)