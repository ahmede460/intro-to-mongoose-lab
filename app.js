const prompt = require('prompt-sync')();
const dotenv = require('dotenv')
const Customer = require('./models/Customer.js');
const mongoose = require('mongoose')
dotenv.config()

const connect = async() =>{
    await mongoose.connect(process.env.MONGODB_URI)
}
connect()


console.log("Welcome to the CRM\n")

async function CRM(){

    console.log("What would you like to do?\n")

console.log("1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit\n")

const menu = prompt('What is your input? : ');

switch (menu){
    case "1": 
    let newCustomerName = prompt("What is the customer's name?: ");
    let newCustomerAge = prompt("What is the customer's age?: ");
    const createNewCustomer = async () => {
        await Customer.create({
            name: newCustomerName,
            age: newCustomerAge
        })
    }

    createNewCustomer()
    console.log("Customer Created\n")
    CRM()
    break;


    case "2":
        const viewAllCustomers = async () => {
        const customers = await  Customer.find()
        for (const customer of customers){
            console.log(`ID: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age} `)
        }
        console.log("\n")
        CRM()
      
        
    }

        await viewAllCustomers()
        break;
       
    case "3":
        const updateCustomer = async () => {
            const customers = await  Customer.find()
            for (const customer of customers){
                console.log(`ID: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age} `)
            }
            console.log("\n")
            let customerID =  prompt("Paste the customer ID you want to update: ");
            const updateCustomer = await Customer.findById(customerID)
            updateCustomer.name  =  prompt("What is the new customer's name?: ");
            updateCustomer.age = prompt("What is the new customer's age?: ");
            await updateCustomer.save()
            console.log(`Updated Record -- ID: ${updateCustomer._id} -- Name: ${updateCustomer.name}, Age: ${updateCustomer.age} `)

            CRM()
        
            
        }
        console.log("\n")
        await updateCustomer()
        break;



    case "4":
        const deleteCustomer = async () => {
            const customers = await  Customer.find()
            for (const customer of customers){
                console.log(`ID: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age} `)
            }
            console.log("\n")
            let customerID =  prompt("Paste the customer ID you want to delete: ");
            await Customer.findByIdAndDelete(customerID)
            console.log("Customer Deleted Successfully\n")
            CRM()
        }
        console.log("\n")
        await deleteCustomer()
        CRM()
        break;
    case "5":
        const closeConnection = async () => {
        console.log("Exiting....")
        mongoose.connection.close()
        process.exit()
        }

        await closeConnection()
        break;
        
}
}

CRM()