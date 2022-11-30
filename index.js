const {MongoClient}=require("mongodb")
const url="mongodb://localhost:27017"
const client=new MongoClient(url);
const employeeData=require("./data.json")

console.log("client created");
async function main(){

    await client.connect();
    console.log("client connnected");

    const database=client.db("Human_Resource")
    const collection=database.collection("employee")
    const empData=await collection.insertMany(employeeData)
    console.log(empData)
    console.log("data is successfully inserted");

    const salary= await collection.find({salary:{$gt:30000}}).toArray()
    console.log(salary);
    console.log("data available for salary more than 30000");


    const exp= await collection.find({overallExp:{$gte:2}}).toArray()
    console.log(exp);
    console.log("exp more than 2 years data available");


    const GradExp = await collection.find({yearGrad:{$gt:"2015"},overallExp:{$gte:"2"}}).toArray()
    console.log(GradExp);
    console.log("data with year of graduation 2025 and experience more than 2 years");


     const setSalary=await collection.updateMany({salary:{$gt:"70000"}},{$set:{salary:"65000"}})
    console.log(setSalary);
    console.log("salary has been updataed");


const deleteY = await collection.deleteMany({lastCompany:"Y"})
console.log(deleteY);
console.log("delete the details of company whosw last name is Y");
}

main()